import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

import { blur, useTheme } from '@/theme';

type Props = { children?: ReactNode; style?: StyleProp<ViewStyle>; strong?: boolean; border?: boolean };

/** Glass surface: translucent white + backdrop blur 24 + 1px light edge. `strong` for sheets and bars that hold text. */
export function Glass({ children, style, strong, border = true }: Props) {
  const { c } = useTheme();
  const bg = strong ? 'rgba(255, 255, 255, 0.82)' : c.glass;
  const edge = border ? { borderWidth: 1, borderColor: c.glassStroke } : null;
  if (Platform.OS === 'web') {
    const webBlur = { backdropFilter: `blur(${blur.blurGlass}px) saturate(160%)`, WebkitBackdropFilter: `blur(${blur.blurGlass}px) saturate(160%)` } as object;
    return <View style={[{ backgroundColor: bg, overflow: 'hidden' }, edge, webBlur, style]}>{children}</View>;
  }
  return (
    <BlurView intensity={40} tint="light" style={[{ backgroundColor: bg, overflow: 'hidden' }, edge, style]}>
      {children}
    </BlurView>
  );
}
