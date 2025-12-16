import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT_FAMILIES, FONTS } from '../../constants/theme';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = [0, 1, 2, 3, 4, 5];

  const handleChange = (text: string, idx: number) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);
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
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>We've sent a 6 digit code to username@domain.com</Text>
        <View style={styles.codeInputRow}>
          {inputs.map((_, idx) => (
            <TextInput
              key={idx}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              value={code[idx]}
              onChangeText={text => handleChange(text, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </View>
        <Text style={styles.instructions}>Enter the verification code sent to your email</Text>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify email</Text>
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Didn't receive the code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

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
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    ...FONTS.body,
    color: '#000000',
    fontSize: 16,
  },
  title: {
    fontSize: 27,
    color: '#000000',
    textAlign: 'center',
    fontFamily: FONT_FAMILIES.regular,
  },
  subtitle: {
    ...FONTS.h3,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: FONT_FAMILIES.regular,
  },
  codeInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 10,
  },
  codeInput: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    backgroundColor: '#FAFAFA',
  },
  instructions: {
    ...FONTS.body,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: FONT_FAMILIES.regular,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    fontFamily: FONT_FAMILIES.regular,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT_FAMILIES.regular,
  },
  resendText: {
    color: '#000000',
    textAlign: 'center',
    marginTop: 12,
    fontFamily: FONT_FAMILIES.regular,
  },
  resendLink: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILIES.semiBold,
  },
});

