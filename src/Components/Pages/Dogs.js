import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { useParams } from "react-router";
import { Container, Grid } from "@mui/material";
const Dogs = () => {
  const { store } = useGlobalState();
  const { dogList } = store;
  const params = useParams();

  const handleSex = (params) => {
    if (params.id === "males") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 1);
    } else if (params.id === "females") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 2);
    } else if (params.id === "retired") {
      return Object.entries(dogList).filter((dog) => dog[1].retired = true);
    } else {
      return Object.entries(dogList);
    }
  };

  return (
    <>
      {console.log(params)}
      {console.log(handleSex(params))}
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          columns={{ xs: 6, sm: 8, md: 10, lg: 12 }}>
          {handleSex(params).map((id, dog) =>
            <Grid item sm={3} md={3} key={dog}>
              <Dog dog={id[1]} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );

};

export default Dogs;