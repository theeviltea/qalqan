import { View } from 'react-native';

import { useTheme, type Colors } from '@/theme';

import { Glass } from './Glass';
import { Gradient } from './Gradient';
import { Icon, type IconName } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Filter chip 40: selected = grad-primary, idle = glass. */
export function Chip({ label, selected, icon, onPress }: { label: string; selected?: boolean; icon?: IconName; onPress?: () => void }) {
  const fg: keyof Colors = selected ? 'onPrimary' : 'textHeadline';
  const inner = (
    <View style={{ height: 40, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {icon ? <Icon name={icon} size={18} color={fg} /> : null}
      <Text variant="bodySm" weight={500} color={fg}>{label}</Text>
    </View>
  );
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!selected }}>
      {selected ? <Gradient style={{ borderRadius: 12 }}>{inner}</Gradient> : <Glass style={{ borderRadius: 12, borderColor: 'rgba(255,255,255,0.85)' }}>{inner}</Glass>}
    </Pressable>
  );
}

export type StatusKind = 'wait' | 'ok' | 'err' | 'live' | 'plain' | 'new';

/** Status chip 26. Gradient only for live guarding (`live`) and new requests. */
export function StatusChip({ label, kind = 'wait' }: { label: string; kind?: StatusKind }) {
  const { c } = useTheme();
  const map: Record<StatusKind, { bg?: string; fg: keyof Colors; border?: string }> = {
    wait: { bg: c.back, fg: 'textBody' },
    ok: { bg: c.successBack, fg: 'successText' },
    err: { bg: c.dangerBack, fg: 'dangerText' },
    plain: { bg: 'rgba(255,255,255,0.7)', fg: 'textHeadline', border: c.stroke },
    live: { fg: 'onPrimary' },
    new: { fg: 'onPrimary' },
  };
  const m = map[kind];
  const inner = (
    <View style={{ height: 26, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {kind === 'live' ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.primaryLight }} /> : null}
      <Text variant="caption" weight={600} color={m.fg} numberOfLines={1}>{label}</Text>
    </View>
  );
  if (kind === 'live' || kind === 'new') return <Gradient style={{ borderRadius: 999, alignSelf: 'flex-start' }}>{inner}</Gradient>;
  return <View style={{ alignSelf: 'flex-start', borderRadius: 999, backgroundColor: m.bg, borderWidth: m.border ? 1 : 0, borderColor: m.border }}>{inner}</View>;
}
