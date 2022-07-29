import { backEndAPI } from "../utils";

export async function getForm() {
  const response = await backEndAPI.get('/contacts');
  console.log(response.data);
  return response.data;
}

export async function postForm(data) {
  console.log(data);
  const response = await backEndAPI.post('/contacts', data);
  console.log(response.data);
  return response.data;
}