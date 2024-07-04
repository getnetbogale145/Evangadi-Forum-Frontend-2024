import axios from "axios";

const instance = axios.create({
  baseURL: "https://evangadi-forum-backend-2024-4.onrender.com",
});

export default instance;
