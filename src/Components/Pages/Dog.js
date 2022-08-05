import React, { forwardRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";

const Dog = forwardRef(({ id, ...props }, ref) => {
  const { dog } = props;
  let navigate = useNavigate;

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
          <Button variant="outlined" >View Dog</Button>
        </Link>
      </CardContent>
    </Card>
  );
});

export default Dog;