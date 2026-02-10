import { LinearGradient } from 'expo-linear-gradient';
import {
    Bell,
    Briefcase,
    CheckCircle2,
    LogOut,
    Moon,
    Plus,
    Sun,
    User,
    XCircle
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import ProfileContent from '../components/ProfileContent';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
    const { user, logout } = useAuth();
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [sendingVerification, setSendingVerification] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [dismissedBanner, setDismissedBanner] = useState(false);

    const handleResendVerification = async () => {
        try {
            setSendingVerification(true);
            await api.post("/api/auth/registration/resend-email/");
            setVerificationSent(true);
            setTimeout(() => setVerificationSent(false), 5000);
        } catch (error) {
            console.error("Failed to resend verification email", error);
        } finally {
            setSendingVerification(false);
        }
    };

    const fetchApplications = async () => {
        if (!user) {
            // Guest mode: Use dummy data
            setApplications([
                { id: 1, company_name: 'Google', position_title: 'Frontend Developer', status: 'Applied', applied_at: '2 hours ago' },
                { id: 2, company_name: 'Meta', position_title: 'React Native Engineer', status: 'Interview', applied_at: 'Yesterday' },
                { id: 3, company_name: 'Amazon', position_title: 'Software Engineer', status: 'Pending', applied_at: '3 days ago' },
            ]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('/api/applications/');
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const stats = [
        {
            id: '1',
            label: 'Applied',
            count: applications.filter(a => a.status === 'Applied').length,
            icon: Briefcase,
            color: isDarkMode ? '#818CF8' : '#2563EB'
        },
        {
            id: '2',
            label: 'Interview',
            count: applications.filter(a => a.status === 'Interview').length,
            icon: CheckCircle2,
            color: '#10B981'
        },
        {
            id: '3',
            label: 'Offer',
            count: applications.filter(a => a.status === 'Offer').length,
            icon: CheckCircle2,
            color: '#8B5CF6'
        },
        {
            id: '4',
            label: 'Rejected',
            count: applications.filter(a => a.status === 'Rejected').length,
            icon: XCircle,
            color: '#EF4444'
        },
    ];

    const recentApps = applications.slice(0, 5).map(app => ({
        id: app.id.toString(),
        company: app.company_name,
        position: app.position_title,
        status: app.status,
        date: app.applied_at || 'Recently'
    }));

    const renderStatCard = (item) => (
        <View key={item.id} style={[styles.statCardInner, { width: (width - 48 - 12) / 2 }]}>
            <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={[styles.statIconContainer, { backgroundColor: `${item.color}20` }]}>
                    <item.icon color={item.color} size={24} />
                </View>
                <Text style={[styles.statCount, { color: theme.text }]}>{item.count}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{item.label}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={[styles.background, { backgroundColor: theme.background }]} />

            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: theme.text }]}>Hello, {user?.username || 'Guest'}</Text>
                    <Text style={[styles.subGreeting, { color: theme.textSecondary }]}>Let's find your dream job</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={toggleTheme}>
                        {isDarkMode ? <Sun color="#F59E0B" size={22} /> : <Moon color="#64748B" size={22} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}
                        onPress={() => setShowProfileModal(true)}
                    >
                        <User color={theme.textSecondary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Bell color={theme.textSecondary} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border === '#E2E8F0' ? '#FEE2E2' : '#7F1D1D' }]}
                        onPress={logout}
                    >
                        <LogOut color="#EF4444" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Email Verification Banner */}
                {user && !user.email_verified && !dismissedBanner && (
                    <View style={[styles.bannerContainer, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
                        <TouchableOpacity
                            style={styles.closeBannerButton}
                            onPress={() => setDismissedBanner(true)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <X size={16} color="#94A3B8" />
                        </TouchableOpacity>

                        <View style={styles.bannerContent}>
                            <View style={[styles.bannerIconContainer, { backgroundColor: '#DBEAFE' }]}>
                                <Mail size={20} color="#2563EB" />
                            </View>
                            <View style={styles.bannerTextContainer}>
                                <Text style={[styles.bannerTitle, { color: '#1E3A8A' }]}>Verify your email address</Text>
                                <Text style={[styles.bannerDescription, { color: '#475569' }]}>
                                    We sent a link to <Text style={{ fontWeight: 'bold' }}>{user.email}</Text>. Please check your inbox.
                                </Text>
                                <TouchableOpacity
                                    onPress={handleResendVerification}
                                    disabled={sendingVerification || verificationSent}
                                    style={{ marginTop: 8 }}
                                >
                                    <Text style={[styles.resendLink, { color: sendingVerification || verificationSent ? '#94A3B8' : '#2563EB' }]}>
                                        {verificationSent ? "✓ Email sent!" : sendingVerification ? "Sending..." : "Resend verification email"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {/* Stats Grid */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Overview</Text>
                    <View style={styles.statsGrid}>
                        {stats.map(stat => renderStatCard(stat))}
                    </View>
                </View>

                {/* Recent Applications */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Applications</Text>
                        <TouchableOpacity>
                            <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {recentApps.map(app => (
                        <TouchableOpacity key={app.id} style={[styles.appCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                            <View style={styles.appCardContent}>
                                <View style={[styles.companyLogo, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
                                    <Text style={[styles.logoText, { color: theme.primary }]}>{app.company[0]}</Text>
                                </View>
                                <View style={styles.appInfo}>
                                    <Text style={[styles.companyName, { color: theme.text }]}>{app.company}</Text>
                                    <Text style={[styles.positionName, { color: theme.textSecondary }]}>{app.position}</Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: app.status === 'Interview' ? '#10B98115' : `${theme.primary}15` }]}>
                                    <Text style={[styles.statusText, { color: app.status === 'Interview' ? '#10B981' : theme.primary }]}>{app.status}</Text>
                                </View>
                            </View>
                            <View style={[styles.appCardFooter, { borderTopColor: theme.border }]}>
                                <Text style={[styles.appDate, { color: theme.textSecondary }]}>{app.date}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <LinearGradient
                    colors={isDarkMode ? ['#4F46E5', '#8B5CF6'] : ['#2563EB', '#7C3AED']}
                    style={styles.fabGradient}
                >
                    <Plus color="#fff" size={32} />
                </LinearGradient>
            </TouchableOpacity>

            {/* Profile Modal */}
            <Modal
                visible={showProfileModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowProfileModal(false)}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                    <ProfileContent onClose={() => setShowProfileModal(false)} />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 14,
        marginTop: 4,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statCount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        marginTop: 4,
    },
    seeAll: {
        fontWeight: '600',
    },
    appCard: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    appCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyLogo: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    appInfo: {
        flex: 1,
        marginLeft: 12,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    positionName: {
        fontSize: 14,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    appCardFooter: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    appDate: {
        fontSize: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerContainer: {
        marginHorizontal: 24,
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        position: 'relative',
    },
    closeBannerButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
        padding: 4,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: 20,
    },
    bannerIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bannerDescription: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 8,
    },
    resendLink: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default DashboardScreen;
