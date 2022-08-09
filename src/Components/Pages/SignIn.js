import { Container, Button, Grid, Box, Paper, Typography, FormControl, TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "../utils";
import { signIn } from "../services/authServices";

const SignInForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    email: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
    console.log(formData);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitForm = {
      user: {
        ...formData
      }
    };
    signIn(submitForm)
      .then((user) => {
        console.log(user);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("admin", user.admin);
        // sessionStorage.setItem("token", user.jti);
        dispatch({
          type: "setLoggedInUser",
          data: user
        });
        setFormData(initialFormData);
        navigate("/");
      }
      )
      .catch(e => {
        console.log(e.response.data.message);
        alert(e.response.data.message);
      });
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminLogin = () => {
    setFormData({
      ...formData,
      email: "1@qwerty.com",
      password: "qwerty"
    });
  };

  const handleUserLogin = () => {
    setFormData({
      ...formData,
      email: "2@qwerty.com",
      password: "qwerty"
    });
  };

  return (
    <>
      <Box component="form" data-testid="form" onSubmit={(e) => handleSubmit(e)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ml: 'auto',
        mr: 'auto',
        maxWidth: "sm",
      }}>
        {console.log(formData)}
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: "center" }} data-testid="sign-in-title">Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="email"
                  required id="email_id"
                  type="email"
                  label="Email"
                  onChange={handleInput}
                  value={formData.email}
                  inputProps={{ "data-testid": "sign-in-email" }} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="password"
                  required
                  data-testid="password"
                  id="password_id"
                  label="Password"
                  onChange={handleInput}
                  value={formData.password}
                  type={formData.showPassword ? 'text' : 'password'}
                  inputProps={{ "data-testid": "sign-in-password" }}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}

                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Container fluid="true">
                <Button variant="contained" type="submit" data-testid="sign-in-submit">Sign In</Button>
                <Button variant="text" href="/signUp">sign up</Button>
              </Container>
            </Grid>
          </Grid>
        </Paper>
        <Button variant="contained" onClick={handleAdminLogin} type="submit">Log In Admin</Button>
        <Button variant="contained" onClick={handleUserLogin} type="submit">Log In User</Button>
      </Box>

    </>
  );

};

export default SignInForm;