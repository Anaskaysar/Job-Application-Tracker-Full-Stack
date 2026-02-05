import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // PERSISTENCE: Check for tokens on page load
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                // For now, we set user to true if token exists. 
                // Later, you can fetch the actual user profile from /api/auth/me/
                setUser(true); 
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/api/auth/token/", { username, password });
            
            // Storing both tokens
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            
            setUser(true);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.detail || "Login failed");
            setLoading(false);
            throw error; // Re-throw so the Login page can show the error
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to make using auth easier in components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
