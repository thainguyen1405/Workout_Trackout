import { Ionicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from '../../api/auth';
import { COLORS, FONT_FAMILIES } from '../../constants/theme';

const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
      // Input validation
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter your email');
        return;
      }
      
      if (!password.trim()) {
        Alert.alert('Error', 'Please enter your password');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      // Call API
      setLoading(true);
      try {
        const response = await login({ email: email.trim(), password });
        Alert.alert('Success', `Welcome back, ${response.user.email}!`);
        router.replace('/home/dashboard');
      } catch (error: any) {
        Alert.alert('Login Failed', error.message || 'Invalid email or password');
      } finally {
        setLoading(false);
      }
    };

    return(
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>
              Welcome to Workout Trackout
          </Text>
          <Text style={styles.subtitle}>
            Sign in to continue
          </Text>
          <TouchableOpacity
            style={styles.GoogleButton}
            onPress={() => {}}
          >
            <Ionicons name="logo-google" size={20} color="#FFFFFF" style={{marginRight: 8}} />
            <Text style={styles.defaultButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
            <Text style={styles.label}>
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
            <Text style={styles.label}>
                Password
            </Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="***********"
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
            <TouchableOpacity 
              style={[styles.SignInButton, loading && styles.buttonDisabled]} 
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.defaultButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
            <Link href="/auth/forgot-password">
              <Text style={styles.linkText}>Forgot password?</Text>
            </Link>
            <Text style={styles.footerText}>
                Don't have an account? {''}
                <Link href="/auth/sign-up">
                  <Text style={styles.linkTextUnderline}>Sign Up</Text>
                </Link>
            </Text>
        </View>
      </View>
    )
}

export default SignIn;

// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 160,
    marginBottom: 120,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    fontFamily: FONT_FAMILIES.regular,
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  GoogleButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  formSection: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: '#000000',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  inputUser: {
    height: 55,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#000',
    backgroundColor: '#FFFFFF',
  },  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  inputPassword: {
    height: 55,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
  },  SignInButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  defaultButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILIES.regular,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  linkText: {
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: '#000000',
    marginBottom: 32,
  },
  footerText: {
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: '#000000',
  },
  linkTextUnderline: {
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.primary,
  },
});
