import { Link } from "react-router-dom";
import { StyledCard, StyledCol, StyledCardTitle, StyledCardBody } from '../utils/StyledComponents';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';

const Dog = (props) => {
  const { dog } = props;
  const initialDog = {
    img: '',
    type: [],
  };
  const [dogStats, setDogStats] = useState(initialDog);

  useEffect(() => {
    axios.get(dog.url)
      .then(response => {
        // console.log(Object.values(response.data.types));
        const typeArray = [];
        // const newArray = response.data.types.reduce((pval, cval) => {
        //   console.log(pval);
        //   console.log(cval);
        // }, console.log(typeArray));
        response.data.types.map((type) => {
          // console.log(Object.values(type));
          Object.values(type).map((num) => {
            // console.log(num.name);
            if (typeof num.name == typeof "") {
              // console.log("true");
              typeArray.push(` ${num.name}`);
            } else {
              return false;
            }
            // console.log(type);
          });

        });
        // console.log(typeArray);
        // console.log(newArray);
        setDogStats({
          img: response.data.sprites.front_default,
          type: typeArray
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <StyledCol>
        <StyledCard>
          <StyledCard.Img fluid="true" variant="top" src={dogStats.img} />
          <StyledCardBody>
            <StyledCardTitle>{dog.name}</StyledCardTitle>
            <StyledCard.Text>
              url: {dog.url}
            </StyledCard.Text>
            {dogStats.type.length >= 2 ?
              <StyledCard.Text>
                types: {dogStats.type.toString()}
              </StyledCard.Text>
              :
              <StyledCard.Text>
                type: {dogStats.type.toString()}
              </StyledCard.Text>
            }
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