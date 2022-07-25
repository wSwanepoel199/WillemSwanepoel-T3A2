import styled from 'styled-components';
import { Container, Form, Button } from 'react-bootstrap';

// Form Custom Styling
export const StyledFormContainer = styled(Container)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
min-width: 75%;
`;

export const StyledFormGroup = styled(Form.Group)`
display: flex;
align-self: flex-start;
min-width:100%;
flex-direction: column;
justify-content: flex-start;
@media (min-width:960px){
  align-self: center;
  min-width:50%;
}
`;

export const StyledSubmitButton = styled(Button)`'

`;