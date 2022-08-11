import { backEndAPI } from "../utils/componentIndex";

export async function getLitters() {
  const response = await backEndAPI.get('/litters');
  return response.data;
}

export async function postLitter(data) {
  console.log(JSON.stringify(data));
  const response = await backEndAPI.post('/litters', data);
  console.log(response);
  return response.data;
}

export async function getLitter(data) {
  const response = await backEndAPI.get(`/litters/${data}`);
  return response.data;
}

export async function postApplication(data) {
  console.log(data);
  const response = await backEndAPI.post('/lazy_litter_application_create', data);
  return response.data;
}