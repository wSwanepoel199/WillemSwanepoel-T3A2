import { Box, Typography, Stack, Paper, Collapse, Button } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { getShowCase } from "../../../services/litterServices";
import { Link } from "react-router-dom";


const LitterShowItem = ({ litter }) => {

  const [showItem, setShowItem] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [showSire, setShowSire] = useState([]);
  const [showBitch, setShowBitch] = useState([]);
  const [showPuppies, setShowPuppies] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (litter) {
      getShowCase(litter.id)
        .then(reply => {
          console.log(reply);
          if (reply.status === 200) {
            setShowItem(reply.data.litter);
            setShowImages(reply.data.images);
            setShowSire(reply.data.sire);
            setShowBitch(reply.data.bitch);
            setShowPuppies(reply.data.puppies);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [litter]);

  return (
    <Box
      component={Paper}
      sx={{
        mt: 2,
        ml: 'auto',
        mr: 'auto',
        maxWidth: "md",
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box>
        <Grid container spacing={2} sx={{
          overflow: 'hidden',
          px: 2,
          pt: 2
        }}>
          <Grid xs={12} sm>
            {showImages.length > 0
              && <Box component='img' src={showImages[0]} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />}
          </Grid>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', pb: 2 }}>
            <Grid sx={{ py: 2, textAlign: 'center' }}>
              <Typography variant="h4">{showItem.lname}</Typography>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={12} sm>
                <Typography variant="h6">Sire:</Typography>
                <Typography>{showSire.realname}</Typography>
              </Grid>
              <Grid xs={12} sm>
                <Typography variant="h6">Dam:</Typography>
                <Typography>{showBitch.realname}</Typography>
              </Grid>
            </Grid>
            <Grid xs={12} sm>
              <Typography variant="h6">Puppies</Typography>
              <Stack sx={{ textAlign: 'center' }}>
                {showPuppies.map((puppy, index) => {
                  return (
                    <Typography key={index}>{puppy.realname}</Typography>
                  );
                })}
              </Stack>
            </Grid>
            <Grid>
              <Link to={`/litters/${showItem.id}`}>
                <Button variant="outlined">View</Button>
              </Link>
            </Grid>
          </Grid>

          {showImages.length > 1 &&
            <Grid sx={12} sm={12}>
              <Button onClick={() => setOpen(!open)} fullWidth>{open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</Button>
              <Collapse
                in={open}
                sx={{
                  overflow: 'scroll',
                  display: 'flex',
                }}
              >
                <Stack
                  direction='row'
                  spacing={2}
                  sx={{
                    height: 200,
                    width: '100%',
                  }}
                >
                  {showImages.map((image, index) => {
                    return index !== 0 &&
                      <Box component="img" src={image} key={index} sx={{ height: '100%', width: '100%', objectFit: 'contain' }} />;
                  })}
                </Stack>
              </Collapse>
            </Grid>}
        </Grid>
      </Box>
    </Box>
  );
};

export default LitterShowItem;