import { backEndAPI } from "../utils";

export async function getForms() {
  const response = await backEndAPI.get('/contacts');
  return response.data;
}

export async function postForm(data) {
  const response = await backEndAPI.post('/contacts', data);
  return response.data;
}

export async function getForm(data) {
  const response = await backEndAPI.get(`/contacts/${data}`);
  return response.data;
}