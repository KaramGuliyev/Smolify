import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app, firestore } from "../../firebase";
import { Box, CircularProgress, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinksDoc = async () => {
      try {
        const linkDoc = await firestore.collection("links").doc(shortCode).get();
        const { userUid, linkID, longUrl } = linkDoc.data();
        if (linkDoc.exists) {
          firestore
            .collection("users")
            .doc(userUid)
            .collection("links")
            .doc(linkID)
            .update({
              totalClicks: app.firestore.FieldValue.increment(1),
            });
          window.location.href = longUrl;
        }
      } catch {
        setLoading(false);
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 3000);
      }
    };
    fetchLinksDoc();
  }, []);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography mt={5}>Redirecting...</Typography>
      </Box>
    );
  } else
    return (
      <Box mt={10} textAlign="center">
        <Box mt={3}>
          <CircularProgress />
        </Box>
        <Typography variant="h3" mt={5}>Link is invalid</Typography>
        <Typography mt={5}>Redirecting to Home Page</Typography>
      </Box>
    );
};

export default LinkRedirect;
