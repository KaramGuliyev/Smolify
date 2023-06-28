import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Snackbar, Typography } from "@mui/material";
import LinkItem from "../../components/LinkItem";
import Modal from "../../components/Modal";
import { auth, firestore } from "../../firebase";
import copy from "copy-to-clipboard";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [linkCopiedToastr, setLinkCopiedToastr] = useState(false);

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

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setLinkCopiedToastr(true);
  }, []);

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
    <Box mt={{ xs: 3, md: 5 }} p={{ xs: 2, sm: 0 }}>
      <Snackbar
        open={linkCopiedToastr}
        onClose={() => setLinkCopiedToastr(false)}
        autoHideDuration={2000}
        message="Link is copied to clipboard!"
      />
      {isOpen && <Modal setIsOpen={setIsOpen} fetchLinks={fetchLinks} />}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <Box display="flex" mb={5} alignItems="center">
            <Typography variant="h4">My Links</Typography>
            <Box ml={3}>
              <Button onClick={() => setIsOpen(true)} variant="contained" disableElevation color="primary">
                Create New
              </Button>
            </Box>
          </Box>
          {links.length === 0 ? noLinks : <LinkItem copyLink={handleCopyLink} LinkArray={links} setLinkArray={setLinks} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
