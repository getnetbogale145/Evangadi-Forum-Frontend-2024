import axios from "axios";

const instance = axios.create({
  baseURL: "https://evangadi-forum-getnet.netlify.app/",
});

export default instance;
