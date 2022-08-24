import { FormControl, InputLabel, Container, Paper, Typography, TextField, Select, MenuItem, Button, Box, RadioGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/componentIndex";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getDog, patchDog, getDogs } from "../../../services/dogsServices";
import { colours } from "../../../utils/helpers/findOriginal";

// can't update litter of dog due to to lack of support from back

const DogUpdateForm = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList } = store;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const fd = require('form-data-extended');

  // sets the initial data of the component
  const initialFormData = {
    callname: "",
    realname: "",
    // retired: false,
    sex: '',
    litter_id: '',
    description: '',
    colour: '',
    chipnumber: '',
  };
  const initialHealthTestData = {
    pra: '',
    fn: '',
    aon: '',
    ams: '',
    bss: ''
  };
  const healthTestValues = [
    {
      id: 0,
      status: 'Unknown'
    },
    {
      id: 1,
      status: 'Clear'
    },
    {
      id: 2,
      status: 'Carrier'
    },
    {
      id: 3,
      status: 'Affected'
    },
  ];
  // sets initial state of application
  const [formData, setFormData] = useState(initialFormData);
  const [dog, setDog] = useState({});
  const [healthTestData, setHealthTestData] = useState(initialHealthTestData);
  const [validLitterList, setValidLitterList] = useState([]);
  const [dogColours, setDogColours] = useState([]);

  // on component mount, makes get request for a dog and assigns specific values to the form state, also saves the whole dog to the dog state
  useEffect(() => {
    getDog(params.id)
      .then(dog => {
        console.log(dog);
        if (dog.status === 200) {
          const { data } = dog;
          setDog(data);
          setFormData({
            ...formData,
            id: data.dog.id,
            realname: data.dog.realname,
            callname: data.dog.callname,
            sex: data.dog.sex,
            description: data.dog.description,
            colour: data.dog.colour,
            chipnumber: data.dog.chipnumber,
          });
          setHealthTestData({
            ...healthTestData,
            pra: data.healthtest.pra,
            fn: data.healthtest.fn,
            aon: data.healthtest.aon,
            ams: data.healthtest.ams,
            bss: data.healthtest.bss,
          });
        }
      })
      .catch(e => console.log(e));
    // finds litters with a status of 3, meaning they are nomial
    setValidLitterList(
      litterList.filter(litter => litter.status === 3)
    );
    setDogColours(colours);
  }, [litterList, params.id]);

  // handlles the forms general input
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    if (name === "esize") {
      let fixedValue = 1;
      if (Boolean(parseInt(e.target.value))) {
        fixedValue = parseInt(e.target.value);
      } else {
        fixedValue = 1;
      }
      console.log(fixedValue);
      if (fixedValue > 24) fixedValue = 24;
      if (fixedValue < 1) fixedValue = 1;

      setFormData({
        ...formData,
        [name]: fixedValue,
      });
    } else if (name === 'sex') {
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

  // handles input for health tests, not yet implimented in edit
  const handleHealthTestInput = (e) => {
    const { name, value } = e.target;

    setHealthTestData({
      ...healthTestData,
      [name]: parseInt(value)
    });
  };

  // handles image uploads
  const handleImageUpload = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    console.log(name, files);
    if (name === 'main_image') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (name === 'gallery_images') {
      setFormData({
        ...formData,
        [name]: [...files]
      });
    }
  };

  // handles the form submit, patching the dog and making a get request to dogs for an uppdated dog list
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let dog;
    Object.entries(formData).forEach((item) => {
      console.log(item);
      if (item[1] === '') {
        return;
      } else {
        dog = {
          ...dog,
          [item[0]]: item[1]
        };
      }
    });
    const postForm = fd({ dog });
    patchDog(params.id, postForm)
      .then(dog => {
        console.log(dog);
        if (dog.status === 200) {
          getDogs()
            .then(dogs => {
              dispatch({
                type: 'updateDogList',
                data: dogs
              });
            })
            .catch(e => console.log(e));
          // resets form values
          setFormData(initialFormData);
          setHealthTestData(initialHealthTestData);
          // navigates back to dogs manage and alerts user of successful creation
          navigate('/dogs/manage', { state: { alert: true, location: "/dogs/manage", severity: "success", title: `${dog.status} Success`, body: `${dog.data.callname} Updated` } });
        }
      })
      .catch(e => {
        console.log(e);
        // navigates to current page and alters user of any errors
        navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: `${e.response.status} Error`, body: `${e.response.statusText}` } });
      });
  };


  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {console.log(dog)}
      {console.log(formData)}
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid xs={12} sx={{ mb: 3 }}>
            <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>{dog.dog && `Updated ${dog.dog.callname}`}</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField name="realname" required fullWidth id="realname" label="Dog's Real Name" autoFocus onChange={handleInput} value={formData.realname} />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField name="callname" required fullWidth id="callname" label="Dog's Call Name" onChange={handleInput} value={formData.callname} />
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="colour_label">Select Colour</InputLabel>
              <Select
                name="colour"
                fullWidth
                id="colour"
                labelId="colour_label"
                label="Select Colour"
                onChange={handleInput}
                value={formData.colour}
              >
                {dogColours.map((colour, index) => {
                  return colour.id !== 0 && <MenuItem key={index} value={colour.id}>{colour.colour}</MenuItem>;
                }
                )}
              </Select>
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
                name="litter_id"
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
          <Grid xs={12} sm={6}>
            <TextField name='chipnumber' id="chipnumber" label="Enter Dog's Microchip Number" fullWidth onChange={handleInput} value={formData.chipnumber} />
          </Grid>
          <Grid xs={12}>
            <TextField name='description' id="description" label="Enter Dog's Description" multiline minRows={3} fullWidth onChange={handleInput} value={formData.description} />
          </Grid>
          <Grid xs={12}>
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Health Test</Typography>
          </Grid>
          {Object.entries(healthTestData).map((healthTest, index) => {
            console.log(healthTest);
            return (
              <Grid key={index} xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={`${healthTest[0]}_id`}>{healthTest[0].toUpperCase()}</InputLabel>
                  <Select
                    name={healthTest[0]}
                    id={`${healthTest[0]}_id`}
                    label={healthTest[0]}
                    onChange={handleHealthTestInput}
                    value={healthTest[1]}
                  >
                    {healthTestValues.map((test, index) => {
                      return (
                        <MenuItem key={index} value={test.id}>{test.status}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            );
          })}
          <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" component="label">
              Upload Main Image
              <input hidden name="main_image" accept="image/*" type="file" id="image" multiple onChange={handleImageUpload} />
            </Button>
          </Grid>
          {formData.main_image &&
            <Grid xs={12}>
              <Typography sx={{ pl: 1, textAlign: 'center' }}> {formData.main_image.name} </Typography>
            </Grid>
          }
          <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" component="label">
              Upload Images for Gallery
              <input hidden name="gallery_images" accept="image/*" type="file" id="image" multiple onChange={handleImageUpload} />
            </Button>
          </Grid>
          {formData.gallery_images &&
            <Grid xs={12}>
              <Typography sx={{ pl: 1, textAlign: 'center' }}> {formData.gallery_images.map(file => {
                return `${file.name}, `;
              })}</Typography>
            </Grid>
          }
          <Grid xs={12}>
            <Container>
              <Button variant="contained" type='submit'>
                Update Dog
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

export default DogUpdateForm;