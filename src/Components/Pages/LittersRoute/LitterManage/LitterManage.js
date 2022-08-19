import { Box, Paper, Typography, Container, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Button, TablePagination, Dialog, useMediaQuery, useTheme, DialogTitle, DialogContent, DialogContentText, DialogActions, TableSortLabel, InputBase, Select, MenuItem, OutlinedInput, FormControl, InputLabel } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useRef, useState } from "react";
import { useGlobalState, Litter, CustomTable, LitterApplication, LitterApplicationManage } from "../../../utils/componentIndex";
import { getLitterApps, patchLitterApp } from "../../../services/litterServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateItemInArray } from "../../../utils/helpers/findOriginal";

// impliment application filtering out from waitlist to open litters
// impliment ability to reject litters in waitlist

const LitterManage = () => {
  const { store, dispatch } = useGlobalState();
  const { litterList, applicationForms, userList, dogList, updatingApp } = store;
  const mounted = useRef();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [litters, setLitters] = useState([]);
  const waitlistLitter = litterList.find(litter => litter.id === 1);
  const [waitList, setWaitList] = useState([]);
  const [selectedLitter, setSelectedLitter] = useState({ select_litter: '' });

  // applicationForms.filter(form => form.litter_id !== 1)

  const [openApp, setOpenApp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!mounted.current) {
      if (!sessionStorage.getItem('litterAppForms')) {
        getLitterApps()
          .then(apps => {
            dispatch({
              type: "setApplicationForms",
              data: apps
            });
          })
          .catch(e => console.log(e));
      }
      mounted.current = true;
    }
  }, [mounted]);

  useEffect(() => {
    setLitters(litterList.filter(litter => litter.id !== 1));
  }, [litterList]);

  useEffect(() => {
    if (applicationForms.length > 0) {
      setWaitList(applicationForms.filter(form => form.litter_id === 1));
    }
  }, [applicationForms]);

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

  const handleSelect = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setSelectedLitter({
      [name]: parseInt(value)
    });
  };

  const handleOpenDialog = (open) => {
    setOpenDialog(open);
    const chosenLitter = litters.find(litter => litter.id === selectedLitter.select_litter);
    if (updatingApp && selectedLitter.select_litter) {
      patchLitterApp(updatingApp.id, { ...updatingApp, litter_id: selectedLitter.select_litter, fulfillstate: 1 })
        .then(app => {
          console.log(app);
          if (app.status === 200) {
            dispatch({
              type: 'updateLitterApplications',
              data: updateItemInArray(app.data, applicationForms)
            });
            navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "success", title: `${app.status} Success`, body: `Application ${app.data.id} assigned to ${chosenLitter.lname}` } });
            setSelectedLitter({ select_litter: '' });
          }
        })
        .catch(e => console.log(e));
    }
  };
  const handleCancel = () => {
    setOpenDialog(!openDialog);
  };

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  return (
    <>
      <Box component={Paper} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center",
        p: 2
      }}>
        {/* {console.log(litterList)}
        {console.log(litters)}
        {console.log(applicationForms)} */}
        {console.log(waitList)}
        {/* {console.log(selectedLitter)} */}
        <Typography variant="h4" component="h1">Manage Litters</Typography>
        {waitList.length > 0
          && <>
            <Box component={Paper} sx={{
              m: 2,
              p: 2
            }}>

              <Typography variant="h6" component="span" onClick={() => setOpenApp(!openApp)}>{openApp ? <KeyboardArrowDown /> : <KeyboardArrowRight />} Application Wait List</Typography>
              <Collapse
                in={openApp}
                unmountOnExit>
                <LitterApplicationManage handleOpenDialog={handleOpenDialog} openDialog={openDialog} litterApps={waitList} />
              </Collapse>

            </Box>
          </>}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(!openDialog)}
          fullScreen={fullscreen}
        >
          <DialogTitle>Assign Application</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <DialogContentText>
                  Assign application {updatingApp && updatingApp.id} to an open litters
                </DialogContentText>
              </Grid>
              <Grid xs={12}>
                {/* displays puppies an a table list */}
                <FormControl fullWidth>
                  <InputLabel id="select_litter_label">Select Litter</InputLabel>
                  <Select
                    name="select_litter"
                    id="select_litter"
                    label="SelectLitter"
                    aria-labelledby="select_litter_label"
                    onChange={handleSelect}
                    value={selectedLitter.select_litter}
                  >
                    {litters.filter(litter => litter.status === 1).map((litter, index) => {

                      return (
                        <MenuItem key={index} value={litter.id}>{litter.lname}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleOpenDialog(!openDialog)}>Approve Application</Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h6" component="span" sx={{ py: 2 }}>Litters</Typography>
        <Box sx={{

        }}>
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
                  <Typography>Litter Breeder</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Litter Sire</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Litter Dam</Typography>
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
                {litters.length > 0 && litters.sort((a, b) => {
                  return order === 'asc'
                    ? a.orderBy - b.orderBy
                    : b.orderBy - a.orderBy;
                })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((litter, index) => {
                    const breeder = Object.values(userList).find(breeder => breeder.id === litter.breeder_id);
                    const sire = Object.values(dogList).find(sire => sire.id === litter.sire_id);
                    const bitch = Object.values(dogList).find(bitch => bitch.id === litter.bitch_id);
                    return (
                      <Litter key={index} litter={litter} breeder={breeder} sire={sire} bitch={bitch} />
                    );
                  })}
                {page > 0 && (
                  <TableRow style={{ height: 47 * Math.max(0, (1 + page) * rowsPerPage - litters.length) }}>
                  </TableRow>
                )}
              </>
            }
            footer={
              <>
                {litters.length > rowsPerPage
                  && <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={8}
                      count={litters.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{ '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { m: 0 } }}
                    />
                  </TableRow>
                }
              </>
            }
          />
        </Box>
        <Container sx={{ display: "flex", alignContent: "flex-start", pt: 2 }}>
          <Link to="/litters/create">
            <Button variant="contained">
              New Litter
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
};

export default LitterManage;