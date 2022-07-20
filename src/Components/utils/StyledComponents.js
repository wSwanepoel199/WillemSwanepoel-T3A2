import styled, { css } from 'styled-components';
import { Card, Container, Row, Col, Image, Nav } from 'react-bootstrap';

// export const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;

// ${props =>
//   props.primary && css`
//   background: palevioletred;
//   color: white;
// `}
// `;

// export const StyledButton = styled(Button)`
// color: palevioletred;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   ${props =>
//     props.primary && css`
//     background: palevioletred;
//     color: white;
//   `}
// `;

export const StyledCard = styled(Card)`
max-width: 18rem;
margin-left: auto;
margin-right: auto;
`;

export const StyledCardBody = styled(Card.Body)`
border-top-style: solid;
border-top-width: 1px;
border-top-color: rgba(0, 0, 0, 0.175);
border-top-radius: 0.375rem;
`;

export const StyledCardTitle = styled(Card.Title)`
display: flex;
justify-content: center;
`;

export const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const StyledCol = styled(Col)`
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: 0;
`;

export const StyledImage = styled(Image)`
max-width: 100%;
max-height: 100%;
`;

export const StyledNav = styled(Nav)`

`;