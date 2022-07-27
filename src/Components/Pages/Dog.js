import { Link } from "react-router-dom";
import { StyledCard, StyledCol, StyledCardTitle, StyledCardBody } from '../Shared/styles/Dog.styled';
import { Button } from "react-bootstrap";

const Dog = (props) => {
  const { dog } = props;

  return (
    <>
      <StyledCol md="auto">
        <StyledCard>
          <StyledCard.Img fluid="true" variant="top" src={dog.main_image} />
          <StyledCardBody>
            <StyledCardTitle>{dog.callname}</StyledCardTitle>
            <StyledCard.Text>
              Full Name: {dog.realname}
            </StyledCard.Text>
            <StyledCard.Text>
              Owner: {dog.ownername}
            </StyledCard.Text>
            <StyledCard.Text>
              Breeder: {dog.breedername}
            </StyledCard.Text>
            <StyledCard.Text>
              Sex: {dog.sex === 1 ?
                "Male"
                :
                "Female"}
            </StyledCard.Text>
            <Link to={`/dogs/chosen/${dog.id}`}>
              <Button variant="primary">View Dog</Button>
            </Link>
          </StyledCardBody>
        </StyledCard>
      </StyledCol>
    </>
  );
};

export default Dog;