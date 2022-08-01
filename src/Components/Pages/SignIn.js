import { Container, Button, Grid } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
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

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Form onSubmit={handleSubmit}>
          <Container>
            <h2>Sign In</h2>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter your email" value={formData.email} onChange={handleFormData} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Enter your password" value={formData.password} onChange={handleFormData} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactFormSubmitButton">
              <Container fluid="true">
                <Button variant="contained" type="submit" >Sign In</Button>
                <Button variant="text" href="/signUp">sign up</Button>
              </Container>
            </Form.Group>
          </Container>
        </Form>
      </Grid>
    </Grid>
  );

};

export default SignInForm;