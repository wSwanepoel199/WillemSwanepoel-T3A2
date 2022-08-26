import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRef, useState } from "react";
import Xarrow from "react-xarrows";


const ViewPedigree = ({ dog, tier }) => {

  const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };
  const boxRef = useRef(null);

  const [level, setLevel] = useState(tier);

  const FamilyElement = (dog, tier) => {
    console.log(dog, tier);
    let level = tier - 1;
    if (level === 0) {
      console.log("no more tier");
      return;
    } else {
      return (
        <>
          <Grid xs={12} container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid xs={6} id={dog.sire.id}>
              {console.log(dog.sire.callname, tier)}
              {dog.sire.callname || dog.sire.realname}
              {dog.sire.realname && FamilyElement(dog.sire, level)}
            </Grid>
            <Grid xs={6} id={dog.bitch.id}>
              {console.log(dog.bitch.callname, tier)}
              {dog.bitch.callname || dog.bitch.realname}
              {dog.bitch.callname && FamilyElement(dog.bitch, level)}
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      <Box sx={{
        width: '100%',
        maxWidth: 'md',
        mr: 'auto',
        ml: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {console.log(dog, level)}
        <Grid container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Grid xs={12} ref={boxRef}>
            {(dog.callname || dog.realname)}
          </Grid>
          {FamilyElement(dog, level)}
        </Grid>
      </Box>
    </>
  );
};

export default ViewPedigree;