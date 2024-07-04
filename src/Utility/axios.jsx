import axios from "axios";

const instance = axios.create({
  // baseURL: "https://github.com/getnetbogale145/Evangadi-Forum-Backend-2024",
  baseURL: "https://evanforum-backend-2.onrender.com/api",
});

export default instance;
