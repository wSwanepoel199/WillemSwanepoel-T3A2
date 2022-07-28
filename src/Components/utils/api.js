import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

backEndAPI.interceptors.request.use(req => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default backEndAPI;