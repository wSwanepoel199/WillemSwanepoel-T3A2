import { useGlobalState } from "../utils";
import { Contact } from "../utils";
import { Navigate, useParams } from "react-router";
import { Alert, Container, Grid } from "@mui/material";
const Contacts = () => {
  const { store } = useGlobalState();
  const { contactFormList } = store;

  return (
    <>
      {store.loggedInUser.admin ?
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
        :
        <>
          <Alert severity="warning">You do not have access to view this page</Alert>
          <Navigate to="/contactForm" />
        </>
      }
    </>
  );

};

export default Contacts;;