import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { Row } from "react-bootstrap";
import { StyledContainer, StyledRow } from "../utils/StyledComponents";

const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;

  return (
    <>
      <StyledContainer>
        <StyledRow>
          {Object.keys(dogList).map((dog) =>
            <Dog key={dog} dog={dogList[dog]} />
          )}
        </StyledRow>
      </StyledContainer>
    </>
  );

};

export default Dogs;