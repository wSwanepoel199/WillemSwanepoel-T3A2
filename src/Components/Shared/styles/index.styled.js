// import styled from 'styled-components';
import { styled } from '@mui/system';
// import { Container } from 'react-bootstrap';
import { Container } from '@mui/material';
import { createTheme } from '@mui/system';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    }
  }
});

export const StyledContainer = styled(Container)`
margin-top: 5%;
@media (min-width: 992px) {
  margin-top: 25px;
}
`;

export default theme;