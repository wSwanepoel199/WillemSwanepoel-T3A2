import { useState } from "react";
import { useGlobalState } from "../utils";
import { Container, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { StyledFormContainer, StyledFormGroup, StyledSubmitButton } from "../Shared/styles/ContactForm.styled";
import { Box, Paper, Grid, Typography, InputLabel, TextField, FormControl, MenuItem, Select, TextareaAutosize, Button } from "@mui/material";
import { postForm } from "../services/contactServices";
import { useNavigate } from "react-router";

const ContactForm = () => {
  // uses global state to gain access to dispatch
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    email: "",
    phonenumber: '',
    reason: "",
    text: ""
  };

  const queries = [
    {
      id: 1,
      value: "Enquiring about dogs"
    },
    {
      id: 2,
      value: "Enquiring about litters"
    },
    {
      id: 3,
      value: "Enquiring about shows"
    },
    {
      id: 0,
      value: "Specify in detail box"
    },
  ];
  const [formData, setFormData] = useState(initialFormData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("form:", formData);
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
    navigate('/');
  };

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Create Litter Entry</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" required fullWidth id="emai_id" label="Email" type="email" autoFocus onChange={handleInput} value={formData.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="phonenumber" required fullWidth id="phonenumber_id" label="Prefered Contact Number" type="number" onChange={handleInput} value={formData.name} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="reason_label">Select Reason</InputLabel>
                <Select
                  name="reason"
                  id="reason_id"
                  required
                  label="reason_label"
                  onChange={handleInput}
                  value={formData.reason}
                >
                  {queries.map(reason => {
                    return (
                      <MenuItem key={reason.id} value={reason.id}>{reason.value}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField minRows="4" multiline name="text" required id="details_id" label="Provide More Details" onChange={handleInput} value={formData.name} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Container>
                <Button variant="contained" type='submit'>
                  Submit
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ContactForm;;