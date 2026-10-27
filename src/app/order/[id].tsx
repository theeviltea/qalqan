import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Avatar, Button, Card, Divider, Gradient, IconButton, Pressable, Row, Screen, SectionTitle, StatusChip, Text, TextLink } from '@/components';
import { agencyById, orders } from '@/data/mock';
import { useStore } from '@/data/store';

export default function OrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cancelled } = useStore();
  const o = orders.find((x) => x.id === id) ?? orders[1];
  const a = agencyById(o.agency);
  const isCancelled = cancelled.includes(o.id);
  const waiting = o.kind === 'wait';
  const guard = (ini: string, n: string, m: string, strong?: boolean) => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Avatar initials={ini} size={44} strong={strong} />
      <View style={{ flex: 1 }}><Text variant="title3">{n}</Text><Text variant="bodySm" size={13} color="textBody">{m}</Text></View>
      <IconButton name="call" label={`Позвонить: ${n}`} tone="input" />
    </View>
  );
  return (
    <Screen title={`Заявка № ${o.id}`} subtitle={a.name} footer={<><Button label="Чат" icon="message" variant="secondary" onPress={() => router.push(`/chat/${a.id}`)} /><Button label="Позвонить" icon="call" style={{ flex: 1 }} /></>}>
      <Gradient name="gradDeep" style={{ borderRadius: 24, padding: 20, gap: 6 }}>
        <Text variant="bodySm" size={13} color="#C9D6F5">{isCancelled ? 'Отменена' : waiting ? 'Ждёт подтверждения агентства' : 'Подтверждена · начнётся через 4 дня'}</Text>
        <Text variant="title1" size={24} color="onPrimary">{o.when}</Text>
        <Text variant="bodySm" color="#C9D6F5">{o.title} · {waiting ? '4 поста' : '1 пост'}</Text>
      </Gradient>
      {waiting || isCancelled ? null : (
        <Card>
          <SectionTitle title="Охранники" />
          {guard('РК', 'Руслан Каримов', 'Дневная смена · стаж 4 года', true)}
          <Divider />
          {guard('ДС', 'Дмитрий Соколов', 'Ночная смена · стаж 9 лет')}
        </Card>
      )}
      <Card>
        <Row label="Услуга" value={o.title} />
        <Row label="Статус" value={<StatusChip label={isCancelled ? 'Отменена' : o.status} kind={isCancelled ? 'err' : o.kind} />} />
        <Row label="Стоимость" value={o.sum} />
        <Row label="Оплата" value={waiting ? 'Kaspi.kz' : 'Счёт для юрлица'} />
        <Row label="Договор" value={<TextLink label="Открыть PDF" />} />
      </Card>
      {isCancelled ? null : (
        <Pressable onPress={() => router.push(`/order/cancel?id=${o.id}`)} accessibilityRole="button" style={{ alignItems: 'center', padding: 8 }}>
          <Text variant="title3" size={15} color="dangerText">Отменить заявку</Text>
        </Pressable>
      )}
    </Screen>
  );
}
