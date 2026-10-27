import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreProvider } from '@/data/store';
import { fontAssets, ThemeProvider, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

const modal = { presentation: 'transparentModal', animation: 'fade' } as const;

function Root() {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.back }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', overflow: 'hidden' }}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.back } }}>
          <Stack.Screen name="filter" options={modal} />
          <Stack.Screen name="order/cancel" options={modal} />
          <Stack.Screen name="guard/alarm" options={modal} />
        </Stack>
      </View>
    </View>
  );
}

export default function Layout() {
  const [loaded, error] = useFonts(fontAssets);
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StoreProvider>
            <Root />
          </StoreProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
