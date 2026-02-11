import { StyleSheet, Text, View } from 'react-native';

const MobileAdBanner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.text}>Ad Banner Space</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#f1f5f9',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    banner: {
        width: 320,
        height: 50,
        backgroundColor: '#cbd5e1',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#94a3b8',
        borderStyle: 'dashed',
    },
    text: {
        color: '#64748b',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default MobileAdBanner;
