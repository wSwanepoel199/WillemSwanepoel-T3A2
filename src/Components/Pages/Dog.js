import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

const Dog = (props) => {
  const { dog } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      item
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      xs={12} sm={6} md={4} lg={3}
    >
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
          {dog.context}
          <Link to={`/dogs/chosen/${dog.id}`}>
            <Button variant="outlined">View Dog</Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Dog;