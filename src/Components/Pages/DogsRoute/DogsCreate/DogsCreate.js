import { FormControl, InputLabel, Container, Paper, Typography, TextField, Select, MenuItem, Button, Box, RadioGroup, FormControlLabel, Radio, FormLabel, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/componentIndex";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { postDog } from "../../../services/dogsServices";


// TO-DO 
// breedername comes from back, don't post breedername or ownername at all
// if litter present prevent dob creation
// tackle add pictures

const DogCreationForm = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList, dogList } = store;
  const navigate = useNavigate();
  const location = useLocation();

  // sets form and heath test initial data
  const initialFormData = {
    callname: "",
    realname: "",
    // retired: false,
    sex: '',
    litter_id: '',
    description: '',

  };
  const initialHealthTestData = {
    pra: '',
    fn: '',
    aon: '',
    ams: '',
    bss: ''
  };
  // sets form initial states
  const [formData, setFormData] = useState(initialFormData);
  const [imageData, setImageData] = useState([]);
  const [healthTestData, setHealthTestData] = useState(initialHealthTestData);
  const [validLitterList, setValidLitterList] = useState([]);

  // on mount finds nomial litters, status of 3, and makes the choosable
  useEffect(() => {
    setValidLitterList(
      litterList.filter(litter => litter.status === 3)
    );
  }, [litterList]);

  // handles form general input
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    if (name === 'sex') {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // handles health test input
  const handleHealthTestInput = (e) => {
    const { name, value } = e.target;

    setHealthTestData({
      ...healthTestData,
      [name]: parseInt(value)
    });
  };

  // handles image uploads
  const handleImageUpload = (e) => {
    const { files } = e.target;
    console.log(files);
    console.log(new Blob([JSON.stringify(files[0])], { type: files[0].type }));
    setImageData({
      main_image: new Blob([JSON.stringify(files[0])], { type: files[0].type })
    });
  };

  // on form submit formats data for backend and makes post request to create dog
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // const postForm = new FormData();
    let postForm = {
      ...formData,
      healthtest: healthTestData
    };
    // postForm.append(
    //   'healthtest', [...healthTestData]
    // );
    Object.entries(formData).forEach((item) => {
      console.log(item);
      if (item[1] === '') {
        return;
      } else {
        // postForm.append(
        //   item[0], item[1]
        // );
        postForm = {
          ...postForm,
          [item[0]]: item[1]
        };
      }
    });
    // Object.entries(healthTestData).forEach((item) => {
    //   console.log(item);
    //   postForm.append(
    //     `healthtest[${item[0]}]`, item[1]
    //   );
    // });
    console.log(postForm);
    postDog(postForm)
      .then(dog => {
        console.log(dog);
        if (dog.status === 201) {
          // on success adds dog to dogList
          dispatch({
            type: 'updateDogList',
            data: [...dogList, dog.data.dog]
          });
          // clears form and health test data
          setFormData(initialFormData);
          setHealthTestData(initialHealthTestData);
          // routes user back to dogs manage and alerts them to successful creation
          navigate('/dogs/manage', { state: { alert: true, location: "/dogs/manage", severity: "success", title: `${dog.status} Success`, body: `${dog.data.dog.callname} Created` } });
        }
      })
      .catch(e => {
        // navigates to current page and alerts user of any errors
        console.log(e.response);
        navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: `${e.response.status} Error`, body: `${e.response.statusText}` } });
      });
  };


  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {console.log(formData)}
      {console.log(validLitterList)}
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid xs={12} sx={{ mb: 3 }}>
            <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>Create New Dog</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField name="realname" required fullWidth id="realname" label="Dog's Real Name" autoFocus onChange={handleInput} value={formData.realname} />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField name="callname" required fullWidth id="callname" label="Dog's Call Name" onChange={handleInput} value={formData.callname} />
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl>
              <FormLabel id="dog-sex-label" >Select Sex</FormLabel>
              <RadioGroup
                row
                name="sex"
                label='Select Sex'
                aria-labelledby="dog-sex-label"
                onChange={handleInput}
                value={formData.sex}
              >
                <FormControlLabel value={1} control={<Radio />} label="Male" />
                <FormControlLabel value={2} control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="owner_label">Select Dog's Owner</InputLabel>
              <Select
                name="owner_id"
                id="owner_id"
                required
                label="Select Dog's Owner"
                onChange={handleInput}
                value={formData.owner_id}
              >
                {userList.map(owner => {
                  return (
                    <MenuItem key={owner.id} value={owner.id}>{owner.username}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="litter_label">Select Dog's Litter</InputLabel>
              <Select
                name="litter"
                id="litter_id"
                label="Select Dog's Litter"
                onChange={handleInput}
                value={formData.litter_id}
              >
                {validLitterList.length > 0 && validLitterList.map((litter, index) => {
                  return (
                    <MenuItem key={index} value={litter.id}>{litter.lname}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <TextField name='description' id="description" label="Enter Dog's Description" multiline minRows={3} fullWidth onChange={handleInput} value={formData.description} />
          </Grid>
          <Grid xs={12}>
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Health Test</Typography>
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField name="pra" id="pra_id" label="PRA" fullWidth onChange={handleHealthTestInput} value={healthTestData.pra} />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField name="fn" id="fn_id" label="FN" fullWidth onChange={handleHealthTestInput} value={healthTestData.fn} />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField name="aon" id="aon_id" label="AON" fullWidth onChange={handleHealthTestInput} value={healthTestData.aon} />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField name="ams" id="ams_id" label="AMS" fullWidth onChange={handleHealthTestInput} value={healthTestData.ams} />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField name="bss" id="bss_id" label="BSS" fullWidth onChange={handleHealthTestInput} value={healthTestData.bss} />
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" component="label">
              Upload Main Image
              <input hidden name="main_image" accept="image/*" type="file" id="image" multiple onChange={handleImageUpload} />
            </Button>
            <Typography sx={{ pl: 1 }}>{formData.main_image && formData.main_image.name}</Typography>
          </Grid>
          <Grid xs={12}>
            <Container>
              <Button variant="contained" type='submit'>
                Create Dog
              </Button>
              <Link to="..">
                <Button variant="text">
                  Return
                </Button>
              </Link>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DogCreationForm;