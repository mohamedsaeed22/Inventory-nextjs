import axios from "axios";

const API_BASE_URL = "http://172.16.7.61:9991";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQxREU5RENFLTVBMTktNEMyNS1CMzM2LThCQTExM0JDOTg4NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzUwMDU0MDQ1LCJpc3MiOiJGb2VNYWludGFpbiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEifQ.2-CwkX5vbmiPgFn9LAWmvNIgLcH56JzprXZDy3xLeP8`,
  },
});

export default apiClient;
