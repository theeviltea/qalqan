import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Card, Chip, Icon, Screen, Timeline } from '@/components';
import { journal } from '@/data/mock';
import { useTheme } from '@/theme';

export default function Journal() {
  const { c } = useTheme();
  const [f, setF] = useState(0);
  const filters = ['Все', 'Обходы', 'Замечания', 'Фото'];
  const list = f === 1 ? journal.filter((e) => e.title.startsWith('Обход')) : f === 2 ? journal.filter((e) => e.sub.includes('—') || e.title.includes('без')) : journal;
  return (
    <Screen title="Журнал дежурства" subtitle="Заявка № 1042 · 28 октября">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {filters.map((x, i) => <Chip key={x} label={x} selected={f === i} onPress={() => setF(i)} />)}
      </ScrollView>
      <Card>
        {f === 3 ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1].map((i) => <View key={i} style={{ width: 96, height: 72, borderRadius: 12, backgroundColor: c.backDarker, alignItems: 'center', justifyContent: 'center' }}><Icon name="image" size={22} color="textBody" /></View>)}
          </View>
        ) : <Timeline events={list} />}
      </Card>
    </Screen>
  );
}
