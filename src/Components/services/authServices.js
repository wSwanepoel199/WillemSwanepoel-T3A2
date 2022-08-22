import { backEndAPI } from "../utils/componentIndex";

export async function signUp(data) {
  const response = await backEndAPI.post('/users', data);
  return response.data;
}

export async function signIn(data) {
  const response = await backEndAPI.post('/users/sign_in', data);
  return response.data;
}

export async function getUsers() {
  const response = await backEndAPI.get('/userlist');
  return response.data;
}

// export function signOut() {
//   sessionStorage.clear();
//   window.location.reload();
// }