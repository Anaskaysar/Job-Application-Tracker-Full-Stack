import { LinearGradient } from 'expo-linear-gradient';
import { Briefcase } from 'lucide-react-native';
import { useEffect } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    const { user, loading: authLoading } = useAuth();
    const { theme, isDarkMode } = useTheme();

    // Animation Shared Values
    const floatValue = useSharedValue(0);
    const tiltX = useSharedValue(0);
    const tiltY = useSharedValue(0);
    const glowOpacity = useSharedValue(0.3);
    const contentOpacity = useSharedValue(0);
    const contentTranslateY = useSharedValue(20);
    const progress = useSharedValue(0);

    useEffect(() => {
        // 1. Floating Animation (Bobbing)
        floatValue.value = withRepeat(
            withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );

        // 2. 3D Tilt Animation (Looping perspective)
        tiltX.value = withRepeat(
            withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );
        tiltY.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );

        // 3. Glow Animation
        glowOpacity.value = withRepeat(
            withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );

        // 4. Content Entrance
        contentOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
        contentTranslateY.value = withDelay(500, withTiming(0, { duration: 1000, easing: Easing.out(Easing.back()) }));

        // 5. Progress Bar Crawl (Smooth 6s)
        progress.value = withTiming(1, { duration: 6000, easing: Easing.linear });

        // 6. Redirection Logic
        const minimumTime = 6000; // Increased to 6 seconds for maximum brand impact
        const startTime = Date.now();

        const handleRedirect = () => {
            if (!authLoading) {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, minimumTime - elapsed);

                setTimeout(() => {
                    if (user) {
                        navigation.replace('Dashboard');
                    } else {
                        navigation.replace('Login');
                    }
                }, remaining);
            }
        };

        if (!authLoading) {
            handleRedirect();
        }
    }, [user, authLoading]);

    const animatedLogoStyle = useAnimatedStyle(() => {
        const translateY = interpolate(floatValue.value, [0, 1], [0, -20]);
        const rotateX = interpolate(tiltX.value, [0, 1], [-10, 10]);
        const rotateY = interpolate(tiltY.value, [0, 1], [-15, 15]);

        return {
            transform: [
                { translateY },
                { perspective: 1000 },
                { rotateX: `${rotateX}deg` },
                { rotateY: `${rotateY}deg` },
            ],
        };
    });

    const animatedGlowStyle = useAnimatedStyle(() => ({
        opacity: glowOpacity.value,
        transform: [{ scale: interpolate(glowOpacity.value, [0.3, 0.8], [1, 1.4]) }],
    }));

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: contentTranslateY.value }],
    }));

    const animatedProgressStyle = useAnimatedStyle(() => ({
        width: `${progress.value * 100}%`,
    }));

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar hidden />

            {/* Background Subtle Gradient */}
            <LinearGradient
                colors={isDarkMode
                    ? ['rgba(79, 70, 229, 0.05)', 'transparent', 'rgba(124, 58, 237, 0.05)']
                    : ['rgba(37, 99, 235, 0.03)', 'transparent', 'rgba(124, 58, 237, 0.03)']
                }
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
                {/* Animated Glow / Aura */}
                <Animated.View style={[styles.glowContainer, animatedGlowStyle]}>
                    <LinearGradient
                        colors={isDarkMode ? ['#4F46E540', 'transparent'] : ['#2563EB20', 'transparent']}
                        style={styles.glowCircle}
                    />
                </Animated.View>

                {/* Floating 3D Briefcase */}
                <Animated.View style={[styles.logoWrapper, animatedLogoStyle]}>
                    <LinearGradient
                        colors={isDarkMode ? ['#4F46E5', '#8B5CF6'] : ['#2563EB', '#7C3AED']}
                        style={styles.logoCircle}
                    >
                        <Briefcase color="#fff" size={60} />
                    </LinearGradient>
                </Animated.View>

                {/* Text Fade-in */}
                <Animated.View style={[styles.textContainer, animatedContentStyle]}>
                    <Text style={[styles.welcomeText, { color: theme.primary }]}>WELCOME TO</Text>
                    <Text style={[styles.title, { color: theme.text }]}>JobTracker</Text>
                    <Text style={[styles.tagline, { color: theme.textSecondary }]}>Your professional journey starts here</Text>

                    <View style={styles.loadingContainer}>
                        <View style={[styles.loadingTrack, { backgroundColor: theme.border }]}>
                            <Animated.View style={[
                                styles.loadingProgress,
                                { backgroundColor: theme.primary },
                                animatedProgressStyle
                            ]} />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowContainer: {
        position: 'absolute',
        zIndex: -1,
    },
    glowCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
    },
    logoWrapper: {
        zIndex: 2,
        marginBottom: 40,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 35, // Premium squircle look
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 15,
    },
    textContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 4,
        marginBottom: 8,
        opacity: 0.8,
    },
    title: {
        fontSize: 48,
        fontWeight: '800',
        letterSpacing: -1.5,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '500',
        opacity: 0.8,
    },
    loadingContainer: {
        marginTop: 40,
        width: 120,
    },
    loadingTrack: {
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingProgress: {
        height: '100%',
        width: '30%',
        borderRadius: 2,
    },
});

export default WelcomeScreen;
