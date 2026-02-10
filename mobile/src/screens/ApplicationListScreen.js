import { ArrowLeft, Edit2, Search, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import EditApplicationModal from '../components/EditApplicationModal';
import { useTheme } from '../context/ThemeContext';

const ApplicationListScreen = ({ navigation }) => {
    const { theme, isDarkMode } = useTheme();
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/api/applications/');
            // Sort by applied_at desc
            const sorted = response.data.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
            setApplications(sorted);
            setFilteredApps(sorted);
        } catch (error) {
            console.error("Failed to fetch applications", error);
            Alert.alert("Error", "Failed to fetch applications");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            const filtered = applications.filter(app =>
                app.company_name.toLowerCase().includes(lower) ||
                app.position_title.toLowerCase().includes(lower)
            );
            setFilteredApps(filtered);
        } else {
            setFilteredApps(applications);
        }
    }, [searchQuery, applications]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchApplications();
    };

    const handleEdit = (app) => {
        setSelectedApp(app);
        setModalVisible(true);
    };

    const handleUpdateSuccess = () => {
        fetchApplications();
        setModalVisible(false);
        setSelectedApp(null);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => handleEdit(item)}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.logoPlaceholder, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
                    <Text style={[styles.logoText, { color: theme.primary }]}>{item.company_name[0]}</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={[styles.companyName, { color: theme.text }]}>{item.company_name}</Text>
                    <Text style={[styles.positionTitle, { color: theme.textSecondary }]}>{item.position_title}</Text>
                </View>
                <View style={[styles.statusBadge, {
                    backgroundColor: item.status === 'Interview' ? '#10B98115' :
                        item.status === 'Offer' ? '#8B5CF615' :
                            item.status === 'Rejected' ? '#EF444415' : `${theme.primary}15`
                }]}>
                    <Text style={[styles.statusText, {
                        color: item.status === 'Interview' ? '#10B981' :
                            item.status === 'Offer' ? '#8B5CF6' :
                                item.status === 'Rejected' ? '#EF4444' : theme.primary
                    }]}>{item.status}</Text>
                </View>
            </View>
            <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
                <Text style={[styles.dateText, { color: theme.textSecondary }]}>Applied: {item.applied_at || 'N/A'}</Text>
                <Edit2 size={16} color={theme.textSecondary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>All Applications</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Search size={20} color={theme.textSecondary} />
                    <TextInput
                        style={[styles.input, { color: theme.text }]}
                        placeholder="Search applications..."
                        placeholderTextColor={theme.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X size={18} color={theme.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* List */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredApps}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No applications found</Text>
                        </View>
                    }
                />
            )}

            {/* Edit Modal */}
            <EditApplicationModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                app={selectedApp}
                onSuccess={handleUpdateSuccess}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    listContent: {
        padding: 20,
        paddingTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    logoPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardInfo: {
        flex: 1,
        marginLeft: 12,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    positionTitle: {
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
        fontWeight: 'bold',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    dateText: {
        fontSize: 12,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
});

export default ApplicationListScreen;
