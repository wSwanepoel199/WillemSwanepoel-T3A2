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

export async function getLitter(id) {
  const response = await backEndAPI.get(`/litters/${id}`);
  return response.data;
}

export async function postNewPuppies(data) {
  const response = await backEndAPI.post('/add_puppies', data);
  return response.data;
}

export async function patchLitter(id, data) {
  const response = await backEndAPI.patch(`/litters/${id}`, data);
  return response.data;
}

export async function postApplication(data) {
  console.log(data);
  const response = await backEndAPI.post('/lazy_litter_application_create', data);
  return response.data;
}

export async function getLitterApps() {
  const response = await backEndAPI.get('/litter_applications');
  return response.data;
}

export async function getLitterApp(id) {
  const response = await backEndAPI.get(`/litter_applications/${id}`);
  return response.data;
}