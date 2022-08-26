import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

export const SortableContainer = ({ id, component, children }) => {

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <Box
      component={component}
      ref={setNodeRef}
    >
      {children}
    </Box>
  );
};
