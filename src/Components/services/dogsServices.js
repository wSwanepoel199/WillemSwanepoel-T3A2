import { backEndAPI } from "../utils/componentIndex";

export async function getDogs() {
  const response = await backEndAPI.get('/dogs');
  return response.data;
}

export async function addPuppy(data) {
  const response = await backEndAPI.post('/add_puppy', data);
  return response.data;
}

export async function pushNewPositions(data) {
  console.log(data);
  const response = await backEndAPI.patch('/reorder_dogs', data);
  return response;
}