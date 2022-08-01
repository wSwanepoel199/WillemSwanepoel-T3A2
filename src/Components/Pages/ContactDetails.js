import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForm } from "../services/contactServices";
import { useGlobalState } from "../utils";
import { Alert } from "@mui/material";

const ContactDetails = () => {
  const initialContactDetails = {
  };
  const params = useParams();
  const { store } = useGlobalState();

  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  useEffect(() => {
    if (store.loggedInUser.admin) {
      getForm(params.id)
        .then((form) => {
          console.log(form);
          setContactDetails(form);
        })
        .catch(e => console.log(e));
    }
  }, []);

  return (
    <div>
      {store.loggedInUser.admin ?
        <>
          {contactDetails ?
            <>
              <h4>{contactDetails.email}</h4>
              <p>{contactDetails.phonenumber}</p>
              <p>{contactDetails.reason}</p>
              <p>{contactDetails.text}</p>
              <Link to="/contacts">Return</Link>
            </>
            :
            <>
              <p>Form Does not Exist</p>
              <Link to="/">Return Home</Link>
            </>
          }
        </>
        :
        <>
          <Alert severity="warning">You do not have access to view this page</Alert>
          <Navigate to="/contactForm" />
        </>
      }
    </div>
  );
};

export default ContactDetails;