import { styled } from '@mui/system';
import { Card, Col } from 'react-bootstrap';

// Cards Custom Styling
export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
`;

export const StyledCard = styled(Card)`
max-width: 18rem;
margin-left: auto;
margin-right: auto;
`;

export const StyledCardTitle = styled(Card.Title)`
display: flex;
justify-content: center;
`;

export const StyledCardBody = styled(Card.Body)`
border-top-style: solid;
border-top-width: 1px;
border-top-color: rgba(0, 0, 0, 0.175);
border-top-radius: 0.375rem;
`;