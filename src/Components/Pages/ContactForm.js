import { useState } from "react";
import { useGlobalState } from "../utils";
import { Container, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledFormGroup, StyledSubmitButton } from "../Shared/styles/ContactForm.styled";
import { postForm } from "../services/contactServices";

const ContactForm = () => {
  // uses global state to gain access to dispatch
  const { dispatch } = useGlobalState();

  const initialFormData = {
    email: "",
    phonenumber: '',
    reason: "",
    text: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSelect = (e) => {
    console.log("Seletected:", e);
    const selectedCatagory = {
      id: "reason",
      value: parseInt(e)
    };
    handleFormData(selectedCatagory);
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.id]: e.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const submitForm = {
      contact: {
        ...formData
      }
    };
    postForm(submitForm)
      .then(contact => {
        console.log(contact);
      })
      .catch(e => {
        console.log(e.response.data.message);
        alert(e.response.data.message);
      });


    setFormData(initialFormData);
  };

  return (
    <>
      <Form>
        <StyledFormContainer>
          <h2>Contact Form</h2>
          <StyledFormGroup className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => handleFormData(e.target)} />
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="phonenumber">
            <Form.Label>Prefered Contact Number</Form.Label>
            <Form.Control type="phonenumber" placeholder="Enter your prefered contact number" value={formData.phonenumber} onChange={(e) => handleFormData(e.target)} />
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="reason">
            <Form.Label>Reason for Contact</Form.Label>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Select reason"
                id="input-group-dropdown-2"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="1" id="dogs-enquiries" href="#">Enquiring about dogs</Dropdown.Item>
                <Dropdown.Item eventKey="2" id="litter-enquiries" href="#">Enquiring about litters</Dropdown.Item>
                <Dropdown.Item eventKey="3" id="show-enquiries" href="#">Enquiring about shows</Dropdown.Item>
                <Dropdown.Item eventKey="0" id="unlisted-enquiries" href="#">Specify in detail box</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </StyledFormGroup>
          <StyledFormGroup className="mb-3" controlId="text" >
            <Form.Label>Provide More Detail</Form.Label>
            <Form.Control type="textarea" as="textarea" rows={3} placeholder="Provide More Details" value={formData.text} onChange={(e) => handleFormData(e.target)} />
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