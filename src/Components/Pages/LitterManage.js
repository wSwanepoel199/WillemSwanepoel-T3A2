import { Box, Grid, Paper, Typography, Container, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from "react";
import { useGlobalState, Litter } from "../utils";
import { getUsers } from "../services/authServices";

const LitterManage = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList, userList, dogList } = store;

  useEffect(() => {
    getUsers()
      .then(users => {
        dispatch({
          type: "setUserList",
          data: users
        });
      })
      .catch(e => console.log(e));
  }, []);

  const females = Object.entries(dogList).filter(dog => dog[1].sex = 2);
  const males = Object.entries(dogList).filter(dog => dog[1].sex = 1);
  const breeder = Object.entries(userList).filter(user => user[1].breeder = true);

  return (
    <>
      <Paper sx={{ display: 'flex' }}>
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
                {Object.entries(litterList).map((litter, id) =>
                  <Litter key={id} litter={litter[1]} breeder={breeder} sire={males} bitch={females} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Container sx={{ display: "flex", alignContent: "flex-start", p: 2 }}>
            <Button variant="contained" href="/litters/create">
              New Litter
            </Button>
          </Container>
        </Container>
      </Paper>
    </>
  );
};

export default LitterManage;