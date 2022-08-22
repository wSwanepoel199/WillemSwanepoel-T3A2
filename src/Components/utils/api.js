import axios from "axios";

const dev = 'http://localhost:3001';
const prod = 'https://myshalair-back.herokuapp.com/';

const backEndAPI = axios.create({
  baseURL: dev
});

backEndAPI.interceptors.request.use(req => {
  console.log(req);
  const token = sessionStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

backEndAPI.interceptors.response.use(res => {
  if (res.headers['authorization']) {
    const jwt = res.headers['authorization'].split('Bearer ')[1];
    window.sessionStorage.setItem("token", jwt);
  }

  return res;
});

export default backEndAPI;