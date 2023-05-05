import { Typography, AppBar, Toolbar, Button, Box } from "@mui/material";

const NavBar = ({ children }) => {
  console.log(children);
  return (
    <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Smolify
              </Typography>
              <Button color="inherit">Links</Button>
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
      <Box>{children}</Box>
    </>
  );
};

export default NavBar;
