import { Button, Grid, Hidden, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SignUp, SignIn } from "../../firebase";
import { Box } from "@mui/system";

const Home = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

  const handleSignUp = () => {
    const temp = SignUp(form.email, form.password);
  };
  const handleSignIn = () => {
    const temp = SignIn(form.email, form.password);
  };

  return (
    <Box display="flex" flexDirection="column" p={3} boxSizing="border-box" height="100vh" bgcolor="#56B7BA" color="#fff">
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Typography variant="h4">Smolify</Typography>
        <Button color="inherit">Login / Sign Up</Button>
      </Box>
      <Box flexGrow={1} display="flex" alignItems="center">
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
              <img style={{ width: "100%", borderRadius: "10px" }} src="/assets/mockup.png" alt="mockup" />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

// <Typography>Home</Typography>
// <TextField value={form.email} name="email" onChange={handleChange} label="Email" />
// <TextField value={form.password} type="password" name="password" onChange={handleChange} label="Password" />
// <Button onClick={() => handleSignUp()}>Sign Up</Button>
// <Button onClick={() => handleSignIn()}>Sign in</Button>
