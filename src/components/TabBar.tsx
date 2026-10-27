import { router, type Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { shadows, useTheme } from '@/theme';

import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const meta: Record<string, { icon: IconName; label: string }> = {
  home: { icon: 'home', label: 'Главная' },
  orders: { icon: 'orders', label: 'Заказы' },
  chats: { icon: 'message', label: 'Сообщения' },
  profile: { icon: 'user', label: 'Профиль' },
  requests: { icon: 'orders', label: 'Заявки' },
  calendar: { icon: 'calendar', label: 'Календарь' },
  payouts: { icon: 'wallet', label: 'Выплаты' },
  cabinet: { icon: 'user', label: 'Профиль' },
};

/** Floating glass tab bar, 66 tall, 20 from the edges. Active = carbon, icons stay stroke. */
export function TabBar({ state, navigation, live }: TabBarProps & { live?: boolean }) {
  const routes = state.routes.filter((r) => meta[r.name]);
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 10;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      <View style={{ width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: bottom, gap: 12 }}>
        {live ? <LivePill /> : null}
        <Glass style={{ height: 66, borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, boxShadow: shadows.shadowFloat, backgroundColor: 'rgba(255,255,255,0.6)' }}>
          {routes.map((r) => {
            const on = state.routes[state.index]?.key === r.key;
            const m = meta[r.name] ?? { icon: 'home' as IconName, label: r.name };
            return (
              <Pressable key={r.key} onPress={() => navigation.navigate(r.name)} accessibilityRole="tab" accessibilityState={{ selected: on }} accessibilityLabel={m.label} style={{ flex: 1, alignItems: 'center', gap: 2 }}>
                <Icon name={m.icon} size={24} color={on ? 'carbon' : 'textMuted'} />
                <Text variant="caption" size={11} weight={on ? 600 : 500} color={on ? 'carbon' : 'textMuted'}>{m.label}</Text>
              </Pressable>
            );
          })}
        </Glass>
      </View>
    </View>
  );
}

/** "На посту" pill above the tab bar while guarding is in progress. */
export function LivePill() {
  const { c } = useTheme();
  return (
    <Pressable onPress={() => router.push('/guard/live')} accessibilityRole="button" accessibilityLabel="Охрана на посту, открыть">
      <View style={{ height: 50, borderRadius: 18, backgroundColor: c.signal, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, boxShadow: shadows.shadowSignal }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.carbon }} />
        <Text variant="bodySm" weight={600} color="carbon" numberOfLines={1} style={{ flex: 1 }}>На посту · БЦ «Нурлы Тау»</Text>
        <Text variant="number" size={14} color="carbon">05:42:10</Text>
        <Icon name="chevron-right" size={18} color="carbon" />
      </View>
    </Pressable>
  );
}
