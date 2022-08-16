import { Box, Paper, Typography, Container, TableRow, TableCell, Button, TablePagination, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react";
import { useGlobalState, Dog, CustomTable } from "../../../utils/componentIndex";
import { Link } from "react-router-dom";

const DogsManage = () => {
  const { store } = useGlobalState();
  const { dogList, userList } = store;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
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

  const createSortHandler = (property) => (e) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dogList.length) : 0;

  const headCells = [
    {
      id: 'realname',
      numeric: false,
      disablePadding: true,
      label: "Dog's Name"
    },
    {
      id: 'callname',
      numeric: false,
      disablePadding: true,
      label: "Call Name"
    },
    {
      id: 'ownername',
      numeric: false,
      disablePadding: true,
      label: 'Owner'
    },
    {
      id: 'breedername',
      numeric: false,
      disablePadding: true,
      label: 'Breeder'
    },
    {
      id: 'dob',
      numeric: false,
      disablePadding: true,
      label: 'Date of Birth'
    },
    {
      id: 'retired',
      numeric: false,
      disablePadding: true,
      label: 'Retired Status'
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
                <TableCell />
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
                    colSpan={7}
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
          <Container sx={{ display: "flex", alignContent: "flex-start", p: 2 }}>
            <Link to="/dogs/create">
              <Button variant="contained">
                New Dog
              </Button>
            </Link>
          </Container>
        </Container>
      </Paper>
    </>
  );
};

export default DogsManage;