import { backEndAPI } from "../utils";

export async function getDogs() {
  const response = await backEndAPI.get('/dogs');
  console.log(response.data);
  return response.data;
}