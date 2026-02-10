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
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
