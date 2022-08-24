import { Box, Container, Typography, Button, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getLitter } from "../../../services/litterServices";
import { useGlobalState } from "../../../utils/componentIndex";

// Add app id field for identifyier, and include fufill state
// management for unproccseed, approved and rejected

const LitterApplications = () => {
  const params = useParams();
  const { store } = useGlobalState();
  const { userList, dogList } = store;

  const [litterDetail, setLitterDetail] = useState([]);
  const [litterApplications, setLitterApplications] = useState([]);
  const [availablePuppies, setAvailablePups] = useState([]);

  useEffect(() => {
    getLitter(params.id)
      .then(litter => {
        console.log(litter);
        setLitterDetail({
          ...litter,
          breeder: userList.find((user) => user.id === litter.breeder_id),
          sire: dogList.find((sire) => sire.id === litter.sire_id),
          bitch: dogList.find((bitch) => bitch.id === litter.bitch_id),
        });
        if (litter.litterApplications) {
          setLitterApplications(litter.litterApplications);
        }
        if (litter.puppies) {
          setAvailablePups(litter.puppies);
        }
      })
      .catch(e => console.log(e));
  }, [dogList, userList, params]);

  return (
    <>
      <Box>
        {console.log(litterDetail)}
        <Container maxWidth="sm">
          <Typography variant="h3" align="center">
            {litterDetail.lname} Applications
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid xs={12} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
            <Typography>
              Breeder: {litterDetail.breeder && litterDetail.breeder.username}
            </Typography>
            <Typography>
              Sire: {litterDetail.sire && litterDetail.sire.realname}
            </Typography>
            <Typography>
              Bitch: {litterDetail.bitch && litterDetail.bitch.realname}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ justifyContent: 'center', textAlign: "center", mt: 4 }}>
        {/* <LitterApplicationManage litterApps={litterApplications} litter={litterDetail} /> */}
        <Grid container spacing={4}>
          <Grid xs={6} component={Paper}>
            <Stack>
              {litterApplications.map((app, index) => {
                return (
                  <Typography key={index}>{app.id}</Typography>
                );
              })}
            </Stack>
          </Grid>
          <Grid xs={6} component={Paper}>
            <Stack>
              {availablePuppies.map((puppy, index) => {
                return (
                  <Typography key={index}>{puppy.realname}</Typography>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Link to="/litters/manage">
          <Button variant="contained">
            Return to Manage Litters
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default LitterApplications;