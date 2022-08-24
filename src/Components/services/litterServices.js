import { backEndAPI } from "../utils/componentIndex";

export async function getLitters() {
  const response = await backEndAPI.get('/litters');
  console.log(response.data);
  return response.data;
}

export async function postLitter(data) {
  console.log(JSON.stringify(data));
  const response = await backEndAPI.post('/litters', data);
  console.log(response);
  return response;
}

export async function getLitter(id) {
  const response = await backEndAPI.get(`/litters/${id}`);
  return response.data;
}

export async function patchLitter(id, data) {
  const response = await backEndAPI.patch(`/litters/${id}`, data);
  console.log(response);
  return response;
}

export async function postNewPuppy(data) {
  const response = await backEndAPI.post('/add_puppy', data);
  return response;
}

export async function getLitterApps() {
  const response = await backEndAPI.get('/litter_applications');
  return response.data;
}

export async function getLitterApp(id) {
  const response = await backEndAPI.get(`/litter_applications/${id}`);
  return response;
}

export async function postApplication(data) {
  console.log(data);
  const response = await backEndAPI.post('/lazy_litter_application_create', data);
  return response.data;
}

export async function patchLitterApp(id, data) {
  const response = await backEndAPI.patch(`/litter_applications/${id}`, data);
  return response;
}

export async function getShowCase(id) {
  const response = await backEndAPI.get(`/showcase/${id}`);
  return response;
}

export async function getBest() {
  const response = await backEndAPI.get('/showcase');
  return response;
}