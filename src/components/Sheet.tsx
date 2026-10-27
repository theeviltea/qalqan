import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable as RNPressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { Glass } from './Glass';

/** Bottom sheet route: scrim + strong glass panel with a grabber. Tap the scrim to close. */
export function Sheet({ children, behind, full }: { children: ReactNode; behind?: ReactNode; full?: boolean }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: c.back }}>
      {behind}
      <RNPressable accessibilityLabel="Закрыть" onPress={() => router.back()} style={[StyleSheet.absoluteFill, { backgroundColor: c.scrim }]} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: full ? insets.top + 64 : undefined }}>
        <Glass strong border={false} style={{ flex: full ? 1 : undefined, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 10, paddingBottom: Math.max(insets.bottom, 20) + 14, gap: 16, width: '100%', maxWidth: 480, alignSelf: 'center' }}>
          <View style={{ alignItems: 'center' }}><View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: c.backDarker }} /></View>
          {children}
        </Glass>
      </View>
    </View>
  );
}
