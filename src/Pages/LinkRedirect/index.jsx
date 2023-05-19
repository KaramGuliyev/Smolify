import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { Box, CircularProgress } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinksDoc = async () => {
      const linkDoc = await firestore.collection("links").doc(shortCode).get();
      setTimeout(() => {
        if (linkDoc.exists) {
          const { longUrl } = linkDoc.data();
          window.location.href = `https://${longUrl}`;
          setLoading(false);
        }
      }, 2000);
    };
    fetchLinksDoc();
  }, []);

  if (loading) {
    return (
      <Box mt={10}>
        <CircularProgress />;
      </Box>
    );
  }
};

export default LinkRedirect;
