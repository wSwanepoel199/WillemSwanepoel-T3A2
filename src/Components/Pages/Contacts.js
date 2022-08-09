import { useGlobalState } from "../utils";
import { Contact } from "../utils";
import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { getForms } from '../services/contactServices';
const Contacts = () => {
  const { store, dispatch } = useGlobalState();
  const { contactFormList } = store;

  useEffect(() => {
    getForms()
      .then(forms => {
        dispatch({
          type: "setFilledForms",
          data: forms
        });
        sessionStorage.setItem("filledContactForms", JSON.stringify(forms));
      })
      .catch(e => console.log(e));
  }, []);

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