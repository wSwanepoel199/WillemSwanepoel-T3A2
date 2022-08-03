import { Button, Container, Grid, Paper, Typography, Stack, Table, TableBody, TableCell, TableRow, Collapse, ClickAwayListener, ButtonBase, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import moment from "moment";
import { LitterDetails, useGlobalState } from '../utils/';
import { useState } from "react";

const Litter = (props) => {
  const { litter, breeder, sire, bitch } = props;
  const [open, setOpen] = useState(false);

  let Breeder = {};
  let Sire = {};
  let Bitch = {};

  breeder.forEach(user => {
    if (user[1].id === litter.breeder_id) {
      Breeder = user[1];
    }
  });
  sire.forEach(sire => {
    if (sire[1].id === litter.sire_id) {
      Sire = sire[1];
    }
  });
  bitch.forEach(bitch => {
    if (bitch[1].id === litter.bitch_id) {
      Bitch = bitch[1];
    }
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{litter.lname}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{Breeder.username}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{Sire.realname}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{Bitch.realname}</Typography>
        </TableCell>
        <TableCell>
          {litter.edate ?
            <Typography>{moment(litter.edate).format('DD-MM-YYYY')}</Typography>
            :
            <Typography>Not Provided</Typography>
          }
        </TableCell>
        <TableCell>
          {litter.adate ?
            <Typography>{moment(litter.adate).format('DD-MM-YYYY')}</Typography>
            :
            <Typography>Not Provided</Typography>
          }
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
                      <Button variant="contained" color="success">
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="left" size="small">
                      <Button variant="contained" color="warning">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="left" size="small">
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
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