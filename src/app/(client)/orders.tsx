import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Card, LogoTile, Screen, Segmented, StatusChip, Text } from '@/components';
import { agencyById, orders, pastOrders } from '@/data/mock';
import { useStore } from '@/data/store';

type O = (typeof orders)[number];
function OrderCard({ o, cancelled }: { o: O; cancelled?: boolean }) {
  const a = agencyById(o.agency);
  return (
    <Card gap={10} pad={16} onPress={() => router.push(o.href as never)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {cancelled ? <StatusChip label="Отменена" kind="err" /> : <StatusChip label={o.status} kind={o.kind} />}
        <Text variant="bodySm" size={13} color="textBody">№ {o.id}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <LogoTile initials={a.initials} size={44} radius={12} />
        <View style={{ flex: 1 }}>
          <Text variant="title3">{o.title}</Text>
          <Text variant="bodySm" color="textBody">{a.name} · {o.when}</Text>
        </View>
        <Text variant="title3" size={15}>{o.sum}</Text>
      </View>
    </Card>
  );
}

export default function Orders() {
  const { cancelled } = useStore();
  const [tab, setTab] = useState(0);
  const active = orders.filter((o) => !cancelled.includes(o.id));
  const history = [...orders.filter((o) => cancelled.includes(o.id)), ...pastOrders];
  return (
    <Screen tabs heading="Заказы">
      <Segmented options={[`Активные · ${active.length}`, 'История']} value={tab} onChange={setTab} />
      {tab === 0 ? (
        <>
          {active.map((o) => <OrderCard key={o.id} o={o} />)}
          <Text variant="bodySm" weight={600} color="textBody" style={{ paddingTop: 8, paddingHorizontal: 4 }}>Недавно завершены</Text>
          <OrderCard o={pastOrders[0]} />
        </>
      ) : history.map((o) => <OrderCard key={o.id} o={o} cancelled={cancelled.includes(o.id)} />)}
    </Screen>
  );
}
