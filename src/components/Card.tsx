import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

import { Glass } from './Glass';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Glass card: radius-lg 24, padding 20, gap 14. */
export function Card({ children, style, gap = 14, pad = 20, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; gap?: number; pad?: number; onPress?: () => void }) {
  const body = <Glass style={[{ borderRadius: 24, padding: pad, gap }, style]}>{children}</Glass>;
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}

export function Divider() {
  const { c } = useTheme();
  return <View style={{ height: 1, backgroundColor: c.divider }} />;
}

/** Label / value row inside a card. */
export function Row({ label, value, sub, bold = true }: { label: string; value: ReactNode; sub?: string; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 24 }}>
      <View style={{ flexShrink: 1 }}>
        <Text variant="body" color="textPrimary" size={15}>{label}</Text>
        {sub ? <Text variant="bodySm" color="textBody" size={13}>{sub}</Text> : null}
      </View>
      {typeof value === 'string' ? <Text variant="body" weight={bold ? 600 : 400} size={15} align="right" style={{ flexShrink: 1 }}>{value}</Text> : value}
    </View>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text variant="title2" accessibilityRole="header">{title}</Text>
      {action ? <TextLink label={action} onPress={onAction} /> : null}
    </View>
  );
}

export function TextLink({ label, onPress, color = 'primary' }: { label: string; onPress?: () => void; color?: string }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" hitSlop={8}>
      <Text variant="bodySm" weight={600} color={color} style={{ textDecorationLine: 'underline' }}>{label}</Text>
    </Pressable>
  );
}
