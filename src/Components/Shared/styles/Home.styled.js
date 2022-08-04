import { styled } from '@mui/system';
import { Image, } from 'react-bootstrap';
import { Container } from '@mui/material';

export const StyledContainer = styled(Container)`
padding-top: 20px;
`;
export const StyledImage = styled(Image)`
max-width: 100%;
max-height: 100%;
align-self: center;
@media (min-width: 992px) {
  max-width: 75%;
}
`;