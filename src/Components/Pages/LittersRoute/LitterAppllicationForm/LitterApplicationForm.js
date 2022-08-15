import { Box, Paper, Grid, Typography, FormControl, Container, Button, TextField, InputLabel, Select, MenuItem, InputAdornment, RadioGroup, FormLabel, FormControlLabel, Radio, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton, TableContainer } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { postApplication } from "../../../services/litterServices";
import { useGlobalState } from "../../../utils/componentIndex";


// Criteria form must account for
// >but questions i always ask,      
// do they have children, ( ages )   if young,    
//  other pets,   dogs  ( breeds)  are they desexed,  
//  yard, ?  
//  where do you plan to have puppy sleeping,     
//  anything they feel might let me see that they would be a good pick for one of my pups,   I believe in the happiness of the pup first,
// probably needs their name and contact info too >.>

// TODO - if user has baught dogs, auto fill
// if user enters dog do stuff

const LitterApplicationForm = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList, loggedInUser } = store;
  const navigate = useNavigate();
  const location = useLocation();

  const initialformData = {
    litter_id: '',
    yardarea: 0,
    yardfenceheight: 0,
    user_id: 0,
    child_age: '',
    pets_age: '',
    pets_type: '',
    pets_breed: ''
  };

  const [formData, setFormData] = useState(initialformData);
  const [childrenData, setChildrenData] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [children, setChildren] = useState(false);
  const [pets, setPets] = useState(false);

  // adds the user's id to the contact form automaticallly
  useEffect(() => {
    setFormData({
      ...formData,
      user_id: loggedInUser.id,
      litterList: litterList.filter(litter => {
        return litter.breeder_id !== loggedInUser.id && litter.national !== true;
      })
    });

  }, []);

  // handles all form input
  const handleInput = (e) => {
    const { name, value, type } = e.target;
    console.log(`${name}, ${value}, ${type}`);
    if (name === "child_age" || name === "pets_age") {
      let fixedValue = 0;
      if (Boolean(parseInt(e.target.value))) {
        fixedValue = parseInt(e.target.value);
      } else {
        fixedValue = 0;
      }
      console.log(fixedValue);
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
    if (type === "button") {
      if (name === "add_child") {
        setChildrenData(
          [...childrenData, { age: formData.child_age }]
        );
      }
      if (name === "add_pet") {
        setPetsData(
          [...petsData,
          {
            age: formData.pets_age,
            pettype: formData.pets_type,
            petbreed: formData.pets_breed
          }
          ]
        );
      }
      setFormData({
        ...formData,
        child_age: '',
        pets_age: '',
        pets_type: '',
        pets_breed: '',
      });
    };
  };

  const handleHavePet = (e) => {
    const { value } = e.target;
    setPets(value);
  };

  const handleHaveChildren = (e) => {
    const { value } = e.target;
    setChildren(value);

  };

  // deletes child from childrenData
  const handleDeleteChild = (e, index) => {
    console.log(e);
    console.log(index);
    const newChildren = [...childrenData];
    newChildren.splice(index, 1);
    setChildrenData(
      newChildren
    );
  };
  // deletes pet from petsData
  const handleDeletePet = (e, index) => {
    console.log(e);
    console.log(index);
    const newPets = [...petsData];
    newPets.splice(index, 1);
    setPetsData(
      newPets
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appForm = {
      user_id: formData.user_id,
      litter_id: formData.litter_id,
      yardarea: formData.yardarea,
      yardfenceheight: formData.yardfenceheight,
      children: [...childrenData],
      pets: [...petsData],
    };
    postApplication(appForm)
      .then(application => {
        // dispatch({
        //   type: "setApplicationForms",
        //   data: application
        // });
        navigate('/', { state: { alert: true, location: '/', severity: "success", title: "Success", body: `Application Submitted` } });
      })
      .catch((e) => {
        console.log(e.response);
        navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: e.response.status, body: `${e.response.statusText} ${e.response.data.message}` } });
      });
  };


  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ml: 'auto',
      mr: 'auto',
      maxWidth: "sm",
    }}>
      {console.log(formData)}
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', p: 4 }}>
        <Grid container spacing={2} >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Litter Application</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="litter_select_label">Selected Litter</InputLabel>
              <Select
                name="litter_id"
                id="litter_select_id"
                required
                label="litter_select_label"
                onChange={handleInput}
                value={formData.litter_id}
              >
                {formData.litterList && formData.litterList.map(litter => {
                  return (
                    <MenuItem key={litter.id} value={litter.id}>{litter.lname}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="yardarea"
                id="yardarea-id"
                label="Area of Yard"
                onChange={handleInput}
                value={formData.yardarea}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="yardfenceheight"
                id="yeardfenxeheight-id"
                label="Height of Fence"
                onChange={handleInput}
                value={formData.yardfenceheight}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ display: "flex", alignItems: 'center' }}>
              <FormLabel id="add-children-label">Do you have any children?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="add-children-label"
                value={children}
                onChange={handleHaveChildren}
                name="add-children-group-radio"
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {children === "true" &&
            <>
              <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <FormControl>
                  <TextField name="child_age" id="child_age_id" label="Age" type="number" onChange={handleInput} value={formData.child_age} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                  <Button name="add_child" variant="outlined" onClick={handleInput}>
                    Add Child
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item xs={12} md={8}>
                  <TableContainer component={Paper}>
                    <Table size='small' >
                      <TableHead >
                        <TableRow>
                          <TableCell align="right" sx={{ p: 0 }}>
                            Number
                          </TableCell>
                          <TableCell align="center">Age</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {childrenData.map((child, index) => (
                          <TableRow key={index}>
                            <TableCell align="right">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {child.age}
                            </TableCell>
                            <TableCell align="left" sx={{ p: 0 }}>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={(e) => { handleDeleteChild(e, index); }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
          }
          <Grid item xs={12}>
            <FormControl sx={{ display: "flex", alignItems: 'center' }}>
              <FormLabel id="add-pets-label">Do you have any pets?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="add-pets-label"
                value={pets}
                onChange={handleHavePet}
                name="add-pets-group-radio"
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {pets === "true" &&
            <>
              <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <FormControl>
                  <TextField name="pets_age" id="pets_age_id" label="Age" type="number" onChange={handleInput} value={formData.pets_age} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <FormControl>
                  <TextField name="pets_type" id="pets_type_id" label="Type of Pet" onChange={handleInput} value={formData.pets_type} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <FormControl>
                  <TextField name="pets_breed" id="pets_breed_id" label="Breed of Pet" onChange={handleInput} value={formData.pets_breed} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant="outlined" name="add_pet" onClick={handleInput}>
                    Add Pet
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table size='small' >
                      <TableHead >
                        <TableRow>
                          <TableCell align="right" sx={{ p: 0 }}>
                            Number
                          </TableCell>
                          <TableCell align="center">Age</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Breed</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {petsData.map((pet, index) => (
                          <TableRow key={index}>
                            <TableCell align="right">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {pet.age}
                            </TableCell>
                            <TableCell align="center">
                              {pet.pettype}
                            </TableCell>
                            <TableCell align="center">
                              {pet.petbreed}
                            </TableCell>
                            <TableCell align="left" sx={{ p: 0 }}>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={(e) => { handleDeletePet(e, index); }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
          }
          <Grid item xs={12}>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" type='submit'>
                Post Litter Application
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Paper >
    </Box >
  );
};

export default LitterApplicationForm;