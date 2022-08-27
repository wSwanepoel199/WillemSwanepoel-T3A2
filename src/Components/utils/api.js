import axios from "axios";

const url = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://myshalair-back.herokuapp.com/';
};

const backEndAPI = axios.create({
  baseURL: url()
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