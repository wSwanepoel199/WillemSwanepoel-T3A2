import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../../utils/componentIndex";
import { getLitter } from "../../../services/litterServices";

const LitterUpdateForm = () => {
  const params = useParams();
  const { store } = useGlobalState();
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
    asize: '',
    puppies: []
  };
  const initialPuppyData = {
    realname: '',
    callname: '',
    sex: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [puppyData, setPuppyData] = useState();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getLitter(params.id)
      .then(litter => {
        console.log("litter", litter);
        setFormData({
          lname: litter.lname,
          breeder_id: litter.breeder_id,
          bitch_id: litter.bitch_id,
          sire_id: litter.sire_id,
          edate: litter.edate,
          adate: litter.adate,
          pdate: litter.pdate,
          esize: 8,
          puppies: [...litter.puppies],
        });
      })
      .catch(e => console.log(e));
  }, []);


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
    if (name === "esize" || name === 'asize') {
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

  };

  // introduce puppy creation

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: "md",
        ml: 'auto',
        mr: 'auto',
      }}>
        {console.log(formData)}
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'space-around' }}>
            <Grid xs={12} sx={{ mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>Update { }</Typography>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth >
                <TextField name="lname" required id="lname-input" label="Litter Name" onChange={handleInput} value={formData.lname} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
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
            <Grid xs={12} sm={6}>
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
            <Grid xs={12} sm={6}>
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
            <Grid xs={12}>
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
            <Grid xs={12} sm={6}>
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
            <Grid xs={12} sm={6}>
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
            <Grid xs={12} sm={5} >
              <FormControl fullWidth sx={{ display: "flex", alignItems: "center" }} >
                <TextField name="esize" id="esize-input" label="Expected Litter Size" onChange={handleInput} value={formData.esize} type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={5}>
              <FormControl fullWidth sx={{ display: "flex", alignItems: 'center' }}>
                <TextField name="asize" id="asize-input" label="Actual Litter Size" onChange={handleInput} value={formData.asize}
                  type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </FormControl>
            </Grid>
            <Grid xs={12} sx={{ display: "flex", justifyContent: 'center' }}>
              <Typography variant="h6">Add/Manage Puppies</Typography>
            </Grid>

            <Grid xs={12} sm={4} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
              <FormControl>
                <TextField name="pets_age" id="pets_age_id" label="Age" type="number" onChange={handleInput} value={formData.pets_age} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={4} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
              <FormControl>
                <TextField name="pets_type" id="pets_type_id" label="Type of Pet" onChange={handleInput} value={formData.pets_type} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={4} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
              <FormControl>
                <TextField name="pets_breed" id="pets_breed_id" label="Breed of Pet" onChange={handleInput} value={formData.pets_breed} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="outlined" name="add_pet" onClick={() => setOpen(!open)}>
                  Manage Puppies
                </Button>
              </Box>
            </Grid>
            <Dialog
              open={open}
              onClose={() => setOpen(!open)}
            >
              <DialogTitle>Manage Puppies</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add or remove puppies from litter.
                </DialogContentText>
                <TextField id="test ID" />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(!open)}>Cancel</Button>
                <Button onClick={() => setOpen(!open)}>Do Nothing</Button>
              </DialogActions>
            </Dialog>
            <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Grid xs={12}>
                <TableContainer component={Paper}>
                  <Table size='small' >
                    <TableHead >
                      <TableRow>
                        <TableCell align="center">
                          <TableSortLabel>Name</TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Intended Call name</TableCell>
                        <TableCell align="center">Sex</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.puppies.map((dog) => (
                        <TableRow key={dog.id}>
                          <TableCell align="center">
                            {dog.realname}
                          </TableCell>
                          <TableCell align="center">
                            {dog.callname}
                          </TableCell>
                          {dog.sex === 2 ?
                            <TableCell align="center">female</TableCell>
                            :
                            <TableCell align="center">male</TableCell>
                          }
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            <Grid xs={12}>
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
    </>
  );
};

export default LitterUpdateForm;


const PuppyDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
    >
      <DialogTitle>Manage Puppies</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add or remove puppies from litter.
        </DialogContentText>
        <TextField id="test ID" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)}>Cancel</Button>
        <Button onClick={() => setOpen(!open)}>Do Nothing</Button>
      </DialogActions>
    </Dialog>
  );
};