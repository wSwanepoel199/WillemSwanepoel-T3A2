

export function updateItemInArray(item, array) {
  // locates original item in provided array
  const originalItem = array.find(original => original.id === item.id);
  // makes new mutable array out of provided
  let newArray = [...array];
  // splices in provided item into provided array
  newArray.splice(array.indexOf(originalItem), 1, item);

  return newArray;
}