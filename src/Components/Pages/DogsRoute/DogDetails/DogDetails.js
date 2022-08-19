import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const DogDetails = () => {
  const initialDogDetails = {
  };
  const params = useParams();
  const navigate = useNavigate();

  const [dogDetails, setDogDetails] = useState(initialDogDetails);

  useEffect(() => {
    console.log(params);
    axios.get(`http://127.0.0.1:3001/dogs/${params.id}`)
      .then(response => {
        console.log(response.data);
        setDogDetails(response.data.dog);
      })
      .catch(e => console.log(e));
  }, [params]);

  return (
    <div>
      {console.log(dogDetails)}
      {console.log(params)}
      {dogDetails ?
        <>
          <h4>{dogDetails.realname}</h4>
          <img alt={`${dogDetails.realname}`} src={dogDetails.main_image} />
          <p>{dogDetails.callname}</p>
          <p>{dogDetails.ownername}</p>
          <p>{dogDetails.breedername}</p>
          <p>{dogDetails.dob}</p>
          <Button onClick={() => navigate(-1)}>Return</Button>
        </>
        :
        <>
          <p>Dog Does not Exist</p>
          <Link to="/">Return Home</Link>
        </>
      }
    </div>
  );
};

export default DogDetails;