import React, { useEffect, useState } from 'react';
import { Box, Collapse, Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

const AlertComponent = (props) => {
  const { severity, title, body } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleEnd = () => {
    navigate("."); // <-- redirect to current path w/o state
  };

  useEffect(() => {
    let timer1;
    setOpen(true);
    timer1 = setTimeout(() => {
      setOpen(false);
    },
      5000
    );
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: '2' }}>
      <Collapse
        in={open}
        onExited={() => { handleEnd(); }}
      >
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => { setOpen(false); }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            mb: 2,
          }}
        >
          <AlertTitle>
            {title}
          </AlertTitle>
          {body}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AlertComponent;