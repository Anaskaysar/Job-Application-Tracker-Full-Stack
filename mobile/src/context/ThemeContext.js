import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const COLORS = {
    light: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#1E293B',
        textSecondary: '#64748B',
        primary: '#2563EB',
        secondary: '#7C3AED',
        border: '#E2E8F0',
        input: '#FFFFFF',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        statCard: '#FFFFFF',
        iconBg: 'rgba(37, 99, 235, 0.1)',
    },
    dark: {
        background: '#0F172A',
        card: '#1E293B',
        text: '#F8FAFC',
        textSecondary: '#94A3B8',
        primary: '#4F46E5',
        secondary: '#8B5CF6',
        border: '#334155',
        input: '#1E293B',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        statCard: '#1E293B',
        iconBg: 'rgba(79, 70, 229, 0.2)',
    }
};

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme_preference');
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (e) {
            console.error('Failed to load theme', e);
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = async () => {
        try {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            await AsyncStorage.setItem('theme_preference', newMode ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    };

    const theme = isDarkMode ? COLORS.dark : COLORS.light;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme, loading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
