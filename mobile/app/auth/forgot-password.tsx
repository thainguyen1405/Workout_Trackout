import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

                <Text style={styles.title}>
                    Password Reset
                </Text>
                <Text style={styles.subtitle}>
                    Enter your email and we'll send you a link to reset your password.
                </Text>   

                <Text style={styles.label} className = "mt-2">
                    Email
                </Text>
                <TextInput
                    style={styles.inputUser}
                    placeholder="username@domain.com"
                    placeholderTextColor="#9E9E9E"
                />

                <Link href="/auth/reset-link" asChild>
                    <TouchableOpacity style={styles.accountButton}>
                        <Text style={styles.defaultButtonText}>
                            Send Reset Link
                        </Text>
                    </TouchableOpacity>
                </Link>
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
    label: {
        ...FONTS.h3,
        color: COLORS.primary,
        textAlign: 'center',
    },
    inputUser: {
        height: 55,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
    },
    accountButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    defaultButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
});