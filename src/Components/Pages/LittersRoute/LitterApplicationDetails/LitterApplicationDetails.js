import { ThemeProvider, Box, Container, Typography, Paper, FormControl, Select, InputLabel, MenuItem, TextField, InputAdornment, FormLabel, RadioGroup, Radio, FormControlLabel, Button, TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { customTheme } from "../../../utils/customPalette";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { getLitterApp } from "../../../services/litterServices";
import { useParams } from "react-router";
import { CustomTable, useGlobalState } from "../../../utils/componentIndex";

// include assigned puppy

const LitterApplicationDetails = (props) => {
  const params = useParams();
  const { store, dispatch } = useGlobalState();
  const { litterList, userList } = store;

  const [applicationDetails, setApplicationDetais] = useState([]);
  const [availablePups, setAvailablePups] = useState([]);

  useEffect(() => {
    getLitterApp(props.id)
      .then(litterApp => {
        console.log(litterApp);
        if (litterApp.status === 200) {
          const { data } = litterApp;
          const filledLitterApp = {
            ...data.litterApplication,
            children: data.children,
            pets: data.pets,
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
          <Paper sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', p: 4 }}>
            <Grid container spacing={2} >
              <Grid xs={12} sx={{ mb: 3 }}>
                <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>Litter Application {applicationDetails.id}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography textAlign='center'>Submitted by: {applicationDetails.user && applicationDetails.user.username}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography textAlign='center'>Yard area: {applicationDetails.yardarea}m²</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography textAlign='center'>Fence height: {applicationDetails.yardfenceheight}m</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography textAlign='center'>Sex preferance: {applicationDetails.sex_preference}</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Typography textAlign='center'>Colour preferance: {applicationDetails.colour_preference}</Typography>
              </Grid>
              {applicationDetails.children === true
                && <>
                  {applicationDetails.children.length > 0
                    && <>
                      <Grid xs={12}>
                        <Typography variant="h5" textAlign='center'>Children:</Typography>
                      </Grid>
                      <Grid xs={12}>
                        <Grid xs={12}>
                          <CustomTable
                            head={
                              <>
                                <TableCell align="center">
                                  Number
                                </TableCell>
                                <TableCell align="center">
                                  Age
                                </TableCell>
                              </>
                            }
                            body={
                              <>
                                {applicationDetails.children.map((child, index) => (
                                  <TableRow key={index}>
                                    <TableCell align="center">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                      {child.age}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </>
                            }
                          />
                        </Grid>
                      </Grid>
                    </>
                  }
                </>}
              {applicationDetails.pets === true
                && <>
                  {applicationDetails.pets.length > 0
                    && <>
                      <Grid xs={12}>
                        <Typography variant="h5" textAlign='center'>Pets:</Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid item xs={12}>
                          <CustomTable
                            head={
                              <>
                                <TableCell align="center" sx={{ p: 0 }}>
                                  Number
                                </TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Breed</TableCell>
                                {applicationDetails.pets.find(pet => pet.desexed)
                                  && <TableCell align="center">Desexed</TableCell>}
                              </>
                            }
                            body={<>
                              {applicationDetails.pets.map((pet, index) => (
                                <TableRow key={index}>
                                  <TableCell align="center">
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
                                  <TableCell align="center">
                                    {pet.desexed
                                      ? <> {pet.desexed === true && "Yes"}</>
                                      : <>{pet.desexed === false && "No"}</>
                                    }
                                  </TableCell>
                                </TableRow>
                              ))}
                            </>}
                          />
                        </Grid>
                      </Grid>
                    </>
                  }
                </>}
            </Grid>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LitterApplicationDetails;