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
  const [error, setError] = useState("");
  const [isSignIn, setSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

  const handleAuth = async () => {
    try {
      if (isSignIn) {
        const temp = await SignIn(form.email, form.password);
      } else {
        const temp = await SignUp(form.email, form.password);
      }
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found. Please check your credentials and try again.");
          break;
        case "auth/email-already-in-use":
          setError("There is already an account with this email address.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/operation-not-allowed":
          setError(
            "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab."
          );
          break;
        case "auth/weak-password":
          setError("Weak password. Choose a stronger password.");
          break;
        case "auth/wrong-password":
          setError("The password is incorrect.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
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
        <Box color="red">
          <Typography>{error}</Typography>
        </Box>
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
