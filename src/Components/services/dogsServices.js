import { backEndAPI } from "../utils";

export async function getDogs() {
  const response = await backEndAPI.get('/dogs');
  return response.data;
}

export async function getLitters() {
  const response = await backEndAPI.get('/litters');
  return response.data;
}

export async function getLitter(data) {
  const response = await backEndAPI.get(`/litters/${data}`);
  return response.data;
}