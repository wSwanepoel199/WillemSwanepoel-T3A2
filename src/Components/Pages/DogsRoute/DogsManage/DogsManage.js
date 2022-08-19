import { Box, Paper, Typography, Container, TableRow, TableCell, Button, TablePagination, TableSortLabel, IconButton } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from "react";
import { useGlobalState, Dog, CustomTable } from "../../../utils/componentIndex";
import { Link } from "react-router-dom";

const DogsManage = () => {
  const { store } = useGlobalState();
  const { dogList, userList } = store;

  // sets page initial state
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // order values based on provided id
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // inverts return if order of return is 'asc'
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // main sort function coded coded to suppoty IE11
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

  // sets page value for pagination
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  // controls the number of rows that appear per page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // calculates if isAsc is true to control if setOrder is asc or desc then sets new order id
  const createSortHandler = (property) => (e) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterReset = () => {
    setOrderBy("id");
    setOrder('asc');
  };

  // calculates missing entries to keep table the same size
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dogList.length) : 0;

  // array of values to become header to redice repeated code
  const headCells = [
    {
      id: 'realname',
      numeric: false,
      disablePadding: false,
      label: "Dog's Name"
    },
    {
      id: 'callname',
      numeric: false,
      disablePadding: false,
      label: "Call Name"
    },
    {
      id: 'ownername',
      numeric: false,
      disablePadding: false,
      label: 'Owner'
    },
    {
      id: 'breedername',
      numeric: false,
      disablePadding: false,
      label: 'Breeder'
    },
    {
      id: 'dob',
      numeric: false,
      disablePadding: false,
      label: 'Date of Birth'
    },
    {
      id: 'retired',
      numeric: false,
      disablePadding: false,
      label: 'Retired Status'
    },
    {
      id: 'position',
      numeric: false,
      disablePadding: false,
      label: 'Display Order'
    }
  ];

  return (
    <>
      <Paper sx={{ display: 'flex' }}>
        <Container sx={{ justifyContent: 'center', textAlign: "center", mt: 4 }}>
          <Typography variant="h5" component="h1">Manage Dogs</Typography>
          <CustomTable
            head={
              <>
                <TableCell
                  align="center"
                >
                  <IconButton
                    onClick={handleFilterReset}
                  >
                    <FilterAltOffIcon />
                  </IconButton>
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'center'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </>
            }
            body={
              <>
                {stableSort(dogList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dog, index) => {
                    const owner = userList.find(user => user.id === dog.owner_id);
                    return (
                      <Dog key={index} dog={dog} owner={owner} />
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
                    count={dogList.length}
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
          <Box sx={{ display: "flex", alignContent: "flex-start" }}>
            <Link to="/dogs/create">
              <Button variant="contained" sx={{ m: 1 }}>
                New Dog
              </Button>
            </Link>
            <Link to="/dogs/re_order">
              <Button variant="contained" sx={{ m: 1 }}>
                Manage Dogs Positions
              </Button>
            </Link>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default DogsManage;