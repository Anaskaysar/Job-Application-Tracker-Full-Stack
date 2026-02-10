//set a base url so that we dont have to type it every time
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/";

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
        const authEndpoints = ['/api/auth/login/', '/api/auth/registration/', '/api/auth/google/'];
        // Using startsWith in case of full URLs or params
        const isAuthRequest = authEndpoints.some(endpoint => config.url.startsWith(endpoint) || config.url.includes(endpoint));

        if (token && token !== "undefined" && token !== "null" && !isAuthRequest) {
            // Smartly detect if it's a JWT (long) or a standard Token (short)
            const prefix = token.length > 50 ? "Bearer" : "Token";
            config.headers.Authorization = `${prefix} ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;