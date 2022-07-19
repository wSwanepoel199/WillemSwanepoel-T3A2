import { Link } from "react-router-dom";
import { StyledButton, StyledCard } from '../utils/StyledComponents';
import { Card, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';

const Dog = (props) => {
  const { dog } = props;
  let img = '';
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
      <Col>
        <StyledCard>
          <StyledCard.Img variant="top" src={dogImage} />
          <StyledCard.Body>
            <StyledCard.Title>{dog.name}</StyledCard.Title>
            <StyledCard.Text>url: {dog.url}</StyledCard.Text>
            <Link to={`/dogs/${dog.name}`}>
              <Button variant="primary">View Dog</Button>
            </Link>
          </StyledCard.Body>
        </StyledCard>
      </Col>
    </>
  );
};

export default Dog;