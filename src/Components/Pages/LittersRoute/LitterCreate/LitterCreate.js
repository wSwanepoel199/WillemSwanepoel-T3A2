import { Grid, FormControl, Input, InputLabel, FormHelperText, Container, Paper, FormGroup, Typography, TextField, Select, MenuItem, Button, Slider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment';
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useGlobalState } from "../../../utils/componentIndex";
import { postLitter } from "../../../services/litterServices";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LitterCreationForm = () => {
  const { store, dispatch } = useGlobalState();
  const { breeders, sires, bitches } = store;
  const navigate = useNavigate();

  const initialFormData = {
    lname: "",
    breeder_id: '',
    bitch_id: '',
    sire_id: '',
    edate: '',
    adate: '',
    pdate: '',
    esize: 1,
  };


  const [formData, setFormData] = useState(initialFormData);


  const handleDate = (e, name) => {
    console.log(e);
    console.log(moment(e).format('YYYY-MM-DD'));
    const date = moment(e).format('YYYY-MM-DD');
    const newDate = {
      target: {
        name: name,
        value: date
      }
    };
    handleInput(newDate);
  };

  const sliderValue = (value) => {
    return `${value} puppies`;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    if (name === "esize") {
      let fixedValue = 1;
      if (Boolean(parseInt(e.target.value))) {
        fixedValue = parseInt(e.target.value);
      } else {
        fixedValue = 1;
      }
      console.log(fixedValue);
      if (fixedValue > 24) fixedValue = 24;
      if (fixedValue < 1) fixedValue = 1;

      setFormData({
        ...formData,
        [name]: fixedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log("form:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    postLitter(formData)
      .then((litter) => {
        console.log(litter);
      })
      .catch(e => {
        console.log(e.response.data.message);
        alert(e.response.data.message);
      });

    setFormData(initialFormData);
    navigate('/litters/manage');

  };


  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {console.log(store)}
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Create Litter Entry</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField name="lname" required fullWidth id="lname" label="Litter Name" autoFocus onChange={handleInput} value={formData.name} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="breeder_label">Select Breeder</InputLabel>
              <Select
                name="breeder_id"
                id="breeder_id"
                required
                label="breeder_label"
                onChange={handleInput}
                value={formData.breeder_id}
              >
                {Object.values(breeders).map(breeder => {
                  return (
                    <MenuItem key={breeder.id} value={breeder.id}>{breeder.username}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="bitch_label">Select Bitch</InputLabel>
              <Select
                name="bitch_id"
                fullWidth
                required
                id="bitch_id"
                label="bitch_label"
                onChange={handleInput}
                value={formData.bitch_id}
              >
                {Object.values(bitches).map(dog => {
                  return (
                    <MenuItem key={dog.id} value={dog.id}>{dog.callname}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sire_label">Select Sire</InputLabel>
              <Select
                name="sire_id"
                fullWidth
                required
                id="sire_id"
                label="sire_label"
                onChange={handleInput}
                value={formData.sire_id}
              >
                {Object.values(sires).map(dog => {
                  return (
                    <MenuItem key={dog.id} value={dog.id}>{dog.callname}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <DatePicker
                name="pdate"
                id="pdate_picker"
                label="Select Predicted Delivery Date"
                ampm
                required
                inputFormat="DD/MM/YYYY"
                mask="__/__/____"
                views={['year', 'month', 'day']}
                value={formData.pdate}
                onChange={(e) => { handleDate(e, "pdate"); }}
                onAccept={(e) => { handleDate(e, "pdate"); }}
                renderInput={(params) => <TextField {...params} helperText="dd/mm/yyyy"></TextField>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <DatePicker
                name="edate"
                id="edate_picker"
                label="Select Expected Delivery Date"
                ampm
                inputFormat="DD/MM/YYYY"
                mask="__/__/____"
                views={['year', 'month', 'day']}
                value={formData.edate}
                onChange={(e) => { handleDate(e, "edate"); }}
                onAccept={(e) => { handleDate(e, "edate"); }}
                renderInput={(params) => <TextField {...params} helperText="dd/mm/yyyy"></TextField>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <DatePicker
                name="adate"
                id="adate_picker"
                label="Select Actual Delivery Date"
                ampm
                inputFormat="DD/MM/YYYY"
                mask="__/__/____"
                views={['year', 'month', 'day']}
                value={formData.adate}
                onChange={(e) => { handleDate(e, "adate"); }}
                renderInput={(params) => <TextField {...params} helperText="dd/mm/yyyy"></TextField>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl fullWidth>
              <TextField name="esize" id="esize-input" label="Expected Litter Size" onChange={handleInput} value={formData.esize} type="number" />
              <Slider
                name="esize"
                id="esize-slider"
                label="esize-label"
                min={1}
                max={24}
                getAriaValueText={sliderValue}
                valueLabelDisplay="auto"
                onChange={handleInput}
                value={formData.esize}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Container>
              <Button variant="contained" type='submit'>
                Create Litter
              </Button>
              <Link to="..">
                <Button variant="text">
                  Return
                </Button>
              </Link>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LitterCreationForm;