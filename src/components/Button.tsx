import { View, type StyleProp, type ViewStyle } from 'react-native';

import { shadows, useTheme, type Colors } from '@/theme';

import { Glass } from './Glass';
import { Gradient } from './Gradient';
import { Icon, type IconName } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Props = { label: string; onPress?: () => void; variant?: ButtonVariant; icon?: IconName; disabled?: boolean; style?: StyleProp<ViewStyle>; height?: number };

/** Button 52: primary = grad-primary + shadow-glow, secondary = carbon, danger = solid red, ghost = text only. */
export function Button({ label, onPress, variant = 'primary', icon, disabled, style, height = 52 }: Props) {
  const { c } = useTheme();
  const fg: keyof Colors = disabled ? 'textMuted' : variant === 'primary' || variant === 'danger' ? 'onPrimary' : variant === 'secondary' ? 'onCarbon' : 'textHeadline';
  const content = (
    <View style={{ height, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 20 }}>
      {icon ? <Icon name={icon} size={20} color={fg} /> : null}
      <Text variant="button" color={fg} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
  let body = content;
  if (disabled) body = <View style={{ backgroundColor: 'rgba(222, 227, 236, 0.8)', borderRadius: 16 }}>{content}</View>;
  else if (variant === 'primary')
    body = (
      <View style={{ borderRadius: 16, boxShadow: shadows.shadowGlow }}>
        <Gradient style={{ borderRadius: 16 }}>{content}</Gradient>
      </View>
    );
  else if (variant === 'secondary') body = <View style={{ backgroundColor: c.carbon, borderRadius: 16 }}>{content}</View>;
  else if (variant === 'danger') body = <View style={{ backgroundColor: c.danger, borderRadius: 16 }}>{content}</View>;
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: !!disabled }} style={style}>
      {body}
    </Pressable>
  );
}

/** Square icon button 44: glass by default. */
export function IconButton({ name, label, onPress, tone = 'glass', size = 44 }: { name: IconName; label: string; onPress?: () => void; tone?: 'glass' | 'input' | 'onDark'; size?: number }) {
  const { c } = useTheme();
  const inner = <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}><Icon name={name} size={22} color={tone === 'onDark' ? '#FFFFFF' : 'textHeadline'} /></View>;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} hitSlop={4}>
      {tone === 'glass' ? <Glass style={{ borderRadius: 14 }}>{inner}</Glass> : <View style={{ borderRadius: 14, backgroundColor: tone === 'input' ? c.input : 'rgba(255,255,255,0.16)' }}>{inner}</View>}
    </Pressable>
  );
}
