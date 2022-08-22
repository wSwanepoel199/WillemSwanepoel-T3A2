export function updateItemInArray(item, array) {
  // locates original item in provided array
  const originalItem = array.find(original => original.id === item.id);
  // makes new mutable array out of provided
  let newArray = [...array];
  // splices in provided item into provided array
  newArray.splice(array.indexOf(originalItem), 1, item);

  return newArray;
}

export const colours = [
  { id: 0, colour: "No Preferance" },
  { id: 1, colour: "Black" },
  { id: 2, colour: "Gold" },
  { id: 3, colour: "Black and Tan" },
  { id: 4, colour: "Blue Roan" },
  { id: 5, colour: "Blue Roan and Tan" },
  { id: 6, colour: "Orange Roan" },
  { id: 7, colour: "Black and White" },
  { id: 8, colour: "Black, White and Tan" },
  { id: 9, colour: "Gold and White" },
  { id: 10, colour: "Chocolate (Liver)" },
  { id: 11, colour: "Liver and Tan" },
  { id: 12, colour: "Liver Roan" },
  { id: 13, colour: "Liver Roan and Tan" }
];