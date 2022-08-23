import { Table, TableBody, TableRow, TableCell, IconButton, Typography, Collapse, Box, Button, Container } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { patchLitterApp } from "../../../services/litterServices";
import { updateItemInArray } from "../../../utils/helpers/findOriginal";
import { useGlobalState } from "../../../utils/stateContext";
import LitterApplicationDetails from "../LitterApplicationDetails/LitterApplicationDetails";

// TODO
// Add detailed View for each application
// impliment edit functionality as to assing puppies to an application and control priority of said application, either by editing value in edit, or consider drag and drop functionality

const LitterApplication = (props) => {
  const { app, user, litter } = props;
  const { store, dispatch } = useGlobalState();
  const { applicationForms, loggedInUser } = store;
  const navigate = useNavigate();
  const location = useLocation();

  const initialAppLitter = {
    id: 1,
    lname: ''
  };

  const [open, setOpen] = useState(false);
  const [appLitter, setAppLitter] = useState(initialAppLitter);

  useEffect(() => {
    if (litter) {
      setAppLitter(litter);
    }
  }, [litter]);

  const fulFillState = (state) => {
    switch (state) {
      case 1: {
        return "Approved";
      }
      case 2: {
        return "Rejected";
      }
      case 3: {
        return "Completed";
      }
      default: {
        return "Unprocessed";
      }
    }
  };

  const handleAcceptOrReject = (state, action) => {
    if (action !== "assign") {
      patchLitterApp(app.id, { ...app, fulfillstate: state, litter_id: 1 })
        .then(app => {
          console.log(app);
          if (app.status === 200) {
            dispatch({
              type: 'updateLitterApplications',
              data: updateItemInArray(app.data, applicationForms)
            });
            setOpen(!open);
            navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "success", title: `${app.status} Success`, body: `Application ${app.data.id} has been ${action}` } });
          }
        })
        .catch(e => {
          console.log(e);
          navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: `${e.response.status} ${e.response.data.success}`, body: `${e.response.data.message}; ${e.response.statusTxt}` } });
        });
    } else if (state === 1 && props.handleOpenDialog) {
      const { handleOpenDialog, openDialog } = props;
      handleOpenDialog(!openDialog);
      dispatch({
        type: 'setUpdatingApp',
        data: app
      });
      setOpen(!open);
    }
  };

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        <TableCell align="center" padding="none">
          <Typography>{app.id}</Typography>
        </TableCell>
        <TableCell align="center" padding="none">
          <Typography>{user && user.username}</Typography>
        </TableCell>
        <TableCell align="center" padding="none">
          <Typography>{app.yardarea} m²</Typography>
        </TableCell>
        <TableCell align="center" padding="none">
          <Typography>{app.yardfenceheight} m</Typography>
        </TableCell>
        <TableCell align="center" padding="none">
          <Typography>{app.priority}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            {fulFillState(app.fulfillstate)}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ display: 'flex' }}>
                    <TableCell align="left" size="small" >
                      <Link to={`./${app.id}`}>
                        <Button variant="contained" color="success">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                    {/* <TableCell align="left" size="small">
                      <Link to={`/litters/${appLitter.id}/applications/${app.id}/manage`}>
                        <Button variant="contained" color="warning">
                          Manage
                        </Button>
                      </Link>
                    </TableCell> */}
                    {loggedInUser.admin
                      && <>
                        {app.fulfillstate !== null ?
                          <>
                            {app.fulfillstate === 2 ? //rejected
                              <TableCell align="left" size="small">
                                <Button variant="contained" color="info" onClick={() => handleAcceptOrReject(1, "aproved")}>
                                  Approve
                                </Button>
                              </TableCell>
                              :
                              app.fulfillstate === 1 ? //approved
                                <>
                                  <TableCell align="left" size="small">
                                    <Button variant="contained" color="info" onClick={() => handleAcceptOrReject(1, "assign")}>
                                      Assign
                                    </Button>
                                  </TableCell>
                                  <TableCell align="left" size="small">
                                    <Button variant="contained" color="error" onClick={() => handleAcceptOrReject(2, "rejected")}>
                                      Reject
                                    </Button>
                                  </TableCell>
                                </>
                                :
                                null
                            }
                          </>
                          : //unprocessed
                          <>
                            <TableCell align="left" size="small">
                              <Button variant="contained" color="info" onClick={() => handleAcceptOrReject(1, "approved")}>
                                Approve
                              </Button>
                            </TableCell>
                            <TableCell align="left" size="small">
                              <Button variant="contained" color="error" onClick={() => handleAcceptOrReject(2, "rejected")}>
                                Reject
                              </Button>
                            </TableCell>
                          </>
                        }
                      </>}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ p: 2 }}>
              <LitterApplicationDetails id={app.id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LitterApplication;