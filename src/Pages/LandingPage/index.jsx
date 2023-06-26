import { Button, Grid, Hidden, Typography } from "@mui/material";

import { Box } from "@mui/system";
import AuthModal from "../../components/AuthModal";
import { useState } from "react";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box display="flex" flexDirection="column" p={3} boxSizing="border-box" height="100vh" bgcolor="#56B7BA" color="#fff">
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Typography variant="h4">Smolify</Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login / Sign Up
        </Button>
      </Box>
      <Box flexGrow={1} mx={5} display="flex" alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">No dirty links.</Typography>
              <Box my={2}>
                <Typography>Smolify it!</Typography>
              </Box>
              <Button size="large" variant="contained">
                See how it works.
              </Button>
            </Box>
          </Grid>
          <Hidden only="xs">
            <Grid item sm={6}>
              <img
                style={{ width: "100%", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                src="/assets/mockup.png"
                alt="mockup"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
