import temp_avatar from '../Shared/Assests/Temp Avatar.jpg';
import { Container, Row, Col, Card } from "react-bootstrap";
import { StyledContainer, StyledImage, StyledCol, StyledCard, StyledCardImage, StyledCardBody } from '../Shared/styles/Home.styled';
import { Typography, } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Row xs={1} md={2}>
        <Col>
          <StyledImage src={temp_avatar} />
        </Col>
        <StyledCol>
          <p>
            According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, “College Hall (is) the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.”
          </p>
        </StyledCol>
      </Row>
      <StyledContainer>
        <Row xs={1} sm={2} lg={4}>
          <Col>
            <StyledCard>
              <StyledCardImage variant="top" src={temp_avatar} />
              <Card.Body>
                <Card.Title>
                  <Typography variant="h6" component="div">
                    h1. Heading
                  </Typography>
                </Card.Title>
                <Typography variant="body2">
                  It wasn't quite yet time to panic. There was still time to salvage the situation. At least that is what she was telling himself. The reality was that it was time to panic and there wasn't time to salvage the situation, but he continued to delude himself into believing there was.
                </Typography>
              </Card.Body>
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <StyledCardImage variant="top" src={temp_avatar} />
              <StyledCardBody >
                <Card.Title>
                  <Typography variant="h6" component="div">
                    h1. Heading
                  </Typography>
                </Card.Title>
                <Typography variant="body2">
                  Eating raw fish didn't sound like a good idea. "It's a delicacy in Japan," didn't seem to make it any more appetizing. Raw fish is raw fish, delicacy or not.
                </Typography>
              </StyledCardBody>
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <StyledCardImage variant="top" src={temp_avatar} />
              <StyledCardBody>
                <Card.Title>
                  <Typography variant="h6" component="div">
                    h1. Heading
                  </Typography>
                </Card.Title>
                <Typography variant="body2">
                  He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? "Not enough," the said under his breath. I need more.
                </Typography>
              </StyledCardBody>
            </StyledCard>
          </Col>
          <Col>
            <StyledCard>
              <StyledCardImage variant="top" src={temp_avatar} />
              <StyledCardBody>
                <Card.Title>
                  <Typography variant="h6" component="div">
                    h1. Heading
                  </Typography>
                </Card.Title>
                <Typography variant="body2">
                  What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.
                </Typography>
              </StyledCardBody>
            </StyledCard>
          </Col>
        </Row>
      </StyledContainer>
    </Container>
  );
};

export default Home;