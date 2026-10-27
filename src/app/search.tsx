import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { AgencyCard, Chip, Glass, Icon, Pressable, Screen, Text } from '@/components';
import { agencies } from '@/data/mock';
import { fontFamily, useTheme } from '@/theme';

export default function Search() {
  const { c } = useTheme();
  const [q, setQ] = useState('');
  const [verified, setVerified] = useState(true);
  const [sort, setSort] = useState(true);
  let list = agencies.filter((a) => (!verified || a.verified) && (a.name + a.tagline).toLowerCase().includes(q.toLowerCase()));
  if (sort) list = [...list].sort((a, b) => b.rating.localeCompare(a.rating));
  return (
    <Screen title="Охрана офиса">
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Glass style={{ flex: 1, height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }}>
          <Icon name="search" size={20} color="textBody" />
          <TextInput value={q} onChangeText={setQ} placeholder="Агентство, услуга или район" placeholderTextColor={c.textMuted} accessibilityLabel="Поиск" style={{ flex: 1, fontFamily: fontFamily('sans'), fontSize: 16, color: c.textHeadline, outlineStyle: 'none' } as object} />
        </Glass>
        <Pressable onPress={() => router.push('/filter')} accessibilityRole="button" accessibilityLabel="Фильтры, выбрано 2">
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: c.signal, alignItems: 'center', justifyContent: 'center' }}><Icon name="filter" size={22} color="carbon" /></View>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        <Chip label="По рейтингу" icon="chevron-down" tone="signal" selected={sort} onPress={() => setSort(!sort)} />
        <Chip label="Проверенные" tone="signal" selected={verified} onPress={() => setVerified(!verified)} />
        <Chip label="Цена" />
        <Chip label="Есть ГБР" />
      </ScrollView>
      <Text variant="bodySm" color="textBody" style={{ paddingHorizontal: 4 }}>Найдено {list.length} в Алматы</Text>
      {list.map((a) => <AgencyCard key={a.id} agency={a} onPress={() => router.push(`/agency/${a.id}`)} />)}
      {list.length === 0 ? <Text variant="body" color="textBody" align="center" style={{ paddingVertical: 40 }}>Ничего не нашли. Попробуйте другой запрос или снимите фильтры.</Text> : null}
    </Screen>
  );
}
