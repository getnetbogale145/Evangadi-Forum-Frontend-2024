import axios from "axios";

const instance = axios.create({
  baseURL: "https://evangadi-forum-backend-2024-5.onrender.com/api",
});

export default instance;
