import apiClient from ".";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  // Add any other response fields you need
}

export async function login(credentials: LoginCredentials) {
  // Create FormData object
  const formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const response = await apiClient.post<LoginResponse>(
    "/api/Users/login",
    formData
  );
  return response.data;
}

export async function logout() {
  const response = await apiClient.post("/api/auth/logout");
  return response.data;
}
