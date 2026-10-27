import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Icon, ReviewItem, Screen, Stars, Text } from '@/components';
import { agencyById, reviews } from '@/data/mock';
import { useTheme } from '@/theme';

export default function Reviews() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = agencyById(id);
  const bars = [88, 9, 2, 1, 0];
  const tags = [['Пунктуальность', 86], ['Вежливость', 71], ['Быстрый отклик', 54], ['Отчёты', 40]] as const;
  return (
    <Screen title="Отзывы" subtitle={a.name} footer={<Button label="Оставить отзыв" style={{ flex: 1 }} onPress={() => router.push('/review')} />}>
      <Card>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <View>
            <Text variant="display" size={44}>{a.rating}</Text>
            <Stars value={5} />
            <Text variant="bodySm" size={13} color="textBody" style={{ marginTop: 4 }}>{a.reviews} отзывов</Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            {bars.map((p, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text variant="caption" color="textBody" style={{ width: 10 }}>{5 - i}</Text>
                <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: c.backDarker }}><View style={{ width: `${p}%`, height: 6, borderRadius: 3, backgroundColor: c.primary }} /></View>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {tags.map(([t, n]) => (
            <View key={t} style={{ height: 32, borderRadius: 10, backgroundColor: c.back, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text variant="bodySm" size={13} weight={500}>{t}</Text>
              <Text variant="bodySm" size={13} color="textBody">{n}</Text>
            </View>
          ))}
        </View>
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, paddingTop: 8 }}>
        <Text variant="title3" size={15}>Сначала новые</Text>
        <Icon name="chevron-down" size={18} />
      </View>
      {reviews.map((r) => <Card key={r.name}><ReviewItem r={r} /></Card>)}
    </Screen>
  );
}
