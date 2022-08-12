import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme, InputBase, OutlinedInput, Collapse, Alert, AlertTitle } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlertComponent, useGlobalState } from "../../../utils/componentIndex";
import { getLitter, patchLitter, postNewPuppies } from "../../../services/litterServices";
import { getDogs } from "../../../services/dogsServices";

const LitterUpdateForm = () => {
  const params = useParams();
  const { store, dispatch } = useGlobalState();
  const { breeders, sires, bitches } = store;
  const navigate = useNavigate();
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

  // initial state of form data
  const initialFormData = {
    id: '',
    lname: "",
    breeder_id: '',
    bitch_id: '',
    sire_id: '',
    edate: '',
    adate: '',
    pdate: '',
    esize: '',
    asize: '',
    puppies: '',
  };
  // initial state of puppies, acts as default
  const initialPuppyData = {
    realname: '',
    callname: '',
    sex: '',
  };
  // defines the state for the form and puppies
  const [formData, setFormData] = useState(initialFormData);
  const [puppyData, setPuppyData] = useState([]);

  // controls the dialog and puppy controls
  const [dialogOpen, setDialogOpen] = useState(false);
  const [puppiesOpen, setPuppiesOpen] = useState(false);

  // on page mount makes get request for specified litter
  useEffect(() => {
    getLitter(params.id)
      .then(litter => {
        console.log("litter", litter);
        // spreads litter into a new object to make it mutable
        let updatingLitter = { ...litter };
        // clears out null values and replaces them with an empty string
        Object.keys(updatingLitter).forEach((key) => {
          if (updatingLitter[key] === null) {
            updatingLitter[key] = '';
          }
        });
        // assigns newly mutated object to formData
        setFormData({
          ...updatingLitter
        });
        // checks if puppies where attached, if so assigns them to puppyData
        if (litter.puppies) {
          setPuppyData([...litter.puppies]);
        }
      })
      .catch(e => console.log(e));
  }, []);

  // formats recieved date
  const handleDate = (e, name) => {
    const date = moment(e).format('YYYY-MM-DD');
    const newDate = {
      target: {
        name: name,
        value: date
      }
    };
    handleInput(newDate);
  };

  // adds an empty array to puppyData
  const handleAddPuppy = () => {
    setPuppyData([...puppyData, { ...initialPuppyData }]);
  };

  // TO-DO introduce delete option

  // handles the input for puppies
  const handlePuppyInput = (e, index) => {
    const { name, value } = e.target;
    // spreads puppyData into new array inorder to mutate values
    const newPuppyData = [...puppyData];
    // located and alters the object containing the specifc puppies data that is being altered
    newPuppyData.splice(index, 1, {
      ...newPuppyData[index],
      [name]: value
    });
    // updates puppyData state with new data
    setPuppyData([
      ...newPuppyData
    ]);
  };

  // updates puppies on the backend
  const handleUpdate = () => {
    // filets out puppies that already exist on the back
    const finalPuppies = puppyData.filter((pup) => {
      return !Object.keys(pup).some(key => key === "id");
    });
    // checks if there are any new puppies
    if (finalPuppies.length > 0) {
      // formats new puppy data so backend can read it
      const updatedPuppies = {
        id: formData.id,
        dogs: [
          ...finalPuppies
        ]
      };

      // makes a post request to backend, creates new puppies
      postNewPuppies(updatedPuppies)
        .then(reply => {
          if (reply.success === "Success") {
            // once all puppies are known by the backend assigns them to formData state
            setFormData({
              ...formData,
              puppies: [...puppyData],
            });
          } else {
            <AlertComponent severity={"error"} title={"Puppies Failed To Update"} body={"Newly entered puppies failed to save"} />;
          }
        })
        .catch((e) => console.log(e));
    }
    // closes dialog
    setDialogOpen(!dialogOpen);
  };

  // closes dialog and deletes any new puppies
  const handleCancel = () => {
    setPuppyData([...formData.puppies]);
  };

  // handles general input for rest of form, consider breaking down into seperate more specific functions
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "esize" || name === 'asize') {
      let fixedValue = 1;
      if (Boolean(parseInt(e.target.value))) {
        fixedValue = parseInt(e.target.value);
      } else {
        fixedValue = 0;
      }
      if (fixedValue > 24) fixedValue = 24;
      if (fixedValue < 0) fixedValue = 0;

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
  };

  // handles form submit, making a patch request to backend to update litter then makes get to fetch new doglist
  const handleSubmit = (e) => {
    e.preventDefault();
    patchLitter(formData.id, formData)
      .then(reply => {
        getDogs()
          .then(dogs => {
            dispatch({
              type: "updateDogList",
              data: dogs
            });
          });
      })
      .catch((e) => console.log(e));
    // todo, add redirect if patch is successful
  };

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        maxWidth: "md",
        ml: 'auto',
        mr: 'auto',
      }}>
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'space-around' }}>
            <Grid xs={12} sx={{ mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>Update {formData.lname}</Typography>
            </Grid>
            <Grid xs={12}>
              {/* input for litter name */}
              <FormControl fullWidth >
                <TextField name="lname" required id="lname-input" label="Litter Name" onChange={handleInput} value={formData.lname} />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              {/* selection field to choose litters breeder */}
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
              {/* selection field to choose litters bitch */}
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
              {/* selection field to choose litters sire */}
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
                {/* date picker to the predicted date */}
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
              {/* date picker for the expected date */}
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
              {/* date picker for the actual date */}
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
              {/* input field for the expected size */}
              <FormControl fullWidth sx={{ display: "flex", alignItems: "center" }} >
                <TextField name="esize" id="esize-input" label="Expected Litter Size" onChange={handleInput} value={formData.esize} type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={5}>
              {/* input field for the actual size, not sure if needed */}
              <FormControl fullWidth sx={{ display: "flex", alignItems: 'center' }}>
                <TextField name="asize" id="asize-input" label="Actual Litter Size" onChange={handleInput} value={formData.asize} type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </FormControl>
            </Grid>
            {/* checks if actual date has been entered if not, renders nothing*/}
            {formData.adate.length < 1 ?
              null
              :

              <>
                {/* provides dropdown functionality by clicking on manage puppies title */}
                <Grid xs={12} sx={{ display: "flex", justifyContent: 'center' }}>
                  <Typography onClick={() => setPuppiesOpen(!puppiesOpen)} variant="h6">Manage Puppies {puppiesOpen ? <KeyboardArrowDown /> : <KeyboardArrowLeft />} </Typography>
                </Grid>
                <Collapse
                  in={puppiesOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid xs={12}>
                    {/* button to open up manage puppies dialog */}
                    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                      <Button variant="outlined" name="add_pet" onClick={() => setDialogOpen(!dialogOpen)}>
                        Manage Puppies
                      </Button>
                    </Box>
                  </Grid>
                  {/* dialog, allows puppies to be added and renamed, future: removed */}
                  <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(!dialogOpen)}
                    fullScreen={fullscreen}
                  >
                    <DialogTitle>Manage Puppies</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid xs={12}>
                          <DialogContentText>
                            Add or remove puppies from litter.
                          </DialogContentText>
                        </Grid>
                        <Grid xs={12}>
                          <Box>
                            <Button variant="outlined" name="add_pet" onClick={handleAddPuppy}>
                              Add Puppy
                            </Button>
                          </Box>
                        </Grid>
                        <Grid xs={12}>
                          {/* displays puppies an a table list */}
                          <TableContainer component={Paper}>
                            <Table size='small' sx={{ minWidth: 550 }} >
                              <TableHead >
                                <TableRow>
                                  <TableCell align="center">
                                    <TableSortLabel>Name</TableSortLabel>
                                  </TableCell>
                                  <TableCell align="center">Intended Call name</TableCell>
                                  <TableCell align="center">Sex</TableCell>
                                  <TableCell />
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {puppyData.map((dog, index) => (
                                  <TableRow key={index}>
                                    <TableCell align="center">
                                      <InputBase name="realname" id="dog_realname_id" required onChange={(e) => handlePuppyInput(e, index)} placeholder="enter realname" value={puppyData[index].realname}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <InputBase name="callname" id="calllname_id" required onChange={(e) => handlePuppyInput(e, index)} placeholder="enter callname" value={puppyData[index].callname}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Select
                                        name="sex"
                                        displayEmpty
                                        fullWidth
                                        required
                                        label=''
                                        id="dog_sex_id"
                                        onChange={(e) => handlePuppyInput(e, index)}
                                        value={puppyData[index].sex}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                          if (selected === 1) {
                                            return (<em>Male</em>);
                                          } else if (selected === 2) {
                                            return (<em>Female</em>);
                                          } else {
                                            return (<em>Select Sex</em>);
                                          }
                                        }}
                                      >
                                        <MenuItem value={1}>Male</MenuItem>
                                        <MenuItem value={2}>Female</MenuItem>
                                      </Select>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleUpdate()}>Update Pupppies</Button>
                      <Button onClick={() => handleCancel()}>Cancel Edits</Button>
                    </DialogActions>
                  </Dialog>
                  <Grid xs={12}>
                    {/* another table to view all puppies in list no ability to edit */}
                    <TableContainer component={Paper} sx={{ width: '100%' }}>
                      <Table size='small' sx={{ minWidth: 650 }} >
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
                          {puppyData.map((dog, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">
                                {dog.realname}
                              </TableCell>
                              <TableCell align="center">
                                {dog.callname}
                              </TableCell>
                              <TableCell align="center">
                                {dog.sex === 2 && "female"}
                                {dog.sex === 1 && "male"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Collapse>
              </>
            }
            <Grid xs={12}>
              <Container>
                <Button variant="contained" type='submit'>
                  Update Litter
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