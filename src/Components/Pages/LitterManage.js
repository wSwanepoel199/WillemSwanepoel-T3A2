import { Box, Grid, Paper, Typography } from "@mui/material";
import { useGlobalState } from "../utils";
import { Litter } from "../utils";

const LitterManage = () => {
  const { store } = useGlobalState();
  const { litterList } = store;

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Paper sx={{ padding: 4 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>Manage Litters</Typography>
            </Grid>
            {Object.entries(litterList).map((litter, id) =>
              <Grid item xs={12} key={id}>
                <Litter litter={litter[1]} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default LitterManage;