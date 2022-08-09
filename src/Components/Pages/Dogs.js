import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { SortableItem } from './SortableItem';
import { Container, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { pushNewPositions } from "../services/dogsServices";

const Dogs = (params) => {
  // initalises store from global state
  const { store, dispatch } = useGlobalState();
  // makes doglist available
  const { dogList } = store;

  // sets initial states of page
  const mounted = useRef();
  const [activeId, setActiveId] = useState(null);
  const [positions, setPositions] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [updatedDogs, setUpdatedDogs] = useState({});

  // on mount fills dogs state with doglist, and orders them from lowerest value postion to highest
  useEffect(() => {
    setDogs(Object.values(dogList).sort((a, b) => a.position - b.position));
  }, [dogList, mounted]);

  useEffect(() => {
    if (!mounted.current) {
      console.log(mounted);
      console.log(dogList);
      console.log("newly mounted");
      mounted.current = true;
    } else {
      if (dogs.length === 0 && dogList) {
        console.log("dogs empty");
        setDogs(Object.values(dogList).sort((a, b) => a.position - b.position));
      }
    }
  });

  useEffect(() => {
    const requestList = {
      dogs: Object.values(updatedDogs)
    };
    console.log(requestList);
    pushNewPositions(requestList)
      .then(reply => {
        console.log(reply);
      })
      .catch(e => console.log(e));
    return () => {

    };
  }, []);

  // filters dogs based on passed params
  const handleSex = (params, dogs) => {
    switch (params.id) {
      case "males": {
        return dogs.filter((dog) => dog.sex === 1);
      }
      case "females": {
        return dogs.filter((dog) => dog.sex === 2);
      }
      case "retired": {
        return dogs.filter((dog) => dog.retired);
      }
      default: {
        return dogs;
      }
    }
  };

  // once doglist is filled, triggers above function to filter available dogs
  useEffect(() => {
    setDogs(handleSex(params, dogs));
  }, [dogs.length > 0]);

  // once drag hook ends parses dogs id and their position into an object to be passed to backend for updating
  useEffect(() => {
    if (!activeId) {
      const finalList = [];
      dogs.forEach((dog) => {
        return finalList.push({
          "id": dog.id,
          "position": dog.position
        });
      });
      console.log(finalList);
      setUpdatedDogs(finalList);
    }
  }, [activeId]);

  // defines sensores drag and drop will use with their applicable constraints
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

  // function that is called when dragStart hook is called, updates positions state and active id state, the latter is used to track the draged container
  const handleDragStart = (e) => {
    const { active } = e;
    setActiveId(active.id);
    setPositions(dogs.map(dog => dog.position));
  };

  // called when dragEnd hook is called, updates dogs based on the current active containers id, the the id the active container is over
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