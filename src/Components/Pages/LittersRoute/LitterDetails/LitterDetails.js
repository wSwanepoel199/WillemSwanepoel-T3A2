import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getShowCase } from "../../../services/litterServices";
import { useGlobalState } from "../../../utils/stateContext";


const LitterDetails = () => {
  const params = useParams();
  const { store } = useGlobalState();
  const { userList } = store;

  const [litter, setLitter] = useState([]);
  const [images, setImages] = useState([]);
  const [breeder, setBreeder] = useState([]);
  const [sire, setSire] = useState([]);
  const [bitch, setBitch] = useState([]);
  const [puppies, setPuppies] = useState([]);

  useEffect(() => {
    getShowCase(params.id)
      .then(reply => {
        console.log(reply);
        if (reply.status === 200) {
          setLitter(reply.data.litter);
          setImages(reply.data.images);
          setSire(reply.data.sire);
          setBitch(reply.data.bitch);
          setPuppies(reply.data.puppies);
          setBreeder(userList.find(user => user.id === reply.data.litter.breeder_id));
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [params, userList]);

  return (
    <>
      <Box component={Paper} sx={{
        ml: 'auto',
        mr: 'auto',
        maxWidth: "md",
        display: 'flex',
        flexDirection: 'column'
      }}>
        {console.log(breeder)}
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid xs={12} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h3">{litter.lname}</Typography>
          </Grid>
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Breeder: {breeder.username}</Typography>
          </Grid>
          <Grid xs={12} sx={{ width: { xs: '100&', sm: '75%', md: '50%' } }}>
            <Box component='img' src={images[0]} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
          </Grid>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }} component={Paper}>
            <Grid xs={12}>
              <Typography variant="h4" sx={{ textAlign: "center", py: 2 }} component={Paper}>Parentage</Typography>
            </Grid>
            <Grid xs={12} sm={5} sx={{ textAlign: 'center', p: 1, my: 2 }} component={Paper}>
              <Typography variant="h5" sx={{ py: 2, my: 1 }} component={Paper}>
                Sire: {sire.realname}
              </Typography>
              <Box>
                <Box component='img' src={sire.main_image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
              </Box>
            </Grid>
            <Grid xs={12} sm={5} sx={{ textAlign: 'center', p: 1, my: 2, display: 'flex', flexDirection: 'column' }} component={Paper}>
              <Typography variant="h5" sx={{ py: 2, my: 1 }} component={Paper}>
                Dam: {bitch.realname}
              </Typography>
              <Box component='img' src={bitch.main_image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </Grid>
          </Grid>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }} component={Paper}>
            <Grid xs={12}>
              <Typography variant="h6" sx={{ textAlign: "center", py: 2 }} component={Paper}>Puppies</Typography>
            </Grid>
            {puppies.map((puppy, index) => {
              return (
                <Grid xs={12} sm={4} key={index} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 1, m: 2 }} component={Paper}>
                  <Typography variant="subtitle1" component={Paper}>{puppy.realname}</Typography>
                  <Box component='img' src={puppy.main_image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </Grid>
              );
            })}
          </Grid>
          {images.length > 1
            && <Grid container component={Paper} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Grid xs={12}>
                <Typography variant="h4" sx={{ textAlign: "center", py: 2 }} component={Paper}>Gallery</Typography>
              </Grid>
              {images.map((image, index) => {
                return index !== 0
                  && <Grid key={index} xs={6} sm={3} sx={{ p: 1 }}>
                    <Box component='img' src={image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                  </Grid>;
              })}
            </Grid>}
        </Grid>
      </Box>
      {/* <Box>
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
      </Container> */}
    </>
  );
};

export default LitterDetails;