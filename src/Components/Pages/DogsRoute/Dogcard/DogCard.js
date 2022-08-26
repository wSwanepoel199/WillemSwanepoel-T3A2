import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import moment from "moment";

const DogCard = forwardRef(({ id, ...props }, ref) => {
  // makes dog available from props
  const { dog } = props;

  return (
    <Card
      ref={ref}
      {...props}
      sx={{
        maxHeight: 510, display: 'flex', flexDirection: 'column'
      }}
    >
      {dog
        && <>
          {dog.main_image
            && <Box sx={{ height: 311, overflow: 'hidden', display: 'flex' }}>
              <CardMedia
                component="img"
                image={dog.main_image}
                sx={{ maxHeight: 'auto', maxWidth: 'auto', objectFit: 'contain' }}
              />
            </Box>}
          <CardContent sx={{ height: 207, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Container>
              <Typography variant="h5" component="div" textAlign="center">
                {dog.callname}
              </Typography>
            </Container>
            <Typography varient="p" component="div">
              Name: {dog.realname}
            </Typography>
            <Typography>
              Date of birth: {moment(dog.dob).format('MMMM Do YYYY')}
            </Typography>
            {dog.context}
            <Link to={`/dogs/display/${dog.id}`}>
              <Button variant="outlined" >View Dog</Button>
            </Link>
          </CardContent>
        </>}
    </Card>
  );
});

export default DogCard;