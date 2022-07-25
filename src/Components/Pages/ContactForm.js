import { useState } from "react";
import { Container, Form, Ratio, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledFormGroup } from "../Shared/styles/ContactForm.styled";

const ContactForm = () => {

  const [catagory, setCatagory] = useState('');

  const handleCharagory = (e) => {
    setCatagory(e);
  };

  return (
    <>
      <Container>
        <Ratio aspectRatio={'4x3'} className="justify-content-center">
          <Form>
            <StyledFormContainer>
              <h2>Contact Form</h2>
              <StyledFormGroup className="mb-3" controlId="contactFormEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </StyledFormGroup>
              <StyledFormGroup className="mb-3" controlId="contactFormCatagory">
                <Form.Label>Reason for Contact</Form.Label>
                {/* <Form.Control type="email" placeholder="Enter your email" /> */}

                <InputGroup className="mb-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title="Select reason"
                    id="input-group-dropdown-2"
                    onSelect={(e) => handleCharagory(e)}
                  >
                    <Dropdown.Item eventKey="Enquire about dogs" href="#">Enquire about dogs</Dropdown.Item>
                    <Dropdown.Item eventKey="Enquire about litters" href="#">Enquire about litters</Dropdown.Item>
                    <Dropdown.Item eventKey="Enquire about shows" href="#">Enquire about shows</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control aria-label="Reason for contact input with dropdown" placeholder="or enter custom reason" as="input" value={catagory} onChange={(e) => handleCharagory(e.target.value)} />
                </InputGroup>
              </StyledFormGroup>
              <StyledFormGroup className="mb-3" controlId="contactFormEmail">
                <Form.Label>Provide More Detail</Form.Label>
                <Form.Control type="textarea" as="textarea" placeholder="Provide More Details" />
              </StyledFormGroup>
            </StyledFormContainer>
          </Form>
        </Ratio>
      </Container>
    </>
  );
};

export default ContactForm;