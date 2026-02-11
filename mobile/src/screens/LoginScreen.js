import { LinearGradient } from 'expo-linear-gradient';
import { Briefcase, Eye, EyeOff, Lock, Mail, UserCircle2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuth();
    const { theme, isDarkMode } = useTheme();

    // Animation values
    const formOpacity = useSharedValue(0);
    const formTranslateY = useSharedValue(20);

    useEffect(() => {
        // Form entrance
        formOpacity.value = withTiming(1, { duration: 1000 });
        formTranslateY.value = withSpring(0);
    }, []);

    const animatedFormStyle = useAnimatedStyle(() => ({
        opacity: formOpacity.value,
        transform: [{ translateY: formTranslateY.value }],
    }));

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) { }
    };

    const handleGoogleLogin = async () => {
        try {
            // This is where the Google Auth Session (expo-auth-session) would trigger
            console.log("Triggering Google Login flow...");
            // For now, it shows the ready state. 
            // await googleLogin(tokenFromGoogle);
        } catch (err) { }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <View style={[styles.background, { backgroundColor: theme.background }]} />

            <View style={styles.content}>
                <Animated.View style={[styles.header, animatedFormStyle]}>
                    <View style={[styles.logoCircleSmall, { backgroundColor: isDarkMode ? '#4F46E520' : '#2563EB10' }]}>
                        <Briefcase color={theme.primary} size={32} />
                    </View>
                    <Text style={[styles.title, { color: theme.text }]}>JobTracker</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Welcome back, login to your account</Text>
                </Animated.View>

                <Animated.View style={[styles.form, animatedFormStyle]}>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <View style={[styles.inputWrapper, { backgroundColor: theme.input, borderColor: theme.border }]}>
                        <View style={styles.iconContainer}>
                            <Mail color={theme.textSecondary} size={20} />
                        </View>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={theme.textSecondary}
                        />
                    </View>

                    <View style={[styles.inputWrapper, { backgroundColor: theme.input, borderColor: theme.border }]}>
                        <View style={styles.iconContainer}>
                            <Lock color={theme.textSecondary} size={20} />
                        </View>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            placeholderTextColor={theme.textSecondary}
                        />
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff color={theme.textSecondary} size={20} />
                            ) : (
                                <Eye color={theme.textSecondary} size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={[styles.forgotText, { color: theme.primary }]}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <LinearGradient
                            colors={isDarkMode ? ['#4F46E5', '#8B5CF6'] : ['#2563EB', '#7C3AED']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Text style={[styles.dividerText, { color: theme.textSecondary }]}>OR CONTINUE WITH</Text>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    </View>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={[styles.socialButton, { backgroundColor: theme.card, borderColor: theme.border }]}
                            onPress={handleGoogleLogin}
                            disabled={loading}
                        >
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                                style={styles.socialIcon}
                            />
                            <Text style={[styles.socialButtonText, { color: theme.text }]}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, { backgroundColor: theme.card, borderColor: theme.border }]}
                            onPress={() => navigation.navigate('GuestDashboard')}
                        >
                            <UserCircle2 color={theme.text} size={20} />
                            <Text style={[styles.socialButtonText, { color: theme.text }]}>Guest Mode</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={[styles.footerLink, { color: theme.primary }]}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    logoCircleSmall: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        padding: 14,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingRight: 8,
        fontSize: 16,
    },
    eyeBtn: {
        padding: 14,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#EF4444',
        marginBottom: 16,
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    divider: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        fontSize: 14,
    },
    footerLink: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
