import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { customTheme } from "../../../utils/customPalette";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLitter } from "../../../services/litterServices";
import { useGlobalState } from "../../../utils";

const LitterDetails = () => {
  const params = useParams();
  const { store } = useGlobalState();
  const { litterList, userList, dogList } = store;
  const initialLitterDetails = {

  };
  const [litterDetail, setLitterDetail] = useState(initialLitterDetails);

  const females = Object.entries(dogList).filter(dog => dog[1].sex = 2);
  const males = Object.entries(dogList).filter(dog => dog[1].sex = 1);
  const breeder = Object.entries(userList).filter(user => user[1].breeder = true);

  let Breeder = {};
  let Sire = {};
  let Bitch = {};

  breeder.forEach(user => {
    if (user[1].id === litterDetail.breeder_id) {
      Breeder = user[1];
    }
  });
  males.forEach(sire => {
    if (sire[1].id === litterDetail.sire_id) {
      Sire = sire[1];
    }
  });
  females.forEach(bitch => {
    if (bitch[1].id === litterDetail.bitch_id) {
      Bitch = bitch[1];
    }
  });


  useEffect(() => {
    getLitter(params.id)
      .then(litter => {
        console.log(litter);
        setLitterDetail(litter);
      })
      .catch(e => console.log(e));

  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box>
        <Container maxWidth="sm">
          <Typography variant="h3" align="center">
            {litterDetail.lname}
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
            <Typography>
              Breeder: {litterDetail.breeder_id}
            </Typography>
            <Typography>
              Sire: {litterDetail.sire_id}
            </Typography>
            <Typography>
              Bitch: {litterDetail.bitch_id}
            </Typography>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LitterDetails;