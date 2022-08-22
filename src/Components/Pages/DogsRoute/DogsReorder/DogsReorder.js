import { useGlobalState, DogCard } from "../../../utils/componentIndex";
import { SortableItem } from '../../SortableItem';
import { Box, Container, Grid, Typography, Paper, Button } from "@mui/material";
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

// known issues; patching to often, patching with to much data(not sure if avoidable)
// honestly whole page needs rework
// https://overreacted.io/how-are-function-components-different-from-classes/ worth using either class or implimented another use of useRef for dogs

const DogsReorder = () => {
  // initalises store from global state
  const { store } = useGlobalState();
  // makes doglist available
  const { dogList } = store;

  // sets initial states of page
  const mounted = useRef(); // <= is used to control when useEffects trigger
  const [activeId, setActiveId] = useState(null); //<= stores the id of the dragging element
  const [dogs, setDogs] = useState([]); // <= stores the dogs that are being displayed
  const [positions, setPositions] = useState([]); // <= stores the existing positions of displayed dogs
  const [updatedPositions, setUpdatedPositions] = useState({}); // <= stores the ids and new positions of each dog to be patched to backend
  const [filter, setFilter] = useState('all');


  // controls component mount via mounted constant variable
  useEffect(() => {
    // if mounted.current is false sets to true, run other inital mount functions here
    if (!mounted.current && dogList.length > 0) {
      setDogs(dogList.sort((a, b) => a.position - b.position));
      mounted.current = true;
      // runs the rest on every update
    } else {
    }
    // return () => {
    //   console.log("final call for mounting");
    //   mounted.current = false;
    // };
  });

  useEffect(() => {
    if (filter !== 'all') {
      setDogs(handleSex(filter, dogList));
    } else {
      setDogs(dogList);
    }
  }, [filter, dogList]);

  // on mount fills dogs state with doglist, and orders them from lowerest value postion to highest
  // useEffect(() => {
  //   if (mounted.current) {
  //     console.log(dogList);
  //     console.log("populating dogs");
  //     setDogs(handleSex(params, Object.values(dogList).sort((a, b) => a.position - b.position)));
  //   }
  //   return () => {
  //     console.log("final call setting dogs");
  //   };
  // }, [params, dogList]);

  // once doglist is filled, triggers above function to filter available dogs
  // useEffect(() => {
  //   if (mounted.current) {
  //     setDogs(handleSex(params, dogs));
  //   }
  // }, [dogs.length > 0]);

  // once drag hook ends parses dogs id and their position into an object to be passed to backend for updating
  // useEffect(() => {
  //   if (!activeId && mounted.current) {
  //     const finalList = { dogs: [] };
  //     dogs.forEach((dog) => {
  //       return finalList.dogs.push({
  //         "id": dog.id,
  //         "position": dog.position
  //       });
  //     });
  //     console.log("updated dog position list:", finalList);
  //     console.log(dogs);
  //     setUpdatedPositions(finalList);
  //   }
  //   return () => {
  //     console.log("final call updating dogs position");
  //   };
  // }, [dogs, activeId]);

  // triggers when updatedPositions has value set, makes patch request to update backend on dogs new positions
  // useEffect(() => {
  //   console.log("updated positions", updatedPositions);
  //   if (updatedPositions !== []) {
  //     pushNewPositions(updatedPositions)
  //       .then(reply => {
  //         console.log(reply);
  //       })
  //       .catch(e => console.log(e));
  //   }
  //   return () => {
  //     console.log("final call patching dogs position");
  //   };

  // }, [updatedPositions]);

  // useEffect(() => {
  //   if (location) {

  //   }
  //   return () => {
  //     window.location.reload();
  //   };
  // }, [location]);

  // filters dogs based on passed params
  const handleSex = (filter, dogs) => {
    switch (filter) {
      case "male": {
        return dogs.filter((dog) => dog.sex === 1);
      }
      case "female": {
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

  const handleFilter = (status) => {
    if (status === filter) {
      setFilter('all');
    } else {
      setFilter(status);
    }
  };

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

  // function that is called when dragStart hook is called, sets positions state and active id state, the latter is used to track the draged container
  const handleDragStart = (e) => {
    const { active } = e;
    setActiveId(active.id);
    setPositions(dogs.map(dog => dog.position));
  };

  // called when dragEnd hook is called, updates dogs based on the current active containers id, the the id the active container is over, also updates dogs positions based on their new position in the array, then clears activeId state
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

  // function that reassins dogs position value to the position state value of their index
  const setNewPositions = (arrMove) => {
    return arrMove.map((dog, id) => {
      return {
        ...dog,
        position: positions[id]
      };
    });
  };

  return (
    <Box>
      {console.log("local state dogs:", dogs)}
      {console.log(filter)}
      <Button>Save New Positions</Button>
      <Button>Cancel</Button>
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="h2" >Reorder Dogs</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <Button sx={{ mx: 2 }} variant="outlined" onClick={() => handleFilter('male')}>Male</Button>
          <Button sx={{ mx: 2 }} variant="outlined" onClick={() => handleFilter('female')}>Female</Button>
          <Button sx={{ mx: 2 }} variant="outlined" onClick={() => handleFilter('retired')}>Retired</Button>
        </Box>
      </Box>
      <Box component={Paper} sx={{ px: 2 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={dogs} strategy={rectSortingStrategy}>
              {dogs.map((dog, index) => <SortableItem key={index} id={dog.id} dog={dog} />)}
            </SortableContext>
            <DragOverlay>{activeId ?
              <>
                <DogCard id={activeId} dog={dogs.find(dog => dog.id === activeId)} />
              </>
              :
              null
            }</DragOverlay>
          </DndContext>
        </Grid>
      </Box>
    </Box>
  );

};

export default DogsReorder;