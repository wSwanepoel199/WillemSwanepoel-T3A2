import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../utils";

const DogDetails = () => {
  const { store } = useGlobalState();
  const { dogList } = store;
  const params = useParams();

  const getDog = (id) => {
    return Object.values(dogList).find(d => d.name === id);
  };
  const dog = getDog(params.id);

  return (
    <div>
      {dog ?
        <>
          <h4>{dog.name}</h4>
          <p>{dog.url}</p>
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