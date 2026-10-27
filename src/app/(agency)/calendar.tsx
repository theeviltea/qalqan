import { useState } from 'react';
import { View } from 'react-native';

import { Card, Divider, IconButton, Pressable, Screen, StatusChip, Text, type StatusKind } from '@/components';
import { useTheme } from '@/theme';

const done = [1, 2, 6, 8, 9, 13, 15, 20, 22, 23];
const plan = [28, 29, 30];
const shifts: Record<number, [string, string, string, string, StatusKind][]> = {
  28: [
    ['08:00—20:00', 'БЦ «Нурлы Тау»', '2 поста', 'На посту', 'live'],
    ['20:00—08:00', 'Склад, Рыскулова 103', '1 пост', 'Запланировано', 'plain'],
    ['09:00—18:00', 'ТРЦ «Апорт», парковка', '4 поста', 'На посту', 'live'],
  ],
};

export default function Calendar() {
  const { c } = useTheme();
  const [day, setDay] = useState(28);
  const cells = [29, 30, ...Array.from({ length: 31 }, (_, i) => i + 1), 1, 2];
  const list = shifts[day] ?? (done.includes(day) ? [['08:00—20:00', 'БЦ «Нурлы Тау»', '2 поста', 'Завершено', 'ok'] as [string, string, string, string, StatusKind]] : []);
  return (
    <Screen tabs>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title1" accessibilityRole="header">Календарь</Text>
        <IconButton name="add" label="Добавить дежурство" />
      </View>
      <Card pad={14} gap={10}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="title3" size={17}>Октябрь 2026</Text>
          <View style={{ flexDirection: 'row' }}>
            <IconButton name="arrow-left" label="Предыдущий месяц" tone="input" size={40} />
            <View style={{ transform: [{ scaleX: -1 }] }}><IconButton name="arrow-left" label="Следующий месяц" tone="input" size={40} /></View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => <Text key={d} variant="caption" weight={400} color="textBody" align="center" style={{ flex: 1 }}>{d}</Text>)}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {cells.map((d, i) => {
            const muted = i < 2 || i > 32;
            const sel = !muted && d === day;
            const dot = muted ? null : done.includes(d) ? c.success : plan.includes(d) ? c.primary : null;
            return (
              <Pressable key={i} disabled={muted} onPress={() => setDay(d)} accessibilityRole="button" accessibilityLabel={`${d} октября`} style={{ width: `${100 / 7}%`, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: sel ? c.primary : 'transparent' }}>
                <Text variant="body" size={15} weight={sel ? 600 : 500} color={sel ? 'onPrimary' : muted ? 'textMuted' : 'textHeadline'}>{d}</Text>
                {dot ? <View style={{ position: 'absolute', bottom: 5, width: 5, height: 5, borderRadius: 3, backgroundColor: sel ? '#FFFFFF' : dot }} /> : null}
              </Pressable>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.success }} /><Text variant="caption" weight={400} color="textBody">завершено</Text></View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.primary }} /><Text variant="caption" weight={400} color="textBody">запланировано</Text></View>
        </View>
      </Card>
      <View><Text variant="title3" size={17}>{day} октября</Text><Text variant="bodySm" size={13} color="textBody">{list.length ? `${list.length} дежурства` : 'Дежурств нет'}</Text></View>
      {list.length ? (
        <Card gap={12}>
          {list.map(([t, obj, posts, st, kind], i) => (
            <View key={i} style={{ gap: 12 }}>
              {i ? <Divider /> : null}
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, backgroundColor: c.primary }} />
                <View style={{ flex: 1 }}><Text variant="title3">{t}</Text><Text variant="bodySm" size={13} color="textBody">{obj} · {posts}</Text></View>
                <StatusChip label={st} kind={kind} />
              </View>
            </View>
          ))}
        </Card>
      ) : null}
    </Screen>
  );
}
