import axios from "axios";
import accessToken from "../utils/accessToken/AccessToken";

export const baseURL = "https://localhost:8000";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Get the access token from local storage
//     const currentAccessToken = accessToken.getAccessToken();
//     if (currentAccessToken) {
//       // Check if the access token has expired
//       const { exp } = JSON.parse(atob(currentAccessToken.split(".")[1]));
//       if (Date.now() >= exp * 1000) {
//         // If the access token has expired, refresh it
//         return refreshToken().then((newAccessToken) => {
//           // Update the authorization header with the new token
//           config.headers.Authorization = `Bearer ${newAccessToken}`;
//           return config;
//         });
//       } else {
//         // If the access token hasn't expired, add it to the authorization header
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//       }
//     } else {
//       // If there's no access token, just return the original config
//       return config;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // If the API returns a 401 Unauthorized response, refresh the access token and retry the request
//     if (error.response && error.response.status === 401) {
//       return refreshToken().then((newAccessToken) => {
//         // Update the authorization header with the new token
//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//         // Retry the original request
//         return axiosInstance.request(error.config);
//       });
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// Function to refresh the access token
function refreshToken() {
  // Get the refresh token from local storage
  const refreshToken = localStorage.getItem("refreshToken");
  // Make a request to the token refresh endpoint with the refresh token
  return axiosInstance
    .post("/refresh-token", { refreshToken })
    .then((response) => {
      accessToken.setAccessToken(response.data.accessToken);
      // Return the new access token
      return response.data.accessToken;
    });
}

// Use the axiosInstance instead of axios for API requests

export default axiosInstance;