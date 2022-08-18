import { Table, TableBody, TableRow, TableCell, IconButton, Typography, Collapse, Box, Button, Container } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { patchLitterApp } from "../../../services/litterServices";
import { updateItemInArray } from "../../../utils/helpers/findOriginal";
import { useGlobalState } from "../../../utils/stateContext";
import LitterApplicationDetails from "../LitterApplicationDetails/LitterApplicationDetails";

// TODO
// Add detailed View for each application
// impliment edit functionality as to assing puppies to an application and control priority of said application, either by editing value in edit, or consider drag and drop functionality

const LitterApplication = (props) => {
  const { app, user, litter, handleOpenDialog, openDialog } = props;
  const { store, dispatch } = useGlobalState();
  const { applicationForms } = store;

  const initialAppLitter = {
    id: 1,
    lname: ''
  };
  const [open, setOpen] = useState(false);
  const [appLitter, setAppLitter] = useState([initialAppLitter]);

  useEffect(() => {
    if (litter) {
      setAppLitter(litter);
    }
  }, []);

  const fulFillState = (state) => {
    switch (state) {
      case 1: {
        return "Approved";
      }
      case 2: {
        return "Rejected";
      }
      default: {
        return "Unprocessed";
      }
    }
  };

  const handleAcceptOrReject = (state) => {
    if (state === 1) {
      handleOpenDialog(!openDialog, app);
      dispatch({
        type: 'setUpdatingApp',
        data: app
      });
      setOpen(!open);
    } else if (state === 2) {
      patchLitterApp(app.id, { ...app, fulfillstate: state })
        .then(app => {
          console.log(app);
          if (app.status === 200) {
            dispatch({
              type: 'updateLitterApplications',
              data: updateItemInArray(app.data, applicationForms)
            });
            setOpen(!open);
          }
        })
        .catch(e => console.log(e));
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
                    <TableCell align="left" size="small">
                      <Link to={`/litters/${appLitter.id}/applications/${app.id}/manage`}>
                        <Button variant="contained" color="warning">
                          Manage
                        </Button>
                      </Link>
                    </TableCell>
                    {app.fulfillstate !== null ?
                      <>
                        <TableCell align="left" size="small">
                          {app.fulfillstate === 2 ?
                            <Button variant="contained" color="info" onClick={() => handleAcceptOrReject(1)}>
                              Approve
                            </Button>
                            :
                            <Button variant="contained" color="error" onClick={() => handleAcceptOrReject(2)}>
                              Reject
                            </Button>
                          }
                        </TableCell>
                      </>
                      :
                      <>
                        <TableCell align="left" size="small">
                          <Button variant="contained" color="info" onClick={() => handleAcceptOrReject(1)}>
                            Approve
                          </Button>
                        </TableCell>
                        <TableCell align="left" size="small">
                          <Button variant="contained" color="error" onClick={() => handleAcceptOrReject(2)}>
                            Reject
                          </Button>
                        </TableCell>
                      </>
                    }
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ p: 2 }}>
              <LitterApplicationDetails id={props.id} />
            </Box>
            <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Button>Test</Button>
              </Box>
              <Box>
                <Button>Test</Button>
              </Box>
              <Box>
                <Button>Test</Button>
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LitterApplication;