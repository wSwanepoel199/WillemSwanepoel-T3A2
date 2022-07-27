import { useState } from "react";
import { useGlobalState } from "../utils";
import { Container, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledFormGroup, StyledSubmitButton } from "../Shared/styles/ContactForm.styled";

const ContactForm = () => {
  // uses global state to gain access to dispatch
  const { dispatch } = useGlobalState();

  const initialContactDetails = {
    email: "",
    phonenumber: '',
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
    setContactDetails({
      ...contactDetails,
      [e.id]: e.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContactForm = {
      email: contactDetails.email,
      phonenumber: contactDetails.phonenumber,
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
      <Form>
        <StyledFormContainer>
          <h2>Contact Form</h2>
          <StyledFormGroup className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" value={contactDetails.email} onChange={(e) => handleFormInput(e.target)} />
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="phonenumber">
            <Form.Label>Prefered Contact Number</Form.Label>
            <Form.Control type="phonenumber" placeholder="Enter your prefered contact number" value={contactDetails.phonenumber} onChange={(e) => handleFormInput(e.target)} />
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
              <Form.Control aria-label="Reason for contact input with dropdown" placeholder="or enter custom reason" as="input" value={contactDetails.catagory} onChange={(e) => handleFormInput(e.target)} />
            </InputGroup>
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="details" >
            <Form.Label>Provide More Detail</Form.Label>
            <Form.Control type="textarea" as="textarea" rows={3} placeholder="Provide More Details" value={contactDetails.details} onChange={(e) => handleFormInput(e.target)} />
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