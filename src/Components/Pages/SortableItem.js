import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid } from "@mui/material";
import { Dog } from "../utils/componentIndex";

export const SortableItem = (props) => {
  // makes the listed attributes available from useSortable, making sure to affect specificied id
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  // draggin affects
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      item
      xs={12} sm={6} md={4} lg={3}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Dog dog={props.dog} />
    </Grid>

  );

};