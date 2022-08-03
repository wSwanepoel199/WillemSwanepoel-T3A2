import { Box, Paper, Grid, Typography, FormControl, Container, Button, TextField, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useGlobalState } from "../utils";

const LitterApplication = () => {

  // Criteria form must account for
  // >but questions i always ask,      
  // do they have children, ( ages )   if young,    
  //  other pets,   dogs  ( breeds)  are they desexed,  
  //  yard, ?  
  //  where do you plan to have puppy sleeping,     
  //  anything they feel might let me see that they would be a good pick for one of my pups,   I believe in the happiness of the pup first,
  // probably needs their name and contact info too >.>

  const initialformData = {
    fname: "",
    lname: "",
    litter_id: '',
    yardarea: 0,
    yardfenceheight: 0,
  };
  const [formData, setFormData] = useState(initialformData);
  const { store } = useGlobalState();
  const { litterList } = store;

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Litter Application</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="fname" required fullWidth id="fname_id" label="First Name" autoFocus onChange={handleInput} value={formData.fname} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField name="lname" required fullWidth id="lname_id" label="Last Name" autoFocus onChange={handleInput} value={formData.lname} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="litter_select_label">Selected Litter</InputLabel>
              <Select
                name="litter_id"
                id="litter_select_id"
                required
                label="litter_select_label"
                onChange={handleInput}
                value={formData.litter_id}
              >
                {Object.entries(litterList).map(litter => {
                  return (
                    <MenuItem key={litter[0]} value={litter[1].id}>{litter[1].lname}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="yardarea"
                id="yardarea-id"
                label="Area of Yard"
                onChange={handleInput}
                value={formData.yardarea}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="yardfenceheight"
                id="yeardfenxeheight-id"
                label="Height of Fence"
                onChange={handleInput}
                value={formData.yardfenceheight}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>

            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl fullWidth>

            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" type='submit'>
                Post Litter Application
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LitterApplication;