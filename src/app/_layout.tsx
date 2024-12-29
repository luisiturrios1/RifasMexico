import { useAnalytics } from '@/hooks/useAnalytics';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEvents } from '@/hooks/useEvents';
import { useFcmToken } from '@/hooks/useFcmToken';
import { useNotifications } from '@/hooks/useNotifications';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export default function Bootstrap() {
  useEvents();

  if (Constants.isHeadless) {
    return null;
  }
  return <RootLayout />
}


const RootLayout = () => {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useAnalytics();
  useFcmToken();
  useNotifications(10000);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: "Rifas", headerShown: false }} />
          <Stack.Screen name="rifa/[rifaId]" options={{ title: "Rifa" }} />
          <Stack.Screen name="rifa/modal" options={{
            title: "Calificar",
            presentation: "modal",
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
