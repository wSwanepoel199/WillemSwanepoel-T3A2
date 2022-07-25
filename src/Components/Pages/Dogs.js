import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { StyledRow } from "../utils/StyledComponents";
import { Container } from "react-bootstrap";

const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;

  return (
    <>
      <Container>
        <StyledRow>
          {Object.keys(dogList).map((dog) =>
            <Dog key={dog} dog={dogList[dog]} />
          )}
        </StyledRow>
      </Container>
    </>
  );

};

export default Dogs;