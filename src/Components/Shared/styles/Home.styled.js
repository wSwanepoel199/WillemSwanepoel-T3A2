import { styled } from '@mui/system';
import { Container, Image, Col, Card } from 'react-bootstrap';

const breakpoints = [376, 576, 768, 992];
const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

export const StyledContainer = styled(Container)`
padding-top: 15px;
`;
export const StyledImage = styled(Image)`
max-width: 100%;
max-height: 100%;
align-self: center;
@media (min-width: 992px) {
  max-width: 75%;
}
`;
export const StyledCol = styled(Col)`
display: flex;
flex-direction: column;
justify-content: center;
`;

export const StyledCard = styled(Card)`
max-width: 100%;
max-height: 100%;
margin-left: auto;
margin-right: auto;
${mq[0]} {
  max-width: 75%;
};
${mq[1]}{
  max-width: 100%;
};
${mq[2]} {
  max-width: 75%;
};
${mq[3]}{
  max-width: 100%;
};
`;

export const StyledCardImage = styled(Card.Img)`
max-width: 100%;
align-self: center;
`;

export const StyledCardBody = styled(Card.Body)`
max-height:100%
`;