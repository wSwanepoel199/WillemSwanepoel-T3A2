import { Container, Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { useState } from "react";
import { Form, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
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
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userForm = {
      user: {
        ...formData
      }
    };
    signIn(userForm)
      .then((user) => {
        console.log(user);
        sessionStorage.setItem("username", user.username);
        dispatch({
          type: "setLoggedInUser",
          data: user.username
        });
        dispatch({
          type: "setToken",
          data: user.jwt
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

  const whipeToken = () => {
    sessionStorage.setItem("token", null);

    dispatch({
      type: "setToken",
      data: null
    });

    console.log(sessionStorage);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container>
          <h2>Sign In</h2>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={formData.password} onChange={handleFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactFormSubmitButton">
            <Container fluid="true">
              <Button variant="contained" type="submit" >Sign In</Button>
              <Button variant="text" href="/signUp">sign up</Button>
            </Container>
          </Form.Group>
          <Button variant="text" onClick={whipeToken}>whipe tokeb</Button>
        </Container>
      </Form>
    </>
  );

};

export default SignInForm;