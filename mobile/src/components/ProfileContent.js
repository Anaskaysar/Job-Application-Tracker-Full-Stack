import { LinearGradient } from 'expo-linear-gradient';
import {
    ExternalLink,
    Heart,
    Info,
    LogOut,
    Mail,
    Shield,
    User,
    XCircle
} from 'lucide-react-native';
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProfileContent = ({ onClose }) => {
    const { user, logout } = useAuth();
    const { theme, isDarkMode } = useTheme();
    const insets = useSafeAreaInsets();

    const handleDonation = () => {
        Linking.openURL('https://ko-fi.com/anaskaysar');
    };

    const handleLogout = async () => {
        await logout();
        if (onClose) onClose();
    };

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Profile & Support</Text>
                <TouchableOpacity
                    style={[styles.closeButton, { backgroundColor: theme.card, borderColor: theme.border }]}
                    onPress={onClose}
                >
                    <XCircle color={theme.textSecondary} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* User Header */}
                <View style={styles.userSection}>
                    <LinearGradient
                        colors={isDarkMode ? ['#4F46E5', '#8B5CF6'] : ['#2563EB', '#7C3AED']}
                        style={styles.avatarCircle}
                    >
                        <Text style={styles.avatarText}>
                            {user?.username?.[0]?.toUpperCase() || "U"}
                        </Text>
                    </LinearGradient>
                    <Text style={[styles.userName, { color: theme.text }]}>{user?.username || "N/A"}</Text>
                    <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{user?.email || "N/A"}</Text>
                </View>

                {/* Info Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account Information</Text>
                    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <View style={styles.infoRow}>
                            <User color={theme.primary} size={20} />
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Username</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.username || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <View style={styles.infoRow}>
                            <Mail color={theme.primary} size={20} />
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Email</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>{user?.email || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <View style={styles.infoRow}>
                            <Shield color={theme.primary} size={20} />
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Status</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Verified Professional</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Support Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Support the Project</Text>
                    <TouchableOpacity
                        onPress={handleDonation}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#4F46E5', '#7C3AED']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.donationCard}
                        >
                            <View style={styles.donationContent}>
                                <Heart color="#fff" size={24} />
                                <View style={{ flex: 1, marginLeft: 16 }}>
                                    <Text style={styles.donationTitle}>Support JobTracker</Text>
                                    <Text style={styles.donationSubtitle}>Help keep this passion project alive and growing.</Text>
                                </View>
                                <ExternalLink color="#fff" size={20} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>About JobTracker</Text>
                    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <View style={styles.infoRow}>
                            <Info color={theme.textSecondary} size={20} />
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoValue, { color: theme.text }]}>Version 1.0.0 (Stable)</Text>
                                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Built with ❤️ by Kaysarul Anas</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={[styles.logoutButton, { borderColor: isDarkMode ? '#EF444450' : '#FEE2E2' }]}
                    onPress={handleLogout}
                >
                    <LogOut color="#EF4444" size={20} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    userSection: {
        alignItems: 'center',
        marginVertical: 32,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    avatarText: {
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 2,
    },
    divider: {
        height: 1,
        marginVertical: 16,
        marginLeft: 36,
    },
    donationCard: {
        borderRadius: 24,
        padding: 20,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 6,
    },
    donationContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    donationTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    donationSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 24,
        borderWidth: 1.5,
        marginTop: 12,
        gap: 8,
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileContent;
