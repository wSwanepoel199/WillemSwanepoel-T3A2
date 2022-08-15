import { Table, TableBody, TableRow, TableCell, IconButton, Typography, Collapse, Box, Button } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// TODO
// Add detailed View for each application
// impliment edit functionality as to assing puppies to an application and control priority of said application, either by editing value in edit, or consider drag and drop functionality

const LitterApplication = (props) => {
  const { app, user, litter } = props;

  const [open, setOpen] = useState(false);



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
        <TableCell align="center">
          <Typography>{user.username}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{litter.lname}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{app.yardarea} m²</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{app.yardfenceheight} m</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{app.priority}</Typography>
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
                      <Link to={`/litters/applications/${app.id}/edit`}>
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

export default LitterApplication;