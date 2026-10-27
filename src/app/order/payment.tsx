import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Divider, Icon, Pressable, Radio, Row, Screen, Text, type IconName } from '@/components';
import { services, tenge } from '@/data/mock';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

const methods: [IconName, string, string][] = [
  ['phone-app', 'Kaspi.kz', 'Оплата в приложении Kaspi'],
  ['card', 'Банковская карта', 'Visa ··4821'],
  ['invoice', 'Счёт для юрлица', 'Оплата по реквизитам, закрывающие документы'],
];

export default function Payment() {
  const { c } = useTheme();
  const { order, setOrder } = useStore();
  const s = services[order.service];
  const total = tenge(s.price * 12 * order.posts);
  return (
    <Screen title="Заказ охраны" subtitle="Барыс Охрана" steps={{ step: 3 }} heading="Оплата" footer={<Button label={`Оплатить ${total}`} style={{ flex: 1 }} onPress={() => router.replace('/order/sent')} />}>
      <Card>
        <Row label={s.name} value={`${order.posts} ${order.posts === 1 ? 'пост' : 'поста'}`} />
        <Row label="28 октября" value="08:00—20:00" />
        <Row label="Объект" value="БЦ «Нурлы Тау»" />
        <Divider />
        <Row label="Стоимость охраны" value={total} />
        <Row label="Сервисный сбор" value="[YOUR FEE] ₸" bold={false} />
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text variant="title3">Итого</Text>
          <Text variant="number">{total}</Text>
        </View>
      </Card>
      <Card gap={8}>
        {methods.map(([icon, t, d], i) => (
          <View key={t} style={{ gap: 8 }}>
            {i ? <Divider /> : null}
            <Pressable onPress={() => setOrder({ pay: i })} accessibilityRole="radio" accessibilityState={{ checked: order.pay === i }} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 48 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={22} /></View>
              <View style={{ flex: 1 }}>
                <Text variant="title3">{t}</Text>
                <Text variant="bodySm" size={13} color="textBody">{d}</Text>
              </View>
              <Radio on={order.pay === i} />
            </Pressable>
          </View>
        ))}
      </Card>
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 4 }}>
        <Icon name="lock" size={18} color="textBody" />
        <Text variant="bodySm" size={13} color="textBody" style={{ flex: 1 }}>Деньги резервируются и списываются после того, как агентство отметит завершение смены.</Text>
      </View>
    </Screen>
  );
}
