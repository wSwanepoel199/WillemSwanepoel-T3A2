import { Box, Button, Collapse, Paper, Typography } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getDog } from "../../../services/dogsServices";
import moment from 'moment';
import { useGlobalState } from '../../../utils/stateContext';
import DogCard from '../Dogcard/DogCard';
import { healthTestKeys, healthTestValues } from '../../../utils/helpers/findOriginal';
import ViewPedigree from '../DogPedigree/DogPedigree';

const DogDetails = () => {
  const { store } = useGlobalState();
  const { dogList, loggedInUser } = store;
  const params = useParams();
  const mounted = useRef();

  const [dogDetails, setDogDetails] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [healthtest, setHealthtest] = useState([]);
  const [litter, setLittter] = useState([]);
  const [litters, setLitters] = useState([]);
  const [owner, setOwner] = useState([]);

  const [viewPedigree, setViewPedigree] = useState(false);

  useEffect(() => {
    console.log(params);
    // if (!mounted.current) {
    getDog(params.id)
      .then(res => {
        console.log(res);
        const { data } = res;
        setDogDetails(data.dog);
        setHealthtest(data.healthtest || []);
        setLitters(data.litters || []);
        setLittter(data.litter || []);
        setGallery(data.gallery_images || []);
        setOwner(data.owner_details || []);
        // mounted.current = true;
      })
      .catch(e => console.log(e));
    // }
  }, [mounted, params]);

  const healthTestAnalizer = (test) => {
    return test !== null ? healthTestValues.find(result => test === result.id).status : "Unknown";
  };

  return (
    <>
      <Box component={Paper} sx={{
        ml: 'auto',
        mr: 'auto',
        maxWidth: "md",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid xs={12} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h3">{dogDetails.realname}</Typography>
          </Grid>
          <Grid xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Owner: {dogDetails.ownername}</Typography>
          </Grid>
          <Grid xs={6} sx={{ textAlign: 'center' }}>
            {dogDetails.dob
              ?
              <Typography >Born: {moment(dogDetails.dob).format('MMM Do YYYY')}</Typography>
              :
              <Typography>Not Provided</Typography>}
          </Grid>
          <Grid xs={6} sx={{ textAlign: 'center' }}>
            <Typography>
              Sex: {(dogDetails.sex === 1 && "Male") || (dogDetails.sex === 2 && "Female")}
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Box sx={{ width: { xs: '100&', sm: '75%', md: '50%' } }}>
              <Box component='img' src={dogDetails.main_image} sx={{ width: '100%', objectFit: 'contain' }} />
            </Box>
          </Grid>
          <Grid xs={12} sx={{ textAlign: 'center', p: 2 }}>
            <Typography>
              {dogDetails.description}
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => { setViewPedigree(!viewPedigree); }}>View Pedigree Breakdown</Button>
          </Grid>
          <Collapse in={viewPedigree} unmountOnExit>
            <Grid xs={12} sx={{ py: 2 }}>
              <ViewPedigree dog={dogDetails} />
            </Grid>
          </Collapse>
          {(loggedInUser.admin && owner !== [])
            && <Grid xs={12} container component={Paper} sx={{ py: 2 }}>
              <Grid xs={12} sx={{ textAlign: 'center' }}>
                <Typography>Name: {owner.firstname} {owner.lastname}</Typography>
                <Typography>Username: {owner.username}</Typography>
                <Typography>Email: {owner.email}</Typography>
                <Typography>Phonenumber: {owner.phonenumber}</Typography>
                <Typography>Address: {owner.address1} {owner.address2}, {owner.suburb}, {owner.postcode}</Typography>
              </Grid>
            </Grid>}
          {healthtest.length !== 0
            && <Grid xs={12} container component={Paper} sx={{ py: 2 }}>
              <Grid xs={12}>
                <Typography variant="h4" sx={{ textAlign: 'center', py: 2 }} component={Paper}>Health Test</Typography>
              </Grid>
              <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                {Object.entries(healthTestKeys).map((key, index) => {
                  const testResult = Object.entries(healthtest).find(test => test[0] === key[0]);
                  return (
                    <Grid key={index} xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', p: 2 }}>
                      <Typography variant='h6'>{`${testResult[0].toUpperCase()}: `}&nbsp;</Typography>
                      <Typography variant='body1'>{healthTestAnalizer(testResult[1])}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>}
          {litter.length !== 0
            && <Grid xs={12} container component={Paper} sx={{ display: 'flex', justifyContent: 'space-evenly', py: 2 }}>
              <Grid xs={12}>
                <Typography variant="h4" sx={{ textAlign: "center", py: 2 }} component={Paper}>Litter</Typography>
              </Grid>
              <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'space-evenly', textAlign: 'center' }}>
                <Grid xs={12} sm={5}>
                  <Typography variant="h6">Sire</Typography>
                  <DogCard dog={dogList.find(dog => dog.id === litter.sire_id)} />
                </Grid>
                <Grid xs={12} sm={5}>
                  <Typography variant="h6">Dam</Typography>
                  <DogCard dog={dogList.find(dog => dog.id === litter.bitch_id)} />
                </Grid>
              </Grid>
            </Grid>}
          {litters.length > 0
            && <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'space-evenly', py: 2 }} component={Paper}>
              <Grid xs={12}>
                <Typography variant="h4" sx={{ textAlign: "center", py: 2 }} component={Paper}>{(dogDetails.sex === 1 && "Sired") || (dogDetails.sex === 2 && "Damed")} Litters</Typography>
              </Grid>
              {litters.map((litter, index) => {
                return litter.id !== 1 &&
                  <Grid key={index} xs={12} sm={5} sx={{ textAlign: 'center', p: 1, my: 2 }} component={Paper}>
                    <Typography variant="h5" sx={{ py: 2, my: 1 }} component={Paper}>
                      {litter.lname}
                    </Typography>
                    <Box>
                      <Box component='img' src={litter.main_image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                    </Box>
                  </Grid>;

              })}
            </Grid>}
          {gallery.length > 0
            && <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'space-evenly', py: 2 }} component={Paper}>
              <Grid xs={12}>
                <Typography variant="h6" sx={{ textAlign: "center", py: 2 }} component={Paper}>Dog's Gallery</Typography>
              </Grid>
              {console.log(gallery)}
              {gallery.map((image, index) => {
                return (
                  <Grid xs={12} sm={4} key={index} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', overflow: 'hidden', p: 1, m: 2 }}>
                    <Box component='img' src={image} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                  </Grid>
                );
              })}
            </Grid>}
          {/* {images.length > 1
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
              </Grid>} */}
        </Grid>
      </Box>
    </>
  );
};

export default DogDetails;