import { Check, ExternalLink, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';

const EditApplicationModal = ({ visible, onClose, app, onSuccess }) => {
    const { theme } = useTheme();
    const [status, setStatus] = useState('Applied');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (app) {
            setStatus(app.status || 'Applied');
            setNotes(app.notes || '');
        }
    }, [app]);

    const handleSave = async () => {
        if (!app) return;
        setLoading(true);
        try {
            await api.put(`/api/applications/${app.id}/`, {
                ...app, // Send existing fields to avoid clearing them if backend requires full object
                status,
                notes
            });
            onSuccess();
        } catch (error) {
            console.error("Failed to update application", error);
            Alert.alert("Error", "Failed to update application");
        } finally {
            setLoading(false);
        }
    };

    const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

    if (!visible || !app) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalOverlay}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBackdrop} />
                </TouchableWithoutFeedback>

                <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>Edit Application</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollContent}>
                        <View style={styles.infoRow}>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>Company</Text>
                            <Text style={[styles.value, { color: theme.text }]}>{app.company_name}</Text>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.infoRow}>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>Position</Text>
                            <Text style={[styles.value, { color: theme.text }]}>{app.position_title}</Text>
                        </View>
                        <View style={styles.separator} />

                        {app.job_post_url ? (
                            <>
                                <View style={styles.infoRow}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[styles.label, { color: theme.textSecondary }]}>Job Post</Text>
                                        <TouchableOpacity onPress={() => Linking.openURL(app.job_post_url)}>
                                            <ExternalLink size={16} color={theme.primary} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => Linking.openURL(app.job_post_url)}>
                                        <Text style={[styles.value, { color: theme.primary, textDecorationLine: 'underline' }]} numberOfLines={1}>
                                            {app.job_post_url}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.separator} />
                            </>
                        ) : null}

                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Status</Text>
                        <View style={styles.statusContainer}>
                            {statuses.map(s => (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.statusOption,
                                        {
                                            borderColor: status === s ? theme.primary : theme.border,
                                            backgroundColor: status === s ? `${theme.primary}10` : 'transparent'
                                        }
                                    ]}
                                    onPress={() => setStatus(s)}
                                >
                                    <Text style={[
                                        styles.statusText,
                                        { color: status === s ? theme.primary : theme.textSecondary }
                                    ]}>{s}</Text>
                                    {status === s && <Check size={16} color={theme.primary} />}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Notes</Text>
                        <TextInput
                            style={[styles.notesInput, {
                                color: theme.text,
                                borderColor: theme.border,
                                backgroundColor: theme.background
                            }]}
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Add notes..."
                            placeholderTextColor={theme.textSecondary}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </ScrollView>

                    <View style={[styles.footer, { borderTopColor: theme.border }]}>
                        <TouchableOpacity
                            style={[styles.cancelButton, { borderColor: theme.border }]}
                            onPress={onClose}
                        >
                            <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, { backgroundColor: theme.primary }]}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.saveText}>Save</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 24,
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        uppercase: 'uppercase',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    statusContainer: {
        gap: 8,
    },
    statusOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
    },
    notesInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        height: 120,
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
    },
    cancelButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    saveButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        fontWeight: '600',
        fontSize: 16,
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default EditApplicationModal;
