import React, { useCallback } from "react";
import { Typography, Button, Box, Divider, Hidden } from "@mui/material";
import { BarChart } from "@mui/icons-material";
import DateComponent from "./Date";
import { auth, firestore } from "../firebase";
import { memo } from "react";

const LinkItem = ({ LinkArray, setLinkArray, copyLink }) => {
  const deleteLink = useCallback(
    async (linkDocId) => {
      await firestore.collection("users").doc(auth.currentUser.uid).collection("links").doc(linkDocId).delete();
      const snapshot = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").get();
      const links = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate() }));
      setLinkArray(links);
    },
    [setLinkArray]
  );

  return (
    <>
      {LinkArray.sort((prev, next) => next.createdAt - prev.createdAt).map((linkItem, i) => {
        const { id, createdAt, name, longURL, shortCode, totalClicks } = linkItem;
        const shortUrl = window.location.host + "/" + shortCode;
        return (
          <Box key={i} mb={i === LinkArray.length - 1 ? 8 : 0}>
            <Box display="flex" justifyContent="space-between" alignItems={"center"}>
              <Box width={"50%"}>
                <DateComponent dateDetails={createdAt} />
                <Box my={2}>
                  <Typography variant="h5">{name}</Typography>
                  <Typography style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{longURL}</Typography>
                </Box>
                <Box display="flex" gap={3} alignItems="center">
                  <Typography color="primary">{shortUrl}</Typography>
                  <Button onClick={() => copyLink(shortUrl)} size="small" variant="outlined">
                    Copy
                  </Button>
                  <Button onClick={() => deleteLink(id)} size="small" variant="contained" color="secondary">
                    Delete
                  </Button>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignSelf="center">
                <Box>
                  <Box display="flex" justifyContent="center">
                    <Typography>{totalClicks}</Typography>
                    <BarChart />
                  </Box>
                  <Hidden only={"xs"}>
                    <Typography variant="overline" color="textSecondary">
                      Total Clicks
                    </Typography>
                  </Hidden>
                </Box>
              </Box>
            </Box>
            {i !== LinkArray.length - 1 && (
              <Box my={4}>
                <Divider />
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default memo(LinkItem);
