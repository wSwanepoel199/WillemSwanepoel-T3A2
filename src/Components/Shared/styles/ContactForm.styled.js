import styled from 'styled-components';
import { Container, Form } from 'react-bootstrap';

// Form Custom Styling
export const StyledFormContainer = styled(Container)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
${'' /* @media (min-width:1024px){
  max-width:50%;
} */}
`;

export const StyledFormGroup = styled(Form.Group)`
min-width: 75%;
`;