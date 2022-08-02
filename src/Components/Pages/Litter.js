import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LitterDetails } from '../utils/';

const Litter = (props) => {
  const { litter } = props;

  console.log(litter);

  return (
    <>
      <Container>
        <Grid container>
          <Grid item>
            <Typography>{litter.lname}</Typography>
          </Grid>
          <Grid item>
            <LitterDetails id={litter.id} />
          </Grid>
        </Grid>
      </Container>
    </>
  );

};

export default Litter;