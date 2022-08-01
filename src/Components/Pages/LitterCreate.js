import { Grid, FormControl, Input, InputLabel, FormHelperText, Container, Paper, FormGroup, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useGlobalState } from "../utils";

const LitterCreationForm = () => {
  const { store, dispatch } = useGlobalState();
  const { dogList } = store;
  const defaultValues = {
    lname: "",
    breeder_id: "",
    bitch_id: "",
    sire_id: "",
  };
  const females = Object.entries(dogList).filter(dog => dog[1].sex = 2);
  const males = Object.entries(dogList).filter(dog => dog[1].sex = 1);

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };


  return (
    <Box component="form" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Create Litter Entry</Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField name="lname" fullWidth id="lname" label="Litter Name" autoFocus onChange={handleInput} value={formValues.name} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="breeder_id" fullWidth id="breeder_id" label="Select Breeder" autoFocus onChange={handleInput} value={formValues.name} />
            <Select
              name="breeder_id"
              fullWidth
              id="breeder_id"
              label="Select Breeder"
              onChange={handleInput}
              value={formValues.name || ''}
            >
              {females.map(dog => {
                return (
                  <MenuItem value={dog[1].id}>{dog[1].callname}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="bitch_id"
              fullWidth
              id="bitch_id"
              label="Select Bitch"
              onChange={handleInput}
              value={formValues.name || ''}
            >
              {females.map(dog => {
                return (
                  <MenuItem key={dog[0]} value={dog[1].id}>{dog[1].callname}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="sire_id"
              fullWidth
              id="sire_id"
              label="Select Sire"
              onChange={handleInput}
              value={formValues.name || ''}
            >
              {males.map(dog => {
                return (
                  <MenuItem key={dog[0]} value={dog[1].id}>{dog[1].callname}</MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LitterCreationForm;