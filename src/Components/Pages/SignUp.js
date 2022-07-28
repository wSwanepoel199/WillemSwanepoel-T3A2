import { Container, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { useGlobalState } from "../utils";
import { useNavigate } from "react-router";
import { useState } from "react";
import { signup } from "../services/authServices";

const SignUpForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    postcode: ''
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
    console.log(userForm);
    signup(userForm)
      .then((formResponse) => {
        const user = {
          ...formResponse.user
        };
        console.log(user);
        let errorMessage = "";
        if (user.error) {
          Object.keys(user.error).forEach(key => {
            errorMessage = errorMessage.concat("", `${key} ${user.error[key]}`);
          });
          setError(errorMessage);
        } else {
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.jti);
          dispatch({
            type: "setLoggedInUser",
            data: user.username
          });
          dispatch({
            type: "setToken",
            data: user.jti
          });
          setFormData(initialFormData);
          navigate("/");
        }
      })
      .catch(e => { console.log(e); });
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: [e.target.value]
    });
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container>
          <h2>Sign Up Form</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" value={formData.username} onChange={handleFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={formData.password} onChange={handleFormData} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="password_confirmation">
            <Form.Label>Enter Password Again</Form.Label>
            <Form.Control type="password" placeholder="Enter your password again" value={formData.password_confirmation} onChange={handleFormData} />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="postcode">
            <Form.Label>Enter Your Postcode</Form.Label>
            <Form.Control type="text" placeholder="Enter your postcode" value={formData.postcode} onChange={handleFormData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactFormSubmitButton">
            <Container fluid="true">
              <Button variant="contained" type="submit">Sign Up</Button>
              <Button variant="text" href="/signIn">sign in</Button>
            </Container>
          </Form.Group>
        </Container>
      </Form>
    </>
  );

};

export default SignUpForm;