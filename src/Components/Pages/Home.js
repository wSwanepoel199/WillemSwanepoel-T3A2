import temp_avatar from '../Shared/Assests/Temp Avatar.jpg';
import { StyledContainer, StyledImage } from '../Shared/styles/Home.styled';
import { Container, Typography, Grid, Card as MuiCard, CardContent, CardMedia } from '@mui/material';

const Home = () => {
  return (
    <>
      <Container>
        {/* Main Body Introduction */}
        <Grid container spacing={3} alignItems="center">
          <Grid item sm={6}>
            <StyledImage src={temp_avatar} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="p" component="div">
              According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, “College Hall (is) the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.”
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <StyledContainer>
        {/* Cards for display items */}
        <Grid container spacing={3} columns={{ xs: 5, sm: 10, md: 12 }} justifyContent="center" >
          <Grid item xs={3} sm={4} md={3}>
            <MuiCard>
              <CardMedia
                component="img"
                image={temp_avatar}
                alt="Some Person"
                width="100%"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  h1. Heading
                </Typography>
                <Typography variant="body2">
                  It wasn't quite yet time to panic. There was still time to salvage the situation. At least that is what she was telling himself. The reality was that it was time to panic and there wasn't time to salvage the situation, but he continued to delude himself into believing there was.
                </Typography>
              </CardContent>
            </MuiCard>
          </Grid>
          <Grid item xs={3} sm={4} md={3}>
            <MuiCard>
              <CardMedia
                component="img"
                image={temp_avatar}
                alt="Some Person"
                width="100%"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  h1. Heading
                </Typography>
                <Typography variant="body2">
                  Eating raw fish didn't sound like a good idea. "It's a delicacy in Japan," didn't seem to make it any more appetizing. Raw fish is raw fish, delicacy or not.
                </Typography>
              </CardContent>
            </MuiCard>
          </Grid>
          <Grid item xs={3} sm={4} md={3}>
            <MuiCard>
              <CardMedia
                component="img"
                image={temp_avatar}
                alt="Some Person"
                width="100%"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  h1. Heading
                </Typography>
                <Typography variant="body2">
                  He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? "Not enough," the said under his breath. I need more.
                </Typography>
              </CardContent>
            </MuiCard>
          </Grid>
          <Grid item xs={3} sm={4} md={3}>
            <MuiCard>
              <CardMedia
                component="img"
                image={temp_avatar}
                alt="Some Person"
                width="100%"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  h1. Heading
                </Typography>
                <Typography variant="body2">
                  What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.
                </Typography>
              </CardContent>
            </MuiCard>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default Home;