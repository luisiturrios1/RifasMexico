import { useColorScheme } from '@/hooks/useColorScheme';
import analytics from '@react-native-firebase/analytics';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// @tanstack/react-query
const queryClient = new QueryClient();

export default function RootLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const logScreenView = async () => {
      await analytics().logScreenView({
        screen_name: pathname,
        screen_class: pathname,
      });
    };
    logScreenView();
  }, [pathname, params]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: "Rifas", headerShown: false }} />
          <Stack.Screen name="rifa/index" options={{ title: "Rifa" }} />
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
