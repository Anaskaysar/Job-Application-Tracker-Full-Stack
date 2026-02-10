import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { theme, loading: themeLoading } = useTheme();

    // If theme is still loading, show a simple background-matched loader
    if (themeLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome" // Entry point is now the Premium Welcome Screen
                screenOptions={{
                    headerShown: false,
                    animation: 'fade', // Smooth transitions
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />

                {/* Guest Mode Route */}
                <Stack.Screen name="GuestDashboard" component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
