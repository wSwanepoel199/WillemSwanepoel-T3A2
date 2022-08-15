import { Button, Typography, Table, TableBody, TableCell, TableRow, Collapse, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";

const Litter = (props) => {
  const { litter } = props;
  const { breeder, sire, bitch } = litter;
  const [open, setOpen] = useState(false);

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
        <TableCell sx={{ pb: 0, pt: 0 }} colSpan={7}>
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
                    <TableCell align="left" size="small">
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
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