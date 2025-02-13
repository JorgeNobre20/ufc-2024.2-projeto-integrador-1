import axios from "axios";

const webApi = axios.create({
  baseURL: "http://localhost:3000",
});

export { webApi };