import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography } from "@mui/material";

const Dog = (props) => {
  const { dog } = props;


  return (
    <>
      <Card
      >
        <CardMedia
          component="img"
          image={dog.main_image}
        />
        <CardContent>
          <Container>
            <Typography variant="h5" component="div" textAlign="center">
              {dog.callname}
            </Typography>
          </Container>
          <Typography varient="p" component="div">
            Full Name: {dog.realname}
          </Typography>
          <Typography>
            Owner: {dog.ownername}
          </Typography>
          <Typography>
            Breeder: {dog.breedername}
          </Typography>
          <Typography>
            Sex: {dog.sex === 1 ?
              "Male"
              :
              "Female"}
          </Typography>
          <Link to={`/dogs/chosen/${dog.id}`}>
            <Button variant="outlined">View Dog</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default Dog;