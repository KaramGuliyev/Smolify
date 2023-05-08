import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SignUp, SignIn } from "../../firebase";

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
    <>
      <Typography>Home</Typography>
      <TextField value={form.email} name="email" onChange={handleChange} label="Email" />
      <TextField value={form.password} type="password" name="password" onChange={handleChange} label="Password" />
      <Button onClick={() => handleSignUp()}>Sign Up</Button>
      <Button onClick={() => handleSignIn()}>Sign in</Button>
    </>
  );
};

export default Home;
