import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Avatar, Card, Chip, Divider, IconButton, Screen, StatusChip, Text } from '@/components';
import { staff } from '@/data/mock';

export default function Staff() {
  const [f, setF] = useState(0);
  const list = f === 1 ? staff.filter((s) => s.kind === 'live') : f === 2 ? staff.filter((s) => s.free) : staff;
  return (
    <Screen title="Сотрудники" subtitle="140 охранников" right={<IconButton name="add" label="Добавить сотрудника" />}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        <Chip label="Все · 140" selected={f === 0} onPress={() => setF(0)} />
        <Chip label="На смене · 12" selected={f === 1} onPress={() => setF(1)} />
        <Chip label="Свободны · 96" selected={f === 2} onPress={() => setF(2)} />
      </ScrollView>
      <Card>
        {list.map((s, i) => (
          <View key={s.name} style={{ gap: 14 }}>
            {i ? <Divider /> : null}
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Avatar initials={s.initials} size={44} strong={s.kind === 'live'} />
              <View style={{ flex: 1 }}><Text variant="title3">{s.name}</Text><Text variant="bodySm" size={13} color="textBody">{s.meta}</Text></View>
              <StatusChip label={s.status} kind={s.kind} />
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
