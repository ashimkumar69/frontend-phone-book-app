import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/phone-book-app/public/api",
  withCredentials: false,
});
