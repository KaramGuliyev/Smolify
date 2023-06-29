import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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

const Modal = ({ setIsOpen, fetchLinks }) => {
  const [errors, setErrors] = useState({
    name: "",
    longUrl: "",
  });

  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSmolifyURL = async (name, longUrl) => {
    setLoading(true);
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    let errors = {};
    if (name.length < 3 || name.length > 15) {
      errors.name = "Name should be minimum 4 and maximum 15 char long.";
    }
    if (!regex.test(longUrl)) {
      errors.longUrl = "URL is not valid.";
    }
    if (!!Object.keys(errors).length) {
      return setErrors(errors), setLoading(false);
    }
    const link = {
      name,
      longUrl: longUrl.includes("http://") || longUrl.includes("https://") ? longUrl : `http://${longUrl}`,
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      shortCode: nanoid(5),
      totalClicks: 0,
    };
    const res = await firestore.collection("users").doc(auth.currentUser.uid).collection("links").add(link);
      setIsOpen(false);
      fetchLinks();
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
            <TextField
              error={!!errors.name}
              helperText={errors.name}
              value={form.name}
              name="name"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              label="Name"
              disabled={loading}
            />
          </Box>
          <TextField
            error={!!errors.longUrl}
            helperText={errors.longUrl}
            value={form.longUrl}
            name="longUrl"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            label="Website's Long Url"
            disabled={loading}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color={"inherit"} /> : "Smolify URL"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
