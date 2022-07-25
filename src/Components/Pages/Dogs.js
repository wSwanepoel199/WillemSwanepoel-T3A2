import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { StyledRow } from "../Shared/styles/Dogs.styled";
import { Container } from "react-bootstrap";

const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;

  return (
    <>
      <Container>
        <StyledRow>
          {Object.entries(dogList).map((id, dog) =>
            <Dog key={id} dog={dogList[dog]} />
          )}
        </StyledRow>
      </Container>
    </>
  );

};

export default Dogs;