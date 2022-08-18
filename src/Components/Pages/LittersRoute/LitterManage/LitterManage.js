import { Box, Grid, Paper, Typography, Container, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Button, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalState, Litter, CustomTable } from "../../../utils/componentIndex";
import { getLitterApps } from "../../../services/litterServices";
import { Link } from "react-router-dom";

// seperate 'waitlist'

const LitterManage = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList, applicationForms, userList, dogList } = store;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getLitterApps()
      .then(apps => {
        dispatch({
          type: 'setApplicationForms',
          data: apps
        });
      })
      .catch((e) => console.log(e));
  }, []);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - litterList.length) : 0;

  return (
    <>
      <Paper sx={{ display: 'flex' }}>
        {console.log(litterList)}
        {console.log(applicationForms)}
        <Container sx={{ justifyContent: 'center', textAlign: "center", mt: 4 }}>
          <Typography variant="h5" component="h1">Manage Litters</Typography>
          <CustomTable
            head={
              <>
                <TableCell />
                <TableCell align='center'>
                  <Typography>Litter Status</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Litter Name</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Breeder</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Sire</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Bitch</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Expected Date</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Delivered Date</Typography>
                </TableCell>
              </>
            }
            body={
              <>
                {stableSort(litterList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((litter, index) => {
                    const breeder = Object.values(userList).find(breeder => breeder.id === litter.breeder_id);
                    const sire = Object.values(dogList).find(sire => sire.id === litter.sire_id);
                    const bitch = Object.values(dogList).find(bitch => bitch.id === litter.bitch_id);
                    return (
                      <Litter key={index} litter={litter} breeder={breeder} sire={sire} bitch={bitch} />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 47 * emptyRows }}>
                  </TableRow>
                )}
              </>
            }
            footer={
              <>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={8}
                    count={litterList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { m: 0 } }}
                  />
                </TableRow>
              </>
            }
          />
          <Container sx={{ display: "flex", alignContent: "flex-start", p: 2 }}>
            <Link to="/litters/create">
              <Button variant="contained">
                New Litter
              </Button>
            </Link>
          </Container>
        </Container>
      </Paper>
    </>
  );
};

export default LitterManage;