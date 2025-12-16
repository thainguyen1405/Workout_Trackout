import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from '../../constants/theme';

const ForgotPassword = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.formContainer}>
                <Link href="/auth/sign-in" asChild>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                        <Text style={styles.backButtonText}>Back to sign in</Text>
                    </TouchableOpacity>
                </Link>

                <View style={styles.iconContainer}>
                    <Ionicons name="mail-outline" size={48} color="#BDBDBD" />
                </View>

                <Text style={styles.title}>
                    Check your email
                </Text>
                <Text style={styles.subtitle}>
                    We've sent password reset instructions to your email.
                </Text>   

                <View style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>
                        Please check your email for the password reset link. It may take a few minutes to arrive.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 25,
        gap: 15, 
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        marginBottom: 200,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    backButtonText: {
        ...FONTS.body,
        color: COLORS.primary,
        fontSize: 16,
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45, // Half of width/height to make a perfect circle
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Center the circle within the form container
        marginBottom: 20, // Add some space below the icon
    },
    title: {
        ...FONTS.h1,
        color: COLORS.primary,
        textAlign: 'center',
    },
    subtitle: {
    ...FONTS.h2,
    color: COLORS.secondary,
    textAlign: 'center',
    },
    confirmButton: {
        width: '100%',
        backgroundColor: '#D9FFDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 36,
        marginTop: 10,
        borderColor: '#07AB10',
        borderWidth: 1,
    },
    confirmButtonText: { 
        color: '#115E8F', 
        ...FONTS.body,
        textAlign: 'center',
    },
});