import { Box, Grid, Paper, Typography, Container, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalState, Litter } from "../../../utils/componentIndex";
import { getLitterApps } from "../../../services/litterServices";
import { Link } from "react-router-dom";

const LitterManage = () => {
  const { store, dispatch } = useGlobalState();
  const { mergedLitterList, applicationForms } = store;

  useEffect(() => {
    getLitterApps()
      .then(apps => {
        dispatch({
          type: 'setApplicationForms',
          data: apps
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Paper sx={{ display: 'flex' }}>
        {console.log(mergedLitterList)}
        {console.log(applicationForms)}
        <Container sx={{ justifyContent: 'center', textAlign: "center", mt: 4 }}>
          <Typography variant="h5" component="h1">Manage Litters</Typography>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>
                    <Typography>Litter Name</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Breeder</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Sire</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Bitch</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Expected Date</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Delivered Date</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(mergedLitterList).map((litter) =>
                  <Litter key={litter.id} litter={litter} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Container sx={{ display: "flex", alignContent: "flex-start", p: 2 }}>
            <Link to="/litters/create">
              <Button variant="contained">
                New Litter
              </Button>
            </Link>
          </Container>
        </Container>
      </Paper>
    </>
  );
};

export default LitterManage;