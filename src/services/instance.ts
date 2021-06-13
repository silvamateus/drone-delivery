import axios from "axios";

const instance = axios.create({
  baseURL: "http://services.solucx.com.br/mock/drones",
});

export default instance;
