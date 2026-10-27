import { Platform, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

/** Soft light spots behind the content (blur-orb 70, opacity 0.06–0.14). They tint the glass and stay quiet. */
export function Orbs() {
  const { c } = useTheme();
  const blurStyle = (Platform.OS === 'web' ? { filter: 'blur(70px)' } : {}) as object;
  const orbs = [
    { left: -120, top: -140, size: 360, color: '#2F55FF', o: 0.14 },
    { right: -120, top: -60, size: 320, color: c.violet, o: 0.11 },
    { right: -100, top: 380, size: 260, color: c.indigo, o: 0.06 },
    { left: -140, top: 590, size: 300, color: '#5B8CFF', o: 0.07 },
  ];
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {orbs.map((o, i) => (
        <View key={i} style={[{ position: 'absolute', left: o.left, right: o.right, top: o.top, width: o.size, height: o.size, borderRadius: o.size / 2, backgroundColor: o.color, opacity: Platform.OS === 'web' ? o.o : o.o * 0.6 }, blurStyle]} />
      ))}
    </View>
  );
}
