import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinkItem from "../../components/LinkItem";
import Modal from "../../components/Modal";
import { auth, firestore } from "../../firebase";

const dummyData = [
  {
    id: "12312dasg13n16j13",
    createdAt: new Date(),
    name: "My Website",
    longUrl: "www.google.com",
    shortCode: "abc123",
    totalClicks: 313,
  },
  {
    id: "12asd312dasg13n16j13",
    createdAt: new Date(),
    name: "My Website",
    longUrl: "www.google.com",
    shortCode: "abc123",
    totalClicks: 313,
  },
];

const Account = () => {
  const [links, setLinks] = useState(dummyData);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const snapshot = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").get();
      const tempArr = [];
      snapshot.forEach((doc) => tempArr.push({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate() }));
      console.log(tempArr);
      setLinks(tempArr);
    };
    fetchLinks();
  }, []);

  return (
    <>
      <Box mt={5}>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
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
