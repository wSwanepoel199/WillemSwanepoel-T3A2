import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DogDetails = () => {
  const initialDogDetails = {
  };
  const params = useParams();

  const [dogDetails, setDogDetails] = useState(initialDogDetails);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/dogs/${params.id}`)
      .then(response => {
        console.log(response.data);
        setDogDetails(response.data);
      })
      .catch(e => console.log(e));
  }, []);

  // const getDog = (id) => {
  //   console.log(id);
  //   // console.log(Object.values(dogList));
  //   // return Object.values(dogList).find(d => d.id === id);

  //   return Object.values(dogList).find(dog => {
  //     console.log(dog);
  //   });
  // };
  // const dog = getDog(params.id);

  return (
    <div>
      {console.log(dogDetails)}
      {console.log(params)}
      {dogDetails ?
        <>
          <h4>{dogDetails.realname}</h4>
          <img alt={`Image of ${dogDetails.callname}`} src={dogDetails.main_image} />
          <p>{dogDetails.callname}</p>
          <p>{dogDetails.owner}</p>
          <p>{dogDetails.breeder}</p>
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