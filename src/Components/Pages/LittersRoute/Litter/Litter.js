import { Button, Typography, Table, TableBody, TableCell, TableRow, Collapse, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";
import { patchLitter } from "../../../services/litterServices";
import { useGlobalState } from "../../../utils/stateContext";

const Litter = (props) => {
  const { litter, breeder, sire, bitch } = props;
  const { store, dispatch } = useGlobalState();
  const { litterList } = store;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    // creates new Object with updated litter info
    const newLitter = {
      ...litter,
      status: 2
    };
    updateLitterList(newLitter);
  };
  const handleOpen = () => {
    // creates new Object with updated litter info
    const newLitter = {
      ...litter,
      status: 1
    };
    updateLitterList(newLitter);
  };

  const updateLitterList = (newLitter) => {
    // finds original litter in litter list
    const originalLitter = litterList.find(lit => lit.id === litter.id);
    // creates mutable array of litter list
    let newLitterList = [...litterList];
    // splices new litter info into the position of old litter info
    newLitterList.splice(litterList.indexOf(originalLitter), 1, newLitter);
    // makes patch to backend to update litter
    patchLitter(litter.id, newLitter)
      .then(litter => {
        console.log(litter);
        // on success dispatches new litter list to update global state
        if (litter.status === 200) {
          dispatch({
            type: 'updateLitterList',
            data: newLitterList
          });
        };
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <TableRow>
        {/* {console.log(litter)} */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{(() => {
            switch (litter.status) {
              case 3: return "Notional";
              case 1: return "Open";
              case 2: return "Close";
              default: return "No Status";
            }
          })()}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{litter.lname}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{breeder.username}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{sire.realname}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{bitch.realname}</Typography>
        </TableCell>
        <TableCell>
          {litter.edate ?
            <Typography sx={{ textAlign: 'center' }}>{moment(litter.edate).format('DD/MM/YYYY')}</Typography>
            :
            <Typography sx={{ textAlign: 'center' }}>Not Provided</Typography>
          }
        </TableCell>
        <TableCell>
          {litter.adate ?
            <Typography sx={{ textAlign: 'center' }}>{moment(litter.adate).format('DD/MM/YYYY')}</Typography>
            :
            <Typography sx={{ textAlign: 'center' }}>Not Provided</Typography>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ display: 'flex' }}>
                    <TableCell align="left" size="small" >
                      <Link to={`/litters/${litter.id}`}>
                        <Button variant="contained" color="success">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="left" size="small">
                      <Link to={`/litters/${litter.id}/edit`}>
                        <Button variant="contained" color="warning">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    {litter.status === 3 ?
                      null
                      :
                      <TableCell align="left" size="small">
                        {litter.status === 2 ?
                          <Button variant="contained" color="info" onClick={handleOpen}>
                            Open
                          </Button>
                          :
                          <Button variant="contained" color="error" onClick={handleClose}>
                            Close
                          </Button>}
                      </TableCell>
                    }
                    <TableCell align="left" size="small">
                      <Link to={`/litters/${litter.id}/applications`}>
                        <Button variant="contained">
                          View/Manage Applications
                        </Button>
                      </Link>
                    </TableCell>
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

export default Litter;