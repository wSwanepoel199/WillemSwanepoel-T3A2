import axios from "axios";

const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001'
});

export default backEndAPI;