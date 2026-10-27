import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Icon, type IconName } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Settings-style row: icon tile, title, optional subtitle, chevron. */
export function MenuRow({ icon, title, sub, onPress }: { icon: IconName; title: string; sub?: string; onPress?: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 48 }}>
      <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} /></View>
      <View style={{ flex: 1 }}>
        <Text variant="body" weight={500}>{title}</Text>
        {sub ? <Text variant="bodySm" size={13} color="textBody">{sub}</Text> : null}
      </View>
      <Icon name="chevron-right" size={18} color="textBody" />
    </Pressable>
  );
}

