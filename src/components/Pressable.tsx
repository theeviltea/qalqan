import { Pressable as RNPressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

type Props = Omit<PressableProps, 'style'> & { style?: StyleProp<ViewStyle> };

/** Pressable with a light press fade. */
export function Pressable({ style, disabled, ...rest }: Props) {
  return <RNPressable {...rest} disabled={disabled} style={({ pressed }) => [style, pressed && !disabled && { opacity: 0.82 }]} />;
}
