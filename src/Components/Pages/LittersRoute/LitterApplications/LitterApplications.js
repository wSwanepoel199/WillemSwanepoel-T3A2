import { ThemeProvider, Box, Container, Typography, Paper, TableContainer, Table, TableRow, TableHead, TableBody, TableCell, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { customTheme } from "../../../utils/customPalette";
import { getLitter } from "../../../services/litterServices";
import { useGlobalState, LitterApplication, CustomTable, LitterApplicationManage } from "../../../utils/componentIndex";

// Add app id field for identifyier, and include fufill state
// management for unproccseed, approved and rejected

const LitterApplications = () => {
  const params = useParams();
  const { store } = useGlobalState();
  const { userList, litterList, dogList } = store;

  const [litterDetail, setLitterDetail] = useState([]);
  const [litterApplications, setLitterApplications] = useState([]);

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
      })
      .catch(e => console.log(e));
  }, []);

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
        <LitterApplicationManage litterApps={litterApplications} />
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