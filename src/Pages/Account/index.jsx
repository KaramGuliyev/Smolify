import { Box, Button, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinkItem from "../../components/LinkItem";
import Modal from "../../components/Modal";
import { auth, firestore } from "../../firebase";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    const snapshot = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").get();
    const tempArr = [];
    snapshot.forEach((doc) => tempArr.push({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate() }));
    console.log(tempArr);
    setLinks(tempArr);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      fetchLinks();
    }
  }, [isOpen]);

  if (loading) {
    return (
      <Box mt={5} display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box mt={5}>
        {isOpen && <Modal setIsOpen={setIsOpen} fetchLinks={fetchLinks} />}
        <Grid container justifyContent={"center"}>
          <Grid item xs={8}>
            <Box display={"flex"} mb={5} alignItems={"center"}>
              <Typography variant="h4">My Links</Typography>
              <Box ml={3}>
                <Button onClick={() => setIsOpen(true)} variant="contained" disableElevation color="primary">
                  Create New
                </Button>
              </Box>
            </Box>
            <LinkItem LinkArray={links} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
