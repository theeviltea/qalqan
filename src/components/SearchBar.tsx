import { router } from 'expo-router';
import { View } from 'react-native';

import { Glass } from './Glass';
import { Gradient } from './Gradient';
import { Icon } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Search row: glass field + filter button (gradient with a count when filters are set). */
export function SearchBar({ count = 0 }: { count?: number }) {
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
          <Gradient style={{ width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="filter" size={22} color="onPrimary" />
            <View style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}><Text variant="caption" size={11} weight={700} color="primary">{count}</Text></View>
          </Gradient>
        ) : (
          <Glass style={{ width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Icon name="filter" size={22} /></Glass>
        )}
      </Pressable>
    </View>
  );
}

