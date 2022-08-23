import temp_avatar from '../Shared/Assests/Temp Avatar.jpg';
import { StyledImage } from '../Shared/styles/Home.styled';
import { Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DogCard, useGlobalState } from '../utils/componentIndex';

const Home = () => {
  const { store } = useGlobalState();
  const { dogList } = store;

  return (
    <>
      <Container>
        {/* Main Body Introduction */}
        <Grid container spacing={3} alignItems="center">
          <Grid sm={6}>
            <StyledImage src={temp_avatar} />
          </Grid>
          <Grid sm={6}>
            <Typography variant="p" component="div">
              According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, “College Hall (is) the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.”
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ my: 2 }} component={Paper}>
        <Typography variant="h5" sx={{ textAlign: 'center', py: 2 }}>Top Dogs</Typography>
        {/* Cards for display items */}
        <Grid container spacing={3} justifyContent="center" >
          {dogList.filter((dog) => dog.position < 5).map((dog, index) =>
            <Grid key={index} xs={10} sm={5} md={5} lg={3}>
              <DogCard dog={dog} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;