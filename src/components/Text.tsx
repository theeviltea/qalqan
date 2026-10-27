import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { fontFamily, typeScale, useTheme, type Colors, type Weight } from '@/theme';

type Variant = keyof typeof typeScale;
type Props = TextProps & { variant?: Variant; weight?: Weight; color?: keyof Colors | (string & {}); align?: TextStyle['textAlign']; size?: number };

/** Typography from the Qalqan type scale: Geologica for display styles, Golos Text for the rest. */
export function Text({ variant = 'body', weight, color = 'textHeadline', align, size, style, ...rest }: Props) {
  const { c } = useTheme();
  const t = typeScale[variant];
  const w = (weight ?? t.fontWeight) as Weight;
  const col = color in c ? c[color as keyof Colors] : color;
  const fs = size ?? t.fontSize;
  return (
    <RNText
      {...rest}
      style={[{ fontFamily: fontFamily(t.family as 'sans' | 'display', w), fontSize: fs, lineHeight: size ? Math.round(size * 1.35) : t.lineHeight, color: col, textAlign: align }, style]}
    />
  );
}
