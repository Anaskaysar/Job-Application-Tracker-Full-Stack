import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // PERSISTENCE: Check for tokens on page load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    // Fetch real user profile from dj-rest-auth
                    const response = await api.get("/api/auth/user/");
                    setUser(response.data); 
                } catch (error) {
                    console.error("Auth verification failed", error);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/api/auth/login/", { email, password });
            console.log("Login Response Data:", response.data);
            
            // Support both JWT (access, access_token) and Standard Token (key)
            const accessToken = response.data.access || response.data.access_token || response.data.key;
            const refreshToken = response.data.refresh || response.data.refresh_token;
            let userData = response.data.user;
            
            if (accessToken) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                
                // Set a temporary user state so PrivateRoute doesn't redirect back immediately
                setUser({ is_loading_profile: true });

                // If user data is missing in the response, fetch it manually
                if (!userData) {
                    try {
                        const userRes = await api.get("/api/auth/user/");
                        userData = userRes.data;
                    } catch (e) {
                        console.error("Manual profile fetch failed", e);
                        // If profile fetch fails, we should probably logout
                        setUser(null);
                        throw e;
                    }
                }

                setUser(userData);
            }
            setLoading(false);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.non_field_errors?.[0] || 
                           error.response?.data?.detail || 
                           "Login failed";
            setError(errorMsg);
            setLoading(false);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            // dj-rest-auth points to /api/auth/registration/
            const response = await api.post("/api/auth/registration/", userData);
            console.log("Registration Response Data:", response.data);

            // Support both JWT and Standard Token
            const accessToken = response.data.access || response.data.access_token || response.data.key;
            const refreshToken = response.data.refresh || response.data.refresh_token;
            let registeredUser = response.data.user;

            if (accessToken) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                
                // If user data is missing in the response, fetch it manually
                if (!registeredUser) {
                    try {
                        const userRes = await api.get("/api/auth/user/");
                        registeredUser = userRes.data;
                    } catch (e) {
                        console.error("Manual profile fetch failed", e);
                    }
                }

                setUser(registeredUser);
            }
            setLoading(false);
            return response.data;
        } catch (error) {
            // Registration errors often come in nested fields
            const data = error.response?.data;
            let errorMsg = "Registration failed";
            if (data) {
                if (typeof data === 'string') errorMsg = data;
                else if (data.email) errorMsg = `Email: ${data.email[0]}`;
                else if (data.password) errorMsg = `Password: ${data.password[0]}`;
                else if (data.non_field_errors) errorMsg = data.non_field_errors[0];
            }
            setError(errorMsg);
            setLoading(false);
            throw error;
        }
    };

    const googleLogin = async (googleAccessToken) => {
        try {
            setLoading(true);
            setError(null);
            // Sending the Google access token to our backend bridge
            const response = await api.post("/api/auth/google/", {
                access_token: googleAccessToken
            });

            const { access, refresh, user: userData } = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            setUser(userData);
            setLoading(false);
            return response.data;
        } catch (error) {
            setError("Google login failed. Please try again.");
            setLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout/");
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            setUser(null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to make using auth easier in components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
