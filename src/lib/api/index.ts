import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://172.16.7.61:9991";
// add accept header and content type header
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    ...(Cookies.get("accessToken") && {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    }),
  },
});

export default apiClient;
