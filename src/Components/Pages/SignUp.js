import { Container, Box, Paper, Grid, Typography, TextField, FormControl, Button, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGlobalState } from "../utils";
import { useNavigate } from "react-router";
import { useState } from "react";
import { signUp } from "../services/authServices";

const SignUpForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    postcode: "",
    showPassword: false,
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

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("form:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delete formData.showPassword;
    const submitForm = {
      user: {
        ...formData
      }
    };
    console.log(submitForm);
    signUp(submitForm)
      .then((user) => {
        console.log(user);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("admin", user.admin);
        dispatch({
          type: "setLoggedInUser",
          data: user
        });
        setFormData(initialFormData);
        navigate("/");
      })
      .catch(e => {
        console.log(e.response.data.errors);
        let errorMessage = "";
        Object.keys(e.response.data.errors).forEach(key => {
          errorMessage = errorMessage.concat("", `${key} ${e.response.data.errors[key]}`);
        });
        alert(errorMessage);
      });
  };

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ml: 'auto',
        mr: 'auto',
        maxWidth: "sm",
      }}>
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Sign Up</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField name="username" required id="username_id" label="Username" onChange={handleInput} value={formData.username} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField name="email" required id="email_id" label="Email" onChange={handleInput} value={formData.email} type="email" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField name="postcode" required id="epostcode_id" label="Postcode" onChange={handleInput} value={formData.postcode} type="number" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="password"
                  required
                  id="password_id"
                  label="Password"
                  type={formData.showPassword ? 'text' : 'password'}
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
                  onChange={handleInput}
                  value={formData.password}

                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Container fluid="true">
                <Button variant="contained" type="submit">Sign Up</Button>
                <Button variant="text" href="/signIn">sign in</Button>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );

};

export default SignUpForm;