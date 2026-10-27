import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { markXml, wordmarkWidth, wordmarkXml } from '@/icons/brand';
import { useTheme } from '@/theme';

/** Qalqan mark: a shield with the Q (search loupe) cut through. */
export function Mark({ size = 32, color }: { size?: number; color?: string }) {
  const { c } = useTheme();
  return (
    <View accessibilityLabel="Qalqan" style={{ width: size, height: size }}>
      <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${markXml.replace('id="qm"', `id="qm${size}"`).replace('url(#qm)', `url(#qm${size})`)}</svg>`} width={size} height={size} color={color ?? c.primary} />
    </View>
  );
}

/** QALQAN wordmark, drawn from strokes (not a font). */
export function Wordmark({ height = 20, color }: { height?: number; color?: string }) {
  const { c } = useTheme();
  const w = (wordmarkWidth * height) / 40;
  return <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 ${wordmarkWidth} 42">${wordmarkXml}</svg>`} width={w} height={height} color={color ?? c.primaryDeep} />;
}

export function Lockup({ height = 28, light }: { height?: number; light?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: height * 0.3 }}>
      <Mark size={height} color={light ? '#FFFFFF' : undefined} />
      <Wordmark height={height * 0.58} color={light ? '#FFFFFF' : undefined} />
    </View>
  );
}
