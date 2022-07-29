import { backEndAPI } from "../utils";

export async function signUp(data) {
  console.log(data);
  const response = await backEndAPI.post('/users', data);
  console.log(response.data);
  return response.data;
}

export async function signIn(data) {
  console.log(data);
  const response = await backEndAPI.post('/users/sign_in', data);
  console.log(response.data);
  return response.data;
}