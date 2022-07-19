import styled, { css } from 'styled-components';
import { Button, Card, Container } from 'react-bootstrap';

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
width: 18rem;

`;

export const StyledContainer = styled(Container)`
  text-align: center;
`;