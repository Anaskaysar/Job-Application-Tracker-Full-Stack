import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API - adjust this to your backend's IP address if testing on a physical device
// localhost doesn't work for physical devices or most emulators/simulators
const baseURL = "https://api.jobtracker.kaysarulanas.me/"; 

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const authEndpoints = ['/api/auth/login/', '/api/auth/registration/', '/api/auth/google/'];
            const isAuthRequest = authEndpoints.some(endpoint => 
                config.url.startsWith(endpoint) || config.url.includes(endpoint)
            );

            if (token && !isAuthRequest) {
                const prefix = token.length > 50 ? "Bearer" : "Token";
                config.headers.Authorization = `${prefix} ${token}`;
            }
        } catch (error) {
            console.error("Error retrieving token from storage", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
