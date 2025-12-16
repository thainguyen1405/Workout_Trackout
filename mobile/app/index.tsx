import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignIn from "./auth/sign-in";
import "./global";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <SignIn />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
 safeAreaContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
});