import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography } from "@mui/material";

const DogCard = forwardRef(({ id, ...props }, ref) => {
  // makes dog available from props
  const { dog } = props;

  return (
    <Card
      ref={ref}
      {...props}
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
          Sex: {dog.sex === 1 ?
            "Male"
            :
            "Female"}
        </Typography>
        {dog.context}
        <Link to={`/dogs/display/${dog.id}`}>
          <Button variant="outlined" >View Dog</Button>
        </Link>
      </CardContent>
    </Card>
  );
});

export default DogCard;