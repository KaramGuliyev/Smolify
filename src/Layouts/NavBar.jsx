import { Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Smolify</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/account">My Account</Link>
          </Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
    </>
  );
};

export default NavBar;
