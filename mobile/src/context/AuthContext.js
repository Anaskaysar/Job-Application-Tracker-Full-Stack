import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // PERSISTENCE: Check for tokens on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                if (token) {
                    // Fetch real user profile from dj-rest-auth
                    const response = await api.get("/api/auth/user/");
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Auth verification failed", error);
                await AsyncStorage.removeItem("access_token");
                await AsyncStorage.removeItem("refresh_token");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/api/auth/login/", { email, password });

            const accessToken = response.data.access || response.data.access_token || response.data.key;
            const refreshToken = response.data.refresh || response.data.refresh_token;
            let userData = response.data.user;

            if (accessToken) {
                await AsyncStorage.setItem("access_token", accessToken);
                if (refreshToken) await AsyncStorage.setItem("refresh_token", refreshToken);

                if (!userData) {
                    const userRes = await api.get("/api/auth/user/");
                    userData = userRes.data;
                }
                setUser(userData);
            }
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.non_field_errors?.[0] ||
                error.response?.data?.detail ||
                "Login failed";
            setError(errorMsg);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/api/auth/registration/", {
                username,
                email,
                password1: password,
                password2: password
            });

            const accessToken = response.data.access || response.data.access_token || response.data.key;
            const refreshToken = response.data.refresh || response.data.refresh_token;
            let userData = response.data.user;

            if (accessToken) {
                await AsyncStorage.setItem("access_token", accessToken);
                if (refreshToken) await AsyncStorage.setItem("refresh_token", refreshToken);

                if (!userData) {
                    const userRes = await api.get("/api/auth/user/");
                    userData = userRes.data;
                }
                setUser(userData);
            }
            return response.data;
        } catch (error) {
            const data = error.response?.data;
            let errorMsg = "Registration failed";
            if (data) {
                if (typeof data === 'string') errorMsg = data;
                else if (data.email) errorMsg = `Email: ${data.email[0]}`;
                else if (data.username) errorMsg = `Username: ${data.username[0]}`;
                else if (data.password) errorMsg = `Password: ${data.password[0]}`;
                else if (data.non_field_errors) errorMsg = data.non_field_errors[0];
            }
            setError(errorMsg);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (googleAccessToken) => {
        try {
            setLoading(true);
            setError(null);

            // Send the Google access token to your backend SocialLoginView
            const response = await api.post("/api/auth/google/", {
                access_token: googleAccessToken,
            });

            const accessToken = response.data.access || response.data.access_token || response.data.key;
            const refreshToken = response.data.refresh || response.data.refresh_token;
            let userData = response.data.user;

            if (accessToken) {
                await AsyncStorage.setItem("access_token", accessToken);
                if (refreshToken) await AsyncStorage.setItem("refresh_token", refreshToken);

                if (!userData) {
                    const userRes = await api.get("/api/auth/user/");
                    userData = userRes.data;
                }
                setUser(userData);
            }
            return response.data;
        } catch (error) {
            console.error("Google login failed", error);
            setError("Google login failed. Please try again.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout/");
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            setUser(null);
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("refresh_token");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
