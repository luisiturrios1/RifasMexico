import { useAnalytics } from '@/hooks/useAnalytics';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFcmToken } from '@/hooks/useFcmToken';
import { useNotificationObserver } from '@/hooks/useNotificationObserver';
import { useNotifications } from '@/hooks/useNotifications';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as Notifications from "expo-notifications";
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function Bootstrap() {
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useAnalytics();
  useFcmToken();
  useNotifications(10000);
  useNotificationObserver();

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
