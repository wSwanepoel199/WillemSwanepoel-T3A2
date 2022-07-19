import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { Row } from "react-bootstrap";
import { StyledContainer } from "../utils/StyledComponents";

const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;

  return (
    <>
      <StyledContainer>
        <Row>
          {Object.keys(dogList).map((dog) =>
            <Dog key={dog} dog={dogList[dog]} />
          )}
        </Row>
      </StyledContainer>
    </>
  );

};

export default Dogs;