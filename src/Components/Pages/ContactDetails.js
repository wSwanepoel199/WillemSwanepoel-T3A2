import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForm } from "../services/contactServices";

const ContactDetails = () => {
  const initialContactDetails = {
  };
  const params = useParams();

  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  useEffect(() => {
    getForm(params.id)
      .then((form) => {
        console.log(form);
        setContactDetails(form);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default ContactDetails;