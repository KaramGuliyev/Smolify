import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app, firestore } from "../../firebase";
import { Box, CircularProgress, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinksDoc = async () => {
      const linkDoc = await firestore.collection("links").doc(shortCode).get();
      setTimeout(() => {
        if (linkDoc.exists) {
          const { longUrl, linkID, userUid } = linkDoc.data();
          firestore.collection('users').doc(userUid).collection("links").doc(linkID).update({
            totalClicks : app.firestore.FieldValue.increment(1)
          })
          window.location.href = `http://${longUrl}`;
        } else {
          setLoading(false);
          window.location.href = `http://${window.location.host}/`;
        }
      }, 2000);
    };
    fetchLinksDoc();
  }, []);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting...</Typography>
      </Box>
    );
  } else
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h3">Link is invalid</Typography>
        <Typography mt={5}>Redirecting to Home Page</Typography>
        <Box mt={3}>
          <CircularProgress />
        </Box>
      </Box>
    );
};

export default LinkRedirect;
