import { Box, Button, Collapse, Fade, Paper, TableCell, TableRow, Typography } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import LitterApplicationDetails from "../LitterApplicationDetails/LitterApplicationDetails";
import { getLitterApp } from "../../../services/litterServices";
import { useParams } from "react-router";
import { useGlobalState } from "../../../utils/stateContext";
import { CustomTable } from "../../../utils/componentIndex";

const LitterApplicationManage = () => {
  const params = useParams();
  const { store, dispatch } = useGlobalState();
  const { litterList, userList } = store;

  const [openApp, setOpenApp] = useState(false);
  const [appClosed, setAppClosed] = useState(true);
  const [applicationDetails, setApplicationDetais] = useState([]);
  const [availablePups, setAvailablePups] = useState([]);

  useEffect(() => {
    getLitterApp(params.id)
      .then(litterApp => {
        console.log(litterApp);
        if (litterApp.status === 200) {
          const { data } = litterApp;
          const filledLitterApp = {
            ...data.litterApplication,
            litter: litterList.find(litter => litter.id === data.litterApplication.litter_id),
            user: userList.find(user => user.id === data.litterApplication.user_id)
          };
          setApplicationDetais(filledLitterApp);
          setAvailablePups(data.availablePuppies);
        }
      })
      .catch(e => console.log(e));
  }, []);

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

  return (
    <>
      <Box component={Paper} sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}>
        {console.log(applicationDetails)}
        {console.log(availablePups)}
        <Typography variant="h4" textAlign="center" sx={{ pb: 2 }}>Edit/Manage Litter Application</Typography>
        <Button onClick={() => handleLitterAppOpen(1, appClosed)}>Reveal Application {openApp ? <KeyboardArrowDown /> : <KeyboardArrowLeft />}</Button>
        <Box component={Paper} sx={{ py: 4, my: 2 }}>
          <Collapse
            in={!openApp}
            onExiting={() => handleLitterAppOpen(2)}
            mountOnEnter
            unmountOnExit
          >
            <Typography variant="h5" textAlign="center">Litter Application for {applicationDetails.litter && applicationDetails.litter.lname}</Typography>
          </Collapse>
          <Collapse
            in={!appClosed}
            onExiting={() => handleLitterAppOpen(2, openApp)}
            mountOnEnter
            unmountOnExit>
            <LitterApplicationDetails />
          </Collapse>
        </Box>
        <Box>
          <CustomTable
            head={
              <>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Call Name
                </TableCell>
                <TableCell>
                  Sex
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
              </>
            }
            body={
              <>
                {availablePups.length > 0 && availablePups.map((pup, index) => {

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {pup.realname}
                      </TableCell>
                      <TableCell>
                        {pup.callname}
                      </TableCell>
                      <TableCell>
                        {pup.sex === 2 ?
                          "Female"
                          :
                          "Male"}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }}>
                        {pup.description}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            }
          />
        </Box>
        <Box sx={{}}>
          <Button variant="outlined">Test</Button>
          <Button variant="outlined">Test</Button>
          <Button variant="outlined">Test</Button>
        </Box>
      </Box>
    </>
  );
};

export default LitterApplicationManage;