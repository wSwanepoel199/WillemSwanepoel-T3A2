import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'https://myshalair-back.herokuapp.com/'
});

backEndAPI.interceptors.request.use(req => {
  const token = sessionStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default backEndAPI;