import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { useParams } from "react-router";
import { Box, Container, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Item } from "./Item";
import { buildDeprecatedPropsWarning } from "@mui/x-date-pickers/internals";
import { MoneyOutlined } from "@mui/icons-material";

const Dogs = (params) => {
  const { store } = useGlobalState();
  const { dogList } = store;
  const checkMount = useRef();
  const [activeId, setActiveId] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [item, setItems] = useState([
    {
      id: "1",
      xsWidth: 6,
      content: <div style={{ color: "yellow" }}>first chart is here</div>,
      color: "red"
    },
    {
      id: "2",
      xsWidth: 6,
      content: <div style={{ color: "white" }}>second chart is here</div>,
      color: "blue"
    },
    { id: "3", xsWidth: 12, content: "third chart", color: "green" }
  ]);


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
    if (!checkMount.current) {
      // didMount
      handleSex(params);
    } else {
      // did update
      console.log("update");
    }

    return () => {
      // did unmount
    };
  }, [store]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e) => {
    const { active } = e;
    console.log(active);
    console.log(active.id);
    setActiveId(active.id);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      setDogs((dogs) => {
        var activePos = dogs.findIndex((dog) => dog.id === active.id);
        var overPos = dogs.findIndex((dog) => dog.id === over.id);
        parsePositions(dogs, activePos, overPos);
        return arrayMove(dogs, activePos, overPos);
      });
    }
    setActiveId(null);
  };


  const parsePositions = (dogs, active, over) => {
    console.log(dogs[active]);
    console.log(dogs[over]);
  };

  return (
    <Container >
      {console.log(arrayMove(dogs, 3, 6))}
      {console.log(activeId)}
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={dogs} strategy={rectSortingStrategy}>
            {dogs.map(dog => <Dog key={dog.id} id={dog.id} dog={dog} />)}
          </SortableContext>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
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