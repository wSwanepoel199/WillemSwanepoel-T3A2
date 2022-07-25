import { Container, Form, Ratio, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledForm, StyledFormGroup } from "../utils/StyledComponents";

const ContactForm = () => {
  const handleSelect = (e) => {
    console.log(e);
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
                <Form.Control type="email" placeholder="Enter your email" />

                {/* <InputGroup className="mb-3">
                  <Form.Control aria-label="Text input with dropdown button" onChange={handleSelect} />

                  <DropdownButton
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-2"
                    align="end"
                    onSelect={handleSelect}
                  >
                    <Dropdown.Item eventKey="Action" href="#">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="Another action" href="#">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="Something else here" href="#">Something else here</Dropdown.Item>
                  </DropdownButton>
                </InputGroup> */}
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