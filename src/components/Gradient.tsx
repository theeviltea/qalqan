import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { gradients, type GradientName } from '@/theme';

/** Fills a box with a design-system gradient (grad-primary, grad-deep, grad-soft). CSS angle → start/end points. */
export function Gradient({ name = 'gradPrimary', style, children }: { name?: GradientName; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  const g = gradients[name];
  const a = (g.angle * Math.PI) / 180;
  const x = Math.sin(a) / 2;
  const y = -Math.cos(a) / 2;
  return (
    <LinearGradient
      colors={g.colors as unknown as [string, string, ...string[]]}
      locations={g.locations as unknown as [number, number, ...number[]]}
      start={{ x: 0.5 - x, y: 0.5 - y }}
      end={{ x: 0.5 + x, y: 0.5 + y }}
      style={style}>
      {children}
    </LinearGradient>
  );
}
