import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Field, Footer, Screen, Segmented, Select, Stepper, Text } from '@/components';
import { services, tenge } from '@/data/mock';
import { useStore } from '@/data/store';

const dates = ['Вторник, 28 октября', 'Среда, 29 октября', 'Четверг, 30 октября'];
const starts = ['08:00', '09:00', '20:00'];
const ends = ['20:00', '18:00', '08:00'];

export default function OrderDetails() {
  const { order, setOrder } = useStore();
  const [d, setD] = useState(0);
  const [t, setT] = useState(0);
  const s = services[order.service];
  const hours = 12;
  const total = s.price * hours * order.posts;
  return (
    <>
      <Screen title="Заказ охраны" subtitle="Барыс Охрана" steps={{ step: 2 }} heading="Когда и сколько постов?" contentStyle={{ paddingBottom: 200 }}>
        <Card>
          <Text variant="bodySm" weight={500} color="textBody">Режим</Text>
          <Segmented options={['Разово', 'Каждый день', 'По графику']} value={order.mode} onChange={(m) => setOrder({ mode: m })} />
          <Select label="Дата" value={dates[d]} icon="calendar" onSurface onPress={() => setD((d + 1) % dates.length)} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Select label="Начало" value={starts[t]} icon="clock" onSurface onPress={() => setT((t + 1) % starts.length)} />
            <Select label="Конец" value={ends[t]} icon="clock" onSurface onPress={() => setT((t + 1) % starts.length)} />
          </View>
        </Card>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text variant="title3">Число постов</Text>
              <Text variant="bodySm" size={13} color="textBody">1 пост = 1 охранник на смену</Text>
            </View>
            <Stepper value={order.posts} onChange={(p) => setOrder({ posts: p })} />
          </View>
        </Card>
        <Card>
          <Field label="Пожелания агентству" onSurface multiline value={order.comment} onChangeText={(v) => setOrder({ comment: v })} />
        </Card>
      </Screen>
      <Footer note={<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}><Text variant="bodySm" color="textBody">{order.posts} {order.posts === 1 ? 'пост' : 'поста'} × {hours} ч × {tenge(s.price)}</Text><Text variant="number" size={22}>{tenge(total)}</Text></View>}>
        <Button label="К оплате" style={{ flex: 1 }} onPress={() => router.push('/order/payment')} />
      </Footer>
    </>
  );
}
