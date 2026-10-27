import { router } from 'expo-router';
import { View } from 'react-native';

import { Card, Divider, Glass, Gradient, Icon, IconButton, LogoTile, Pressable, Screen, SectionTitle, StatusChip, Text } from '@/components';
import { requests } from '@/data/mock';
import { useStore } from '@/data/store';
import { shadows } from '@/theme';

function Stat({ v, l, hl }: { v: string; l: string; hl?: boolean }) {
  const inner = (
    <View style={{ padding: 14, gap: 2 }}>
      <Text variant="number" color={hl ? 'onPrimary' : 'textHeadline'}>{v}</Text>
      <Text variant="bodySm" size={13} color={hl ? '#D3DEFA' : 'textBody'}>{l}</Text>
    </View>
  );
  return hl ? <Gradient style={{ flex: 1, borderRadius: 24, boxShadow: shadows.shadowGlow }}>{inner}</Gradient> : <Glass style={{ flex: 1, borderRadius: 24 }}>{inner}</Glass>;
}

export default function Requests() {
  const { requestsDone } = useStore();
  const fresh = requests.filter((r) => !requestsDone[r.id]);
  return (
    <Screen tabs>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <LogoTile initials="БО" size={40} radius={12} />
          <View><Text variant="bodySm" size={13} color="textBody">Кабинет агентства</Text><Text variant="title2">Барыс Охрана</Text></View>
        </View>
        <IconButton name="notification" label="Уведомления" />
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Stat v="6" l="на постах сейчас" hl />
        <Stat v={String(fresh.length)} l="новые заявки" />
        <Stat v="4,9" l="рейтинг" />
      </View>
      <Pressable onPress={() => router.push('/shift')} accessibilityRole="button" accessibilityLabel="Смена идёт: БЦ «Нурлы Тау»">
        <Gradient name="gradDeep" style={{ borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#8FB4FF' }} />
          <View style={{ flex: 1 }}>
            <Text variant="title3" size={15} color="onPrimary">БЦ «Нурлы Тау» · 2 поста</Text>
            <Text variant="bodySm" size={13} color="#B8C8F0">Смена идёт · осталось 05:42</Text>
          </View>
          <Icon name="chevron-right" size={20} color="onPrimary" />
        </Gradient>
      </Pressable>
      <SectionTitle title="Новые заявки" />
      {fresh.length === 0 ? <Text variant="body" color="textBody" align="center" style={{ paddingVertical: 24 }}>Новых заявок нет. Пришлём пуш, когда появятся.</Text> : null}
      {fresh.map((r) => (
        <Card key={r.id} pad={16} gap={10} onPress={() => router.push(`/request/${r.id}`)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <StatusChip label="Новая" kind="new" />
            <Text variant="bodySm" size={13} color="textBody">№ {r.id} · 5 мин назад</Text>
          </View>
          <View><Text variant="title3">{r.title}</Text><Text variant="bodySm" color="textBody">{r.who}</Text></View>
          <View style={{ gap: 4 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Icon name="calendar" size={16} color="textBody" /><Text variant="bodySm" color="textPrimary">{r.when}</Text></View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Icon name="location" size={16} color="textBody" /><Text variant="bodySm" color="textPrimary">{r.where}</Text></View>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="number" size={18}>{r.sum}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Text variant="bodySm" weight={600}>Открыть</Text><Icon name="chevron-right" size={18} /></View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}
