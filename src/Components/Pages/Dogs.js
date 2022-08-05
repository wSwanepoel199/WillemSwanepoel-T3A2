import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { SortableItem } from './SortableItem';
import { useParams } from "react-router";
import { Box, Container, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  closestCorners,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { pushNewPositions } from "../services/dogsServices";
import { Item } from "./Item";
import { buildDeprecatedPropsWarning } from "@mui/x-date-pickers/internals";
import { MoneyOutlined } from "@mui/icons-material";
import { CloseButton } from "react-bootstrap";
import { getUsers } from "../services/authServices";

const Dogs = (params) => {
  const { store } = useGlobalState();
  const { dogList } = store;

  const [activeId, setActiveId] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [positions, setPositions] = useState([]);

  // have ordering run prior to unmounting component

  const handleSex = (params) => {
    if (params.id === "males") {
      setDogs(Object.values(dogList).filter((dog) => dog.sex === 1).sort((a, b) => a.position - b.position));
    } else if (params.id === "females") {
      setDogs(Object.values(dogList).filter((dog) => dog.sex === 2).sort((a, b) => a.position - b.position));
    } else if (params.id === "retired") {
      setDogs(Object.values(dogList).filter((dog) => dog.retired = true).sort((a, b) => a.position - b.position));
    } else {
      setDogs(Object.values(dogList).sort((a, b) => a.position - b.position));
    }
  };

  useEffect(() => {
    handleSex(params);

    return () => {
      let newArr = [];
      dogs.forEach(dog => {
        newArr.push({ id: dog.id, position: dog.position });
      });
      newArr = {
        dogs: {
          ...newArr
        }
      };
      pushNewPositions(newArr)
        .then(reply => {
          console.log(reply);
        })
        .catch(e => console.log(e));

    };
  }, [store]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 25,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e) => {
    const { active } = e;
    setActiveId(active.id);
    setPositions(copyPositions());
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      setDogs((dogs) => {
        var activePos = dogs.findIndex((dog) => dog.id === active.id);
        var overPos = dogs.findIndex((dog) => dog.id === over.id);
        return setNewPositions(arrayMove(dogs, activePos, overPos));
      });
    }
    setActiveId(null);
  };

  const copyPositions = () => {
    let dogPositions = [];
    dogs.forEach(dog => dogPositions.push(dog.position));
    console.log(dogPositions);
    return dogPositions;
  };

  const setNewPositions = (arrMove) => {
    return arrMove.map((dog, id) => {
      return {
        ...dog,
        position: positions[id]
      };
    });
  };

  return (
    <Container >
      {console.log(dogs)}
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={dogs} strategy={rectSortingStrategy}>
            {dogs.map(dog => <SortableItem key={dog.id} id={dog.id} dog={dog} />)}
          </SortableContext>
          <DragOverlay>{activeId ?
            <>
              <Dog id={activeId} dog={dogs.find(dog => dog.id === activeId)} />
            </>
            :
            null
          }</DragOverlay>
        </DndContext>
      </Grid>
    </Container>
  );

};

export default Dogs;

// {dogs.map((dog, index) => (

//   <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//     <Dog
//       dog={dog[1]}
//       key={index}
//     />
//   </Grid>
// ))}

// {dogs.map(dog => <Dog key={dog[1].id} id={dog[1].id} dog={dog[1]} />)}