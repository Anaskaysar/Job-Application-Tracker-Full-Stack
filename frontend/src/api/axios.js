//set a base url so that we dont have to type it every time
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// The "Security Guard" (Request Interceptor)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Match the Django format: "Bearer <token>"
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;