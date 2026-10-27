import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Card, Glass, Gradient, Icon, Pressable, Row, Screen, SectionTitle, Text, Timeline, Button, type IconName } from '@/components';
import { journal } from '@/data/mock';
import { shadows } from '@/theme';

import { useCountdown } from '@/data/useCountdown';

export default function Shift() {
  const time = useCountdown();
  const [events, setEvents] = useState(journal.slice(0, 2));
  const add = (title: string, sub: string) => setEvents([{ time: 'сейчас', title, sub }, ...events]);
  const act = (icon: IconName, t: string, onPress: () => void) => (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={t} style={{ flex: 1 }}>
      <Glass style={{ height: 88, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icon name={icon} size={26} />
        <Text variant="bodySm" weight={600}>{t}</Text>
      </Glass>
    </Pressable>
  );
  return (
    <Screen title="Смена" subtitle="Заявка № 1042 · БЦ «Нурлы Тау»" footer={<Button label="Завершить смену" style={{ flex: 1 }} onPress={() => router.push('/shift/done')} />} footerNote="Клиент получит отчёт и чек">
      <Gradient style={{ borderRadius: 24, padding: 18, gap: 4, boxShadow: shadows.shadowGlow }}>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#8FB4FF' }} /><Text variant="bodySm" size={13} weight={600} color="onPrimary">Пост принят в 08:00</Text></View>
        <Text variant="display" size={40} color="onPrimary">{time}</Text>
        <Text variant="bodySm" color="#D3DEFA">осталось · смена до 20:00</Text>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)', marginTop: 8 }}><View style={{ width: '52%', height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' }} /></View>
      </Gradient>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {act('route', 'Обход', () => add('Обход выполнен', 'Ерлан А. · замечаний нет'))}
        {act('alert', 'Замечание', () => add('Замечание', 'Тимур С. · дверь на парковку не закрывается'))}
        {act('camera', 'Фото', () => add('Фото в журнал', 'Ерлан А. · 2 фото'))}
      </View>
      <Card>
        <Row label="Посты" value="2 из 2 на месте" />
        <Row label="Пост 1" value="Ерлан А." />
        <Row label="Пост 2" value="Тимур С." />
        <Row label="Следующий обход" value="16:00" />
      </Card>
      <Card pad={14}>
        <SectionTitle title="Журнал" action="Весь" onAction={() => router.push('/guard/journal')} />
        <Timeline events={events.slice(0, 3)} />
      </Card>
    </Screen>
  );
}
