import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DogDetails = () => {
  const initialDogDetails = {
  };
  const params = useParams();

  const [dogDetails, setDogDetails] = useState(initialDogDetails);

  useEffect(() => {
    console.log(params);
    axios.get(`https://myshalair-back.herokuapp.com/dogs/${params.id}`)
      .then(response => {
        console.log(response.data);
        setDogDetails(response.data);
      })
      .catch(e => console.log(e));
  }, []);

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
          <Link to="/dogs">Return</Link>
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