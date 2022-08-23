import { Container, Box, Paper, Typography, TextField, FormControl, Button, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { signUp } from "../../../services/authServices";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    password_confirmation: '',
    firstname: '',
    lastname: '',
    address1: '',
    address2: '',
    suburb: '',
    state: '',
    postcode: "",
    showPassword: false,
    showPasswordConfirmation: false
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleShowPassword = (name) => {
    console.log(name);
    if (name === "password") {
      setFormData({
        ...formData,
        showPassword: !formData.showPassword
      });
    } else if (name === "password_confirmation") {
      setFormData({
        ...formData,
        showPasswordConfirmation: !formData.showPasswordConfirmation
      });
    }

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
    if (formData.password === formData.password_confirmation) {
      delete formData.showPassword;
      delete formData.showPasswordConfirmation;
      const submitForm = {
        user: {
          ...formData
        }
      };
      console.log(submitForm);
      signUp(submitForm)
        .then((user) => {
          console.log(user);
          setFormData(initialFormData);
          navigate("/user/signup/confirmation");
        })
        .catch(e => {
          console.log(e.response.data.errors);
          let errorMessage = "";
          Object.keys(e.response.data.errors).forEach(key => {
            errorMessage = errorMessage.concat("", `${key} ${e.response.data.errors[key]}`);
          });
          alert(errorMessage);
        });
    } else {
      navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: "Password miss match", body: "password does not match password confirmation" } });
    }
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
            <Grid xs={12} sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Sign Up</Typography>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField name="username" required id="username_id" label="Username" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField name="email" required id="email_id" label="Email" onChange={handleInput} value={formData.name} type="email" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
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
                          onClick={() => handleShowPassword('password')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                  onChange={handleInput}
                  value={formData.name}

                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField
                  name="password_confirmation"
                  required
                  id="password_confirmation_id"
                  label="Enter Password Again"
                  type={formData.showPasswordConfirmation ? 'text' : 'password'}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleShowPassword('passwordConfirmation')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formData.showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                  onChange={handleInput}
                  value={formData.name}

                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="firstname" required id="first_name_id" label="First Name" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="lastname" required id="last_name_id" label="Last Name" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="address1" id="address_l1_id" label="Address line 1" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="address2" id="address_l2_id" label="Address line 2" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <TextField name="suburb" required id="suburb_id" label="Suburb/Town" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="state" required id="state_id" label="State" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField name="postcode" required id="epostcode_id" label="Postcode" onChange={handleInput} value={formData.name} type="number" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Container fluid="true">
                <Button variant="contained" type="submit">Sign Up</Button>
                <Link to="/user/signIn">
                  <Button variant="text">sign in</Button>
                </Link>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );

};

export default SignUpForm;