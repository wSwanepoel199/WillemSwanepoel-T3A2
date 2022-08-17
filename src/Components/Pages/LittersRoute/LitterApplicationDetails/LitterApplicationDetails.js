import { ThemeProvider, Box, Container, Typography, Paper, FormControl, Select, InputLabel, MenuItem, TextField, InputAdornment, FormLabel, RadioGroup, Radio, FormControlLabel, Button, TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { customTheme } from "../../../utils/customPalette";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { getLitterApp } from "../../../services/litterServices";
import { useParams } from "react-router";
import { CustomTable, useGlobalState } from "../../../utils/componentIndex";

// include assigned puppy

const LitterApplicationDetails = () => {
  const params = useParams();
  const { store, dispatch } = useGlobalState();
  const { litterList, userList } = store;

  const [applicationDetails, setApplicationDetais] = useState([]);
  const [availablePups, setAvailablePups] = useState([]);

  useEffect(() => {
    getLitterApp(params.id)
      .then(litterApp => {
        console.log(litterApp);
        if (litterApp.status === 200) {
          const { data } = litterApp;
          const filledLitterApp = {
            ...data.litterApplication,
            litter: litterList.find(litter => litter.id === data.litterApplication.litter_id),
            user: userList.find(user => user.id === data.litterApplication.user_id)
          };
          setApplicationDetais(filledLitterApp);
          setAvailablePups(data.availablePuppies);
        }
      })
      .catch(e => console.log(e));

  }, []);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ml: 'auto',
          mr: 'auto',
          maxWidth: "sm",
        }}>
          {console.log(applicationDetails)}
          <Paper sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', p: 4 }}>
            <Grid container spacing={2} >
              <Grid xs={12} sx={{ mb: 3 }}>
                <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>Litter Application {applicationDetails.id}</Typography>
              </Grid>
              <Grid xs={6}>
                <Typography>Submitted by: {applicationDetails.user && applicationDetails.user.username}</Typography>
              </Grid>
              <Grid xs={6}>
                <Typography>For Litter: {applicationDetails.litter && applicationDetails.litter.lname}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography>Yard area: {applicationDetails.yardarea}m²</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography>Fence height: {applicationDetails.yardfenceheight}m</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="h5" textAlign='center'>Children:</Typography>
              </Grid>
              {/* {children === "true" &&
                <>
                  <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <FormControl>
                      <TextField name="child_age" id="child_age_id" label="Age" type="number" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                      <Button name="add_child" variant="outlined" >
                        Add Child
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={12} md={8}>
                      <CustomTable
                        head={
                          <>
                            <TableCell align="right" sx={{ p: 0 }}>
                              Number
                            </TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell />
                          </>
                        }
                        body={
                          <>
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

                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        }
                      />
                    </Grid>
                  </Grid>
                </>
              } */}
              <Grid xs={12}>
                <Typography variant="h5" textAlign='center'>Pets:</Typography>
              </Grid>
              {/* {pets === "true" &&
                <>
                  <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <FormControl>
                      <TextField name="pets_age" id="pets_age_id" label="Age" type="number" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <FormControl>
                      <TextField name="pets_type" id="pets_type_id" label="Type of Pet" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <FormControl>
                      <TextField name="pets_breed" id="pets_breed_id" label="Breed of Pet" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                      <Button variant="outlined" name="add_pet">
                        Add Pet
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={12}>
                      <CustomTable
                        head={
                          <>
                            <TableCell align="right" sx={{ p: 0 }}>
                              Number
                            </TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Breed</TableCell>
                            <TableCell />
                          </>
                        }
                        body={<>
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

                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>}
                      />
                    </Grid>
                  </Grid>
                </>
              } */}
            </Grid>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LitterApplicationDetails;