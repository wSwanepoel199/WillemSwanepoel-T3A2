import { useState } from "react";
import { useGlobalState } from "../utils";
import { Container, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledFormGroup, StyledSubmitButton } from "../Shared/styles/ContactForm.styled";

const ContactForm = () => {
  const { store, dispatch } = useGlobalState();
  const initialContactDetails = {
    email: "",
    catagory: "",
    details: ""
  };
  const [contactDetails, setContactDetails] = useState(initialContactDetails);

  const handleSelect = (e) => {
    console.log("Seletected:", e);
    const selectedCatagory = {
      id: "catagory",
      value: e
    };
    handleFormInput(selectedCatagory);
  };
  const handleFormInput = (e) => {
    console.log(e);
    setContactDetails({
      ...contactDetails,
      [e.id]: e.value
    });
  };
  const handleSubmit = () => {
    const updatedContactForm = {
      email: contactDetails.email,
      catagory: contactDetails.catagory,
      details: contactDetails.details
    };
    dispatch({
      type: "updateContactForm",
      data: updatedContactForm
    });
    setContactDetails(initialContactDetails);
  };

  return (
    <>
      {console.log(contactDetails)}
      <Form>
        <StyledFormContainer onChange={(e) => handleFormInput(e.target)}>
          <h2>Contact Form</h2>
          <StyledFormGroup className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" value={contactDetails.email} />
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="catagory">
            <Form.Label>Reason for Contact</Form.Label>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Select reason"
                id="input-group-dropdown-2"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="Enquire about dogs" href="#">Enquiring about dogs</Dropdown.Item>
                <Dropdown.Item eventKey="Enquire about litters" href="#">Enquiring about litters</Dropdown.Item>
                <Dropdown.Item eventKey="Enquire about shows" href="#">Enquiring about shows</Dropdown.Item>
              </DropdownButton>
              <Form.Control aria-label="Reason for contact input with dropdown" placeholder="or enter custom reason" as="input" value={contactDetails.catagory} />
            </InputGroup>
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="details" >
            <Form.Label>Provide More Detail</Form.Label>
            <Form.Control type="textarea" as="textarea" rows={3} placeholder="Provide More Details" value={contactDetails.details} />
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="contactFormSubmitButton">
            <Container fluid>
              <StyledSubmitButton onClick={(e) => handleSubmit(e)}>Submit form</StyledSubmitButton>
            </Container>
          </StyledFormGroup>
        </StyledFormContainer>
      </Form>
    </>
  );
};

export default ContactForm;;