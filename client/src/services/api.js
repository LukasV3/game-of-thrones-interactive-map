import axios from "axios";

export default axios.create({
  baseURL: "https://game-of-thrones-interactive.herokuapp.com/api/v1/kingdoms",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
