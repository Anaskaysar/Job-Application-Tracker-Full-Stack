import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Briefcase, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading, error } = useAuth();
    const { theme, isDarkMode } = useTheme();

    const handleSignup = async () => {
        try {
            // Logic here
        } catch (err) { }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => navigation.goBack()}>
                    <ArrowLeft color={theme.text} size={24} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <View style={[styles.logoCircleSmall, { backgroundColor: isDarkMode ? '#4F46E520' : '#2563EB10', marginBottom: 16 }]}>
                        <Briefcase color={theme.primary} size={32} />
                    </View>
                    <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Join us and track your career growth</Text>
                </View>

                <View style={styles.form}>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <View style={[styles.inputWrapper, { backgroundColor: theme.input, borderColor: theme.border }]}>
                        <View style={styles.iconContainer}>
                            <User color={theme.textSecondary} size={20} />
                        </View>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor={theme.textSecondary}
                        />
                    </View>

                    <View style={[styles.inputWrapper, { backgroundColor: theme.input, borderColor: theme.border }]}>
                        <View style={styles.iconContainer}>
                            <Mail color={theme.textSecondary} size={20} />
                        </View>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Email"
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
                            secureTextEntry
                            placeholderTextColor={theme.textSecondary}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
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
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.footerLink, { color: theme.primary }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 24,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    header: {
        marginBottom: 32,
        marginTop: 60,
        alignItems: 'center',
    },
    logoCircleSmall: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
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
        paddingRight: 16,
        fontSize: 16,
    },
    button: {
        marginTop: 8,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        fontSize: 14,
    },
    footerLink: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
