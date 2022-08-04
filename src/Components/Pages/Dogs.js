import { useGlobalState } from "../utils";
import { Dog } from "../utils";
import { useParams } from "react-router";
import { Box, Container, Grid } from "@mui/material";
import { DragDropContext, Droppable, OnDragEndResponder, Draggable } from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from "react";

const Dogs = (params) => {
  const { store } = useGlobalState();
  const { dogList } = store;

  const [dogs, setDogs] = useState([]);

  const handleSex = (params) => {
    if (params.id === "males") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 1);
    } else if (params.id === "females") {
      return Object.entries(dogList).filter((dog) => dog[1].sex === 2);
    } else if (params.id === "retired") {
      return Object.entries(dogList).filter((dog) => dog[1].retired = true);
    } else {
      return Object.entries(dogList);
    }
  };

  useEffect(() => {
    const sortedDogs = handleSex(params);
    setDogs(sortedDogs);
  }, [params]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let movedItems = reorder(
      dogs,
      result.source.index,
      result.destination.index
    );
    console.log(movedItems);
    setDogs(movedItems);

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container >
        <Droppable droppableId="dogs-droppable" type="DOG">
          {(provided, snapshot) => (
            <Grid
              container
              ref={provided.innerRef}
              {...provided.droppableProps}
              spacing={2}
              justifyContent="space-evenly"
              columns={{ xs: 6, sm: 8, md: 10, lg: 12 }}>

              {dogs.map((dog, index) => (
                <Draggable
                  key={dog[1].id}
                  draggableId={`dog-${dog[1].id}`}
                  index={index}>
                  {(provided, snapshot) => (
                    <Grid item sm={3} md={3} ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps} >

                      <Dog
                        dog={dog[1]}
                      />
                    </Grid>
                  )}
                </Draggable>

              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </Container>
    </DragDropContext >
  );

};

export default Dogs;