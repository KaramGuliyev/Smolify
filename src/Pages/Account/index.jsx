import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import LinkItem from "../../components/LinkItem";
import Modal from "../../components/Modal";
import { auth, firestore } from "../../firebase";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    setLoading(true);
    const snapshot = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").get();
    const tempArr = [];
    snapshot.forEach((doc) =>
      tempArr.push({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      })
    );
    setLinks(tempArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      fetchLinks();
    }
  }, [isOpen]);

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const noLinks = (
    <Box mt={5} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center">
      <Typography color="primary" variant="h5" mx={1}>
        Create Smolify Link!
      </Typography>
    </Box>
  );

  return (
    <Box mt={5}>
      {isOpen && <Modal setIsOpen={setIsOpen} fetchLinks={fetchLinks} />}
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Box display="flex" mb={5} alignItems="center">
            <Typography variant="h4">My Links</Typography>
            <Box ml={3}>
              <Button onClick={() => setIsOpen(true)} variant="contained" disableElevation color="primary">
                Create New
              </Button>
            </Box>
          </Box>
          {links.length === 0 ? noLinks : <LinkItem LinkArray={links} setLinkArray={setLinks} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
