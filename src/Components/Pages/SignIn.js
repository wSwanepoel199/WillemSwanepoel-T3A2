import { Container, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { Form, InputGroup, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { useGlobalState } from "../utils";

const LoginForm = () => {
  const { dispatch } = useGlobalState();

  return (
    <>
      <Form>
        <Container>
          <h2>Contact Form</h2>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phonenumber">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactFormSubmitButton">
            <Container fluid>
              <Button >Sign In</Button>
            </Container>
          </Form.Group>
        </Container>
      </Form>
    </>
  );

};

export default LoginForm;