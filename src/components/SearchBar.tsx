import { router } from 'expo-router';
import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Glass } from './Glass';
import { Icon } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Search row: glass field + filter button (signal yellow with a count when filters are set). */
export function SearchBar({ count = 0 }: { count?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Pressable style={{ flex: 1 }} onPress={() => router.push('/search')} accessibilityRole="search" accessibilityLabel="Поиск агентств">
        <Glass style={{ height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }}>
          <Icon name="search" size={20} color="textBody" />
          <Text variant="body" color="textMuted" numberOfLines={1}>Агентство, услуга или район</Text>
        </Glass>
      </Pressable>
      <Pressable onPress={() => router.push('/filter')} accessibilityRole="button" accessibilityLabel={count ? `Фильтры, выбрано ${count}` : 'Фильтры'}>
        {count ? (
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: c.signal, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="filter" size={22} color="carbon" />
            <View style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: c.carbon, alignItems: 'center', justifyContent: 'center' }}><Text variant="caption" size={11} weight={700} color="onCarbon">{count}</Text></View>
          </View>
        ) : (
          <Glass style={{ width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Icon name="filter" size={22} /></Glass>
        )}
      </Pressable>
    </View>
  );
}

