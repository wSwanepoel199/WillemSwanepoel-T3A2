import { Link } from "react-router-dom";
import { StyledCard, StyledCardTitle, StyledCardBody } from '../Shared/styles/Dog.styled';
import { Button, Card } from "react-bootstrap";
import { Grid } from "@mui/material";

const Dog = (props) => {
  const { dog } = props;

  return (
    <>
      {console.log(dog)}
      <Grid item md={3}>
        <StyledCard>
          <Card.Img variant="top" src={dog.main_image} />
          <StyledCardBody>
            <StyledCardTitle>{dog.callname}</StyledCardTitle>
            <Card.Text>
              Full Name: {dog.realname}
            </Card.Text>
            <Card.Text>
              Owner: {dog.ownername}
            </Card.Text>
            <Card.Text>
              Breeder: {dog.breedername}
            </Card.Text>
            <Card.Text>
              Sex: {dog.sex === 1 ?
                "Male"
                :
                "Female"}
            </Card.Text>
            <Link to={`/dogs/chosen/${dog.id}`}>
              <Button variant="primary">View Dog</Button>
            </Link>
          </StyledCardBody>
        </StyledCard>
      </Grid>
    </>
  );
};

export default Dog;