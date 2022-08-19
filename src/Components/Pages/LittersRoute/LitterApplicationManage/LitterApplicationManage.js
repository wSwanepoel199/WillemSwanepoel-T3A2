import { Box, Button, Collapse, Fade, Paper, TableCell, TableRow, Typography, TablePagination } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { getLitterApps } from "../../../services/litterServices";
import { useParams } from "react-router";
import { useGlobalState, LitterApplication, CustomTable } from "../../../utils/componentIndex";

const LitterApplicationManage = (props) => {
  const { litterApps } = props;
  const params = useParams();
  const { store, dispatch } = useGlobalState();
  const { litterList, userList, applicationForms } = store;

  const [openApp, setOpenApp] = useState(false);
  const [appClosed, setAppClosed] = useState(true);
  const [applications, setApplications] = useState([]);
  const [availablePups, setAvailablePups] = useState([]);
  const waitlistLitter = litterList.find(litter => litter.id === 1);
  const [waitList, setWaitList] = useState([]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // useEffect(() => {
  //   getLitterApp(params.id)
  //     .then(litterApp => {
  //       console.log(litterApp);
  //       if (litterApp.status === 200) {
  //         const { data } = litterApp;
  //         const filledLitterApp = {
  //           ...data.litterApplication,
  //           litter: litterList.find(litter => litter.id === data.litterApplication.litter_id),
  //           user: userList.find(user => user.id === data.litterApplication.user_id)
  //         };
  //         setApplicationDetais(filledLitterApp);
  //       }
  //     })
  //     .catch(e => console.log(e));
  // }, []);

  useEffect(() => {
    if (litterApps) {
      setApplications(litterApps);
    } else if (applicationForms !== applications) {
      getLitterApps()
        .then(apps => {
          dispatch({
            type: "setApplicationForms",
            data: apps
          });
          setApplications(apps);
        })
        .catch(e => console.log(e));
    }
  }, [litterApps, applicationForms]);

  useEffect(() => {
    if (applications.length > 0 && waitList.length < 1) {
      setWaitList(applications);
    }
  }, [applications]);

  useEffect(() => {
    if (filter !== 'none') {
      setWaitList(applications.filter(form => form.fulfillstate === filter));
    } else {
      setWaitList(applications);
    }
  }, [filter]);

  const handleLitterAppOpen = (stage, alt) => {
    switch (stage) {
      case 1: {
        if (alt) {
          setOpenApp(!openApp); //sets to false triggering face
        } else {
          setAppClosed(!appClosed); //triggered when appClosed is false, sets to true
        }
      }
      case 2: {
        if (alt) {
          setOpenApp(!openApp); // triggers when openApp is false, sets to true
        } else {
          setAppClosed(!appClosed); //triggered when fade completes set to false
        }
      }
    }
  };


  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleFilter = (status) => {
    if (status === filter) {
      setFilter('none');
    } else {
      setFilter(status);
    }
    setPage(0);
  };

  return (
    <>
      <Box component={Paper} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center",
        p: 2
      }}>
        <Typography variant="h4" component="h1">Manage Litters Applications</Typography>
        <Box sx={{
          py: 2
        }}>
          {console.log(litterApps)}
          <Box sx={{ py: 2 }}>
            <Typography>Filter Application Status</Typography>
            <Box>
              <Button onClick={() => handleFilter(null)}>Unprocessed</Button>
              <Button onClick={() => handleFilter(1)}>Approved</Button>
              <Button onClick={() => handleFilter(2)}>Rejected</Button>
            </Box>
          </Box>
          <CustomTable
            head={
              <>
                <TableCell />
                <TableCell align='center'>
                  <Typography>Application Id</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>User</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Yard Area</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Fence Height</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Priority</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>Status</Typography>
                </TableCell>
              </>
            }
            body={
              <>
                {waitList.length > 0 && waitList.sort((a, b) => (a.priority - b.priority || a.orderBy - b.orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((form, index) => {
                    const user = Object.values(userList).find(user => user.id === form.user_id);
                    return (
                      <LitterApplication key={index} id={form.id} app={form} user={user} {...props} />
                    );
                  })}
                {page > 0 && (
                  <TableRow style={{ height: 47 * Math.max(0, (1 + page) * rowsPerPage - waitList.length) }}>
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
                    count={waitList.length}
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
        </Box>
      </Box>
    </>
  );
};

export default LitterApplicationManage;