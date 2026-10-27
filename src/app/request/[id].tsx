import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Avatar, Button, Card, Checkbox, Divider, Footer, IconButton, Pressable, Row, Screen, SectionTitle, Text } from '@/components';
import { requests, staff } from '@/data/mock';
import { useStore } from '@/data/store';

export default function RequestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const r = requests.find((x) => x.id === id) ?? requests[0];
  const { resolveRequest } = useStore();
  const free = staff.filter((s) => s.free || s.kind === 'live').slice(0, 4);
  const [picked, setPicked] = useState([true, true, false, false]);
  const need = r.id === '1051' ? 4 : 1;
  const count = picked.filter(Boolean).length;
  return (
    <>
      <Screen title={`Заявка № ${r.id}`} subtitle="Получена 5 минут назад" contentStyle={{ paddingBottom: 200 }}>
        <Card>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar initials="АИ" size={44} />
            <View style={{ flex: 1 }}><Text variant="title3">{r.who.replace('Клиент: ', '')}</Text><Text variant="bodySm" size={13} color="textBody">Клиент с 2025 · 7 заказов</Text></View>
            <IconButton name="message" label="Написать клиенту" tone="input" onPress={() => router.push('/chat/barys')} />
          </View>
        </Card>
        <Card>
          <Row label="Услуга" value={r.title.split(' · ')[0]} />
          <Row label="Когда" value={r.when} />
          <Row label="Постов" value={String(need)} />
          <Row label="Объект" value={r.where} />
          <Divider />
          <Text variant="bodySm" color="textPrimary">Пожелания: корпоратив на 300 гостей, фейсконтроль по спискам, двое на входе и двое в зале.</Text>
        </Card>
        <Card>
          <SectionTitle title="Назначить охранников" action={`${count} из ${need}`} />
          {free.map((s, i) => (
            <Pressable key={s.name} onPress={() => setPicked(picked.map((v, k) => (k === i ? !v : v)))} accessibilityRole="checkbox" accessibilityState={{ checked: picked[i] }} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Avatar initials={s.initials} strong={picked[i]} />
              <View style={{ flex: 1 }}><Text variant="title3" size={15}>{s.name}</Text><Text variant="bodySm" size={13} color="textBody">свободен 15 нояб</Text></View>
              <Checkbox on={picked[i]} />
            </Pressable>
          ))}
        </Card>
      </Screen>
      <Footer note={<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}><Text variant="bodySm" color="textBody">Вы получите</Text><Text variant="number" size={22}>{r.sum}</Text></View>}>
        <Button label="Отклонить" variant="secondary" onPress={() => { resolveRequest(r.id, 'declined'); router.back(); }} />
        <Button label="Принять заявку" style={{ flex: 1 }} onPress={() => { resolveRequest(r.id, 'accepted'); router.replace('/shift'); }} />
      </Footer>
    </>
  );
}
