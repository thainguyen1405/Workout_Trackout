import { Montserrat_400Regular, Montserrat_700Bold, useFonts as useMontserratFonts } from '@expo-google-fonts/montserrat';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [fontsLoaded, fontError] = useMontserratFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    // Hide the splash screen once the fonts are loaded (or if there's an error)
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render anything until the fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the main app navigation
  return (
    <SafeAreaProvider>
      <Stack>
         {/* Add this to hide the header for the entire auth group */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        {/* You can also hide the header for your index screen if you want */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}

export default RootLayout;