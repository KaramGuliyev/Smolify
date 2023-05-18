import React, { useState } from "react";
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
import { Close } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { app, firestore, auth } from "../firebase.js";

const Modal = ({ setIsOpen, fetchLink }) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSmolifyURL = async (name, longUrl) => {
    const link = {
      name,
      longUrl,
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      shortCode: nanoid(5),
      totalClicks: 0,
    };
    const res = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").add(link);
    setIsOpen(false);
  };

  return (
    <Dialog fullWidth onClose={() => setIsOpen(false)} open={true}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Smolify New Url</Typography>
          <IconButton onClick={() => setIsOpen(false)} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <Box my={3}>
            <TextField value={form.name} name="name" onChange={handleChange} fullWidth variant="outlined" label="Name" />
          </Box>
          <TextField
            value={form.longUrl}
            name="longUrl"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Website's Long Url"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box mr={2} mb={2}>
          <Button
            onClick={() => handleSmolifyURL(form.name, form.longUrl)}
            variant="contained"
            color="primary"
            disableElevation
          >
            Smolify URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
