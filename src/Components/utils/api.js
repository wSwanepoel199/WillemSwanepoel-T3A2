import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

backEndAPI.interceptors.request.use(req => {
  console.log(req);
  const token = sessionStorage.getItem("token");
  if (token) {
    console.log(token);
    req.headers["Authorization"] = `${token}`;
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