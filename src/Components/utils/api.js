import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

backEndAPI.interceptors.request.use(req => {
  console.log(req);
  const token = sessionStorage.getItem("token");
  if (token) {
    console.log(token);
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

backEndAPI.interceptors.response.use(res => {
  console.log(res);

  return res;
});

export default backEndAPI;