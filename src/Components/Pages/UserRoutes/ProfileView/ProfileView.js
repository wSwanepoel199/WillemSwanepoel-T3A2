import { Box, Paper, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getUser } from "../../../services/authServices";

const Profile = () => {
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    getUser(id)
      .then(reply => {
        console.log(reply);
      })
      .catch(e => console.log(e));
  }, [id]);

  return (
    <>
      <Box component={Paper}>
        <Grid container>
          <Grid xs={3}>
            <Stack>
              <Button>Profile</Button>
              <Button>View Applications</Button>
              <Button>View Dogs</Button>
              <Button>Edit Details</Button>
            </Stack>
          </Grid>
          <Grid container xs={9}>
            <Grid xs={12}>
              <Box component={Paper}>
                Test2
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box component={Paper}>
                Test2
              </Box>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Profile;