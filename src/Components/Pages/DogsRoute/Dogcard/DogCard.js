import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";

const DogCard = forwardRef(({ id, ...props }, ref) => {
  // makes dog available from props
  const { dog } = props;

  return (
    <Card
      ref={ref}
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        height: '100%'
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box>
          <CardMedia
            component="img"
            image={dog.main_image}
          />
        </Box>
      </Box>
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