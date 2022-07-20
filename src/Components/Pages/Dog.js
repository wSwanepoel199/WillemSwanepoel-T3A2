import { Link } from "react-router-dom";
import { StyledCard, StyledCol, StyledCardTitle, StyledCardBody } from '../utils/StyledComponents';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';

const Dog = (props) => {
  const { dog } = props;
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    axios.get(dog.url)
      .then(response => {
        // console.log(response.data.sprites.front_default);
        setDogImage(response.data.sprites.front_default);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <StyledCol>
        <StyledCard>
          <StyledCard.Img variant="top" src={dogImage} />
          <StyledCardBody>
            <StyledCardTitle>{dog.name}</StyledCardTitle>
            <StyledCard.Text>url: {dog.url}</StyledCard.Text>
            <Link to={`/dogs/${dog.name}`}>
              <Button variant="primary">View Dog</Button>
            </Link>
          </StyledCardBody>
        </StyledCard>
      </StyledCol>
    </>
  );
};

export default Dog;