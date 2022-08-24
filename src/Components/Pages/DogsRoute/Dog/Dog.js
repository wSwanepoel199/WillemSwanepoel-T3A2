import { Button, Table, TableBody, TableCell, TableRow, Collapse, IconButton, Box } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { useGlobalState } from "../../../utils/stateContext";
import { patchDog } from "../../../services/dogsServices";

const Dog = (props) => {
  const { dog } = props;
  const { store, dispatch } = useGlobalState();
  const { dogList, loggedInUser } = store;
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleRetire = () => {
    // new object with updated dog information
    const newDog = {
      ...dog,
      retired: !dog.retired
    };
    const { main_image, ...newestDog } = newDog;
    console.log(newestDog);
    // locates original dog from dogList
    const originalDog = dogList.find(pup => pup.id === dog.id);
    // spreads dogList into new array inorder to mutate values
    let newDogList = [...dogList];
    // splices new dog object into mutable dogList using index of its position found in original dogList
    newDogList.splice(dogList.indexOf(originalDog), 1, newDog);
    // makes patch request to update dog on back end
    patchDog(dog.id, newestDog)
      .then(dog => {
        // on status 200 updates local dogList with newDogList containing changed dog
        if (dog.status === 200) {
          dispatch({
            type: 'updateDogList',
            data: newDogList
          });
        }
      })
      .catch(e => {
        // catches and alerts user of any errors
        console.log(e);
        navigate(location.pathname, { state: { alert: true, location: location.pathname, severity: "error", title: e.response.status, body: `${e.response.statusText} ${e.response.data.message}` } });
      });
  };

  return (
    <>
      <TableRow>
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
          {dog.realname}
        </TableCell>
        <TableCell align="center" padding="none">
          {dog.callname}
        </TableCell>
        <TableCell align="center" padding="none">
          {dog.ownername ? dog.ownername : `Not Provided`}
        </TableCell>
        <TableCell align="center" padding="none">
          {dog.breedername ? dog.breedername : "Not Provided"}
        </TableCell>
        <TableCell align="center">
          {dog.dob ?
            <>{moment(dog.dob).format('DD/MM/YYYY')}</>
            :
            "Not Provided"
          }
        </TableCell>
        <TableCell align="center" padding="none">
          {dog.retired ?
            "Retired"
            :
            "Not Retired"
          }
        </TableCell>
        {loggedInUser.admin
          && <TableCell align="center" padding="none">
            {dog.position}
          </TableCell>}
      </TableRow>
      <TableRow>
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ display: 'flex' }}>
                    <TableCell align="left" size="small" >
                      <Link to={`/dogs/display/${dog.id}`}>
                        <Button variant="contained" color="success">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                    {loggedInUser.admin
                      && <>
                        <TableCell align="left" size="small">
                          <Link to={`/dogs/${dog.id}/edit`}>
                            <Button variant="contained" color="warning">
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="left" size="small">
                          <Button variant="contained" color="error">
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell align="left" size="small">
                          <Button variant="contained" color="primary" onClick={handleRetire}>
                            {dog.retired ? "Unretire Dog" : "Retire Dog"}
                          </Button>
                        </TableCell>
                      </>}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );

};

export default Dog;