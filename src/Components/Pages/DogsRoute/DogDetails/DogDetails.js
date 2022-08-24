import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getDog } from "../../../services/dogsServices";

const DogDetails = () => {
  const initialDogDetails = {
  };
  const params = useParams();
  const navigate = useNavigate();

  const [dogDetails, setDogDetails] = useState(initialDogDetails);
  const [gallery, setGallery] = useState([]);
  const [healthtest, setHealthtest] = useState([]);
  const [litter, setLittter] = useState([]);
  const [litters, setLitters] = useState([]);

  useEffect(() => {
    console.log(params);
    getDog(params.id)
      .then(response => {
        console.log(response.data);
        setDogDetails(response.data.dog);
        setGallery(response.data.gallery_images);
        setHealthtest(response.data.healthtest);
        setLitters(response.data.litters);
        setLittter(response.data.litter || []);
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