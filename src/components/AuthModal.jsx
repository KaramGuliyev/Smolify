import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SignUp, SignIn } from "../firebase";
import { Close } from "@mui/icons-material";

const AuthModal = ({ onClose }) => {
  const [isSignIn, setSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

  const handleAuth = () => {
    if (isSignIn) {
      const temp = SignIn(form.email, form.password);
    } else {
      const temp = SignUp(form.email, form.password);
    }
  };

  return (
    <Dialog fullWidth open onClose={onClose}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography> {isSignIn ? "Sign In" : "Sign Up"}</Typography>
          <IconButton onClick={() => onClose(false)} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "20px" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          value={form.password}
          type="password"
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} paddingTop={2}>
          <Button disableElevation fullWidth variant="contained" color="primary" onClick={() => handleAuth()}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Typography paddingTop={2} onClick={() => setSignIn((prev) => !prev)}>
            {isSignIn ? "Don't have an account?" : "Have an account?"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
