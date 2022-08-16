import { Button, Typography, Table, TableBody, TableCell, TableRow, Collapse, IconButton, Box } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";

const Dog = (props) => {
  const { dog } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        {console.log(dog)}
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
          <Typography sx={{ textAlign: 'center' }}>{dog.realname}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{dog.callname}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{dog.ownername ? dog.ownername : `Not Provided`}</Typography>
        </TableCell>
        <TableCell align='center'>
          <Typography sx={{ textAlign: 'center' }}>{dog.breedername ? dog.ownername : "Not Provided"}</Typography>
        </TableCell>
        <TableCell>
          {dog.dob ?
            <Typography sx={{ textAlign: 'center' }}>{moment(dog.dob).format('DD/MM/YYYY')}</Typography>
            :
            <Typography sx={{ textAlign: 'center' }}>Not Provided</Typography>
          }
        </TableCell>
        <TableCell>
          {dog.retired ?
            <Typography sx={{ textAlign: 'center' }}>Retired</Typography>
            :
            <Typography sx={{ textAlign: 'center' }}>Not Retired</Typography>
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
                      <Link to={`/dogs/display/${dog.id}`}>
                        <Button variant="contained" color="success">
                          View
                        </Button>
                      </Link>
                    </TableCell>
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