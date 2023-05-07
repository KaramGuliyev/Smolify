import { Close } from "@mui/icons-material";
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
import React, { useState } from "react";

const Modal = ({ setIsOpen }) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (e) => setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

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
        <Box display={"flex"} flexDirection={"column"}>
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
          <Button onClick={() => console.log(form)} variant="contained" color="primary" disableElevation>
            Smolify URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
