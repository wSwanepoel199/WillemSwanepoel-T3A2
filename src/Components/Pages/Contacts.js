import { useGlobalState } from "../utils";
import { Contact } from "../utils";
import { Container, Grid } from "@mui/material";
const Contacts = () => {
  const { store } = useGlobalState();
  const { contactFormList } = store;

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly">
        {Object.entries(contactFormList).map((id, form) =>
          <Grid item xs={12} key={form}>
            <Contact form={id[1]} />
          </Grid>
        )}
      </Grid>
    </Container>
  );

};

export default Contacts;;