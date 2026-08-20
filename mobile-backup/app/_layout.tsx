import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../src/theme';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from '../src/store/useSessionStore';
import { AuthUseCases } from '../src/application/authUseCases';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const { setSession, isAuthenticated } = useSessionStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await AuthUseCases.getSession();
        if (session) {
          setSession(session.user, session.profile);
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/welcome');
        }
      } catch (e) {
        router.replace('/(auth)/welcome');
      } finally {
        setIsReady(true);
      }
    };
    
    initializeAuth();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
    Manrope_600SemiBold, Manrope_700Bold,
    'Inter': Inter_400Regular,
    'Manrope': Manrope_700Bold,
  });

  if (!fontsLoaded || !isReady) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
        <Stack.Screen name="(auth)/welcome" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
