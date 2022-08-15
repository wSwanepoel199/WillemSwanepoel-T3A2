import { ThemeProvider, Box, Container, Typography } from "@mui/material";
import { customTheme } from "../../../utils/customPalette";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { getLitterApp } from "../../../services/litterServices";
import { useParams } from "react-router";

const LitterApplicationDetails = () => {
  const params = useParams();

  const [applicationDetails, setApplicationDetais] = useState([]);
  const [availablePups, setAvailablePups] = useState([]);

  useEffect(() => {
    getLitterApp(params.id)
      .then(litterApp => {
        console.log(litterApp);
        setApplicationDetais(litterApp.litterApplication);
        setAvailablePups(litterApp.availablePuppies);
      })
      .catch(e => console.log(e));

  }, []);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Box>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center">
              {applicationDetails.id}
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
                {/* Breeder: {litterDetail.breeder_id} */}
              </Typography>
              <Typography>
                {/* Sire: {litterDetail.sire_id} */}
              </Typography>
              <Typography>
                {/* Bitch: {litterDetail.bitch_id} */}
              </Typography>
            </Grid>
            <Grid xs={4}>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LitterApplicationDetails;