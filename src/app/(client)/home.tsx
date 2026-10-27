import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { AgencyCard, Glass, Icon, IconButton, Pressable, Screen, SearchBar, SectionTitle, Text } from '@/components';
import { agencies } from '@/data/mock';
import { useStore } from '@/data/store';
import { shadows, useTheme } from '@/theme';

const cats = [
  { icon: 'building', label: 'Офис' },
  { icon: 'house', label: 'Дом' },
  { icon: 'event', label: 'Событие' },
  { icon: 'warehouse', label: 'Склад' },
  { icon: 'personal-guard', label: 'Личная' },
] as const;

export default function Home() {
  const { name } = useStore();
  const { c } = useTheme();
  return (
    <Screen tabs>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Icon name="location" size={16} color="textBody" /><Text variant="bodySm" color="textBody">Алматы</Text><Icon name="chevron-down" size={14} color="textBody" /></View>
          <Text variant="title1" numberOfLines={1}>Здравствуйте, {name || 'гость'}</Text>
        </View>
        <IconButton name="notification" label="Уведомления" onPress={() => router.push('/notifications')} />
      </View>
      <SearchBar />
      <SectionTitle title="Вид охраны" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 6 }}>
        {cats.map((cat) => (
          <Pressable key={cat.label} onPress={() => router.push('/search')} accessibilityRole="button" accessibilityLabel={cat.label} style={{ width: 76, alignItems: 'center', gap: 6 }}>
            <Glass style={{ width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}><Icon name={cat.icon} size={26} /></Glass>
            <Text variant="caption">{cat.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable onPress={() => router.push('/guard/live')} accessibilityRole="button" accessibilityLabel="Охрана офиса идёт, открыть">
        <View style={{ borderRadius: 24, backgroundColor: c.signal, boxShadow: shadows.shadowSignal, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: c.carbon, alignItems: 'center', justifyContent: 'center' }}><Icon name="shield-check" color="signal" /></View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text variant="title3" size={15}>Охрана офиса идёт</Text>
            <Text variant="bodySm" size={13} color="carbonSoft" numberOfLines={1}>Барыс Охрана · пост 1 · до 20:00</Text>
          </View>
          <Icon name="chevron-right" size={20} color="carbon" />
        </View>
      </Pressable>
      <SectionTitle title="Рядом с вами" action="Все" onAction={() => router.push('/search')} />
      {agencies.slice(0, 3).map((a) => <AgencyCard key={a.id} agency={a} onPress={() => router.push(`/agency/${a.id}`)} />)}
    </Screen>
  );
}
