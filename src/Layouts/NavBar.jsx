import { Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const NavBar = ({ children }) => {
  return (
    <>
      {window.location.pathname === "/" ? (
        <Box>{children}</Box>
      ) : (
        <>
          <AppBar elevation={1} position="static" color={"secondary"}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">Smolify</Link>
              </Typography>
              <Button color="inherit">
                <Link to="/account">My Account</Link>
              </Button>
              <Button onClick={() => auth.signOut()} color="inherit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Box>{children}</Box>
        </>
      )}
    </>
  );
};

export default NavBar;
