import { Box, Grid, Paper, Typography, Container, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalState, LitterApplication } from "../../../utils/componentIndex";
import { Link } from "react-router-dom";
import { getLitterApps } from "../../../services/litterServices";

const LitterApplicationsManage = () => {
  const { store, dispatch } = useGlobalState();
  const { userList, litterList } = store;

  const [appData, setAppData] = useState([]);

  useEffect(() => {
    getLitterApps()
      .then(apps => {
        dispatch({
          type: 'setApplicationForms',
          data: apps
        });
        setAppData([
          ...apps
        ]);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Paper sx={{ display: 'flex' }}>
        <Container sx={{ justifyContent: 'center', textAlign: "center", mt: 4 }}>
          <Typography variant="h5" component="h1">Manage Litters Applications</Typography>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>
                    <Typography>User</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Litter</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Yard Area</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Fence Height</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography>Priority</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appData.map((app) => {
                  const user = userList.find(user => user.id === app.user_id);
                  const litter = litterList.find(litter => litter.id === app.litter_id);
                  return (
                    <LitterApplication key={app.id} app={app} user={user} litter={litter} />
                  );
                })}
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

export default LitterApplicationsManage;