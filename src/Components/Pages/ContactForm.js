import { Container, Form, Ratio } from "react-bootstrap";

const ContactForm = () => {

  return (
    <>
      <Container >
        <Ratio aspectRatio={'4x3'} className="justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="contactFormEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
          </Form>
        </Ratio>
      </Container>
    </>
  );
};

export default ContactForm;