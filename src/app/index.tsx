import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';

import { Gradient, Mark, Text, Wordmark } from '@/components';

/** Splash: white mark + wordmark on grad-primary, then onboarding. */
export default function Splash() {
  useEffect(() => {
    const t = setTimeout(() => router.replace('/onboarding'), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <Pressable style={{ flex: 1 }} onPress={() => router.replace('/onboarding')} accessibilityLabel="Qalqan, продолжить">
      <Gradient style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <Mark size={112} color="#FFFFFF" />
        <Wordmark height={30} color="#FFFFFF" />
        <View style={{ position: 'absolute', bottom: 48 }}>
          <Text variant="bodySm" weight={500} color="onPrimary">Охрана, которой можно доверять</Text>
        </View>
      </Gradient>
    </Pressable>
  );
}
