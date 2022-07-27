import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { StyledRow } from "../Shared/styles/Dogs.styled";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;
  const params = useParams();

  const handleSex = (params) => {
    if (params.id === "males") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 1);
    } else if (params.id === "females") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 2);
    } else {
      return Object.entries(dogList);
    }
  };

  return (
    <>
      {console.log(params)}
      {console.log(handleSex(params))}
      { }
      <Container>
        <StyledRow>
          {handleSex(params).map((id, dog) =>
            <Dog key={dog} dog={id[1]} />
          )}
        </StyledRow>
      </Container>
    </>
  );

};

export default Dogs;