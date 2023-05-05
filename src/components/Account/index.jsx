import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Account = () => {
  return (
    <>
      <Box mt={5}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={8}>
            <Box display={"flex"}>
              <Typography variant="h4">My Links</Typography>
              <Box ml={3}>
              <Button variant="contained" color="primary">Create New</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
