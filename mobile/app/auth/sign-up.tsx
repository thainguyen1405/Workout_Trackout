import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { register } from '../../api/auth';
import { COLORS, FONT_FAMILIES, FONTS } from '../../constants/theme';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        // Validation
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Error', 'Please enter a password');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        // Call API
        setLoading(true);
        try {
            const response = await register({ email: email.trim(), password });
            Alert.alert('Success', `Account created for ${response.user.email}!`);
            router.push("/auth/verify-email");
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'Unable to create account');
        } finally {
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.formContainer}>
                <Link href="/auth/sign-in" asChild>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={'#000000'} />
                        <Text style={styles.backButtonText}>Back to sign in</Text>
                    </TouchableOpacity>
                </Link>

                <Text style={styles.title}>
                    Create your account
                </Text>

                <Text style={styles.label} className = "mt-2">
                    Email
                </Text>
                <TextInput
                    style={styles.inputUser}
                    placeholder="username@domain.com"
                    placeholderTextColor="#9E9E9E"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                />

                <Text style={styles.label} className = "mt-2">
                    Password
                </Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Min. 8 characters"
                        placeholderTextColor="#9E9E9E"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading}
                    />
                    {/* Eye Icon toggle */}
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="#666666"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label} className = "mt-2">
                    Confirm Password
                </Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Re-enter password"
                        placeholderTextColor="#9E9E9E"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        editable={!loading}
                    />
                    {/* Eye Icon toggle */}
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="#666666"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.accountButton, loading && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.defaultButtonText}>Create account</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SignUp;

// CSS Styles
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
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    backButtonText: {
        ...FONTS.body,
        color: '#000000',
        fontSize: 16,
    },
    title: {
        ...FONTS.h1,
        fontFamily: FONT_FAMILIES.regular,
        color: '#000000',
        textAlign: 'center',
    },
    label: {
        ...FONTS.h3,
        fontFamily: FONT_FAMILIES.regular,
        color: '#000000',
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
        fontFamily: FONT_FAMILIES.regular,
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    inputPassword: {
        height: 55,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingRight: 50,
        fontSize: 16,
        color: '#000',
        fontFamily: FONT_FAMILIES.regular,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 15,
    },
    accountButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.8,
    },
    defaultButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FONT_FAMILIES.regular,
    },
});