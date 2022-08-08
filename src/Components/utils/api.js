import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

console.log(backEndAPI.defaults.headers.common['Authorization']);

backEndAPI.interceptors.request.use(req => {
  console.log(req);
  const token = sessionStorage.getItem("token");
  if (token) {
    console.log(token);
    req.headers["Authorization"] = `${token}`;
  }

  return req;
});

export default backEndAPI;