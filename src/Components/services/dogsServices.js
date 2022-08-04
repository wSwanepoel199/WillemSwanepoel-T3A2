import { backEndAPI } from "../utils";

export async function getDogs() {
  const response = await backEndAPI.get('/dogs');
  return response.data;
}

export async function addPuppy(data) {
  const response = await backEndAPI.post('/add_puppy', data);
  return response.data;
}