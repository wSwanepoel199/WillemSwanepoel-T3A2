import { Box, Typography, Paper, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../utils/stateContext";
import LitterShowItem from "../LitterShowItem/LitterShowItem";

const ShowCase = () => {
  const { store } = useGlobalState();
  const { litterList } = store;

  const [litter, setLitter] = useState([]);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(Math.ceil(litter.length / 5));

  useEffect(() => {
    if (litter.length === 0) {
      setLitter(litterList.filter(litter => litter.id !== 1 && litter.adate).sort((a, b) => b.adate - a.adate));
    }
  }, [litterList, litter]);

  useEffect(() => {
    setItemsPerPage(5);
    setPageCount(Math.ceil(litter.length / 5));
  }, [litter]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box>
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="h2" >Litters</Typography>
        </Box>
        <Box component={Paper}>
          <Stack
            direction="column"
          // spacing={2}
          // sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
          >
            {litter.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
              .map((litter, index) =>
                <LitterShowItem key={index} litter={litter} />
              )}
          </Stack>
          <Pagination count={pageCount} page={page} onChange={handleChangePage} />
        </Box>
      </Box>
    </>
  );
};

export default ShowCase;