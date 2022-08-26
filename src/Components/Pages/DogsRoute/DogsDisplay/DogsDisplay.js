import { useGlobalState, DogCard } from "../../../utils/componentIndex";
import { Box, Typography, Paper, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useRef, useState } from "react";

// known issues; patching to often, patching with to much data(not sure if avoidable)
// honestly whole page needs rework
// https://overreacted.io/how-are-function-components-different-from-classes/ worth using either class or implimented another use of useRef for dogs


const DisplayDogs = (params) => {
  // initalises store from global state
  const { store } = useGlobalState();
  // makes doglist available
  const { dogList } = store;

  const mounted = useRef();

  // sets initial states of page
  const [dogs, setDogs] = useState([]); // <= stores the dogs that are being displaye
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(Math.ceil(dogs.length / 12));

  // on mount fills dogs state with doglist, and orders them from lowerest value postion to highest
  useEffect(() => {
    setDogs(handleSex(params, dogList.filter(dog => dog.display ? dog.display === true : dog).sort((a, b) => a.position - b.position)));
    setItemsPerPage(12);
  }, [params, dogList]);

  useEffect(() => {
    setPageCount(Math.ceil(dogs.length / 12));
  }, [dogs]);


  // filters dogs based on passed params
  const handleSex = (params, dogs) => {
    switch (params.id) {
      case "male": {
        return dogs.filter((dog) => dog.sex === 1);
      }
      case "female": {
        return dogs.filter((dog) => dog.sex === 2);
      }
      case "retired": {
        return dogs.filter((dog) => dog.retired);
      }
      default: {
        return dogs;
      }
    }
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box>
        {console.log("local state dogs:", dogs)}
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="h2" >{capitalize(params.id)} Dogs</Typography>
        </Box>
        <Box component={Paper} sx={{ px: 2 }}>
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
          >
            {dogs.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
              .map((dog, index) =>
                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                  <DogCard id={dog.id} dog={dog} />
                </Grid>
              )}
          </Grid>
          <Pagination count={pageCount} page={page} onChange={handleChangePage} />
        </Box>
      </Box>
    </>
  );
};

export default DisplayDogs;