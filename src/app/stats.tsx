import { useState } from 'react';
import { View } from 'react-native';

import { Card, Chip, Divider, Glass, Gradient, Row, Screen, SectionTitle, Text } from '@/components';
import { shadows } from '@/theme';

const bars = [38, 52, 46, 61, 58, 72, 80];
const months = ['апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт'];

export default function Stats() {
  const [p, setP] = useState(0);
  const tile = (v: string, l: string, hl?: boolean) => {
    const inner = <View style={{ padding: 14, gap: 2 }}><Text variant="number" color={hl ? 'onPrimary' : 'textHeadline'}>{v}</Text><Text variant="bodySm" size={13} color={hl ? '#D3DEFA' : 'textBody'}>{l}</Text></View>;
    return hl ? <Gradient style={{ flex: 1, borderRadius: 24, boxShadow: shadows.shadowGlow }}>{inner}</Gradient> : <Glass style={{ flex: 1, borderRadius: 24 }}>{inner}</Glass>;
  };
  return (
    <Screen title="Статистика">
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {['Месяц', 'Квартал', 'Год'].map((x, i) => <Chip key={x} label={x} selected={p === i} onPress={() => setP(i)} />)}
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>{tile('5,2 млн ₸', 'выручка за октябрь', true)}{tile('82', 'смены')}</View>
      <View style={{ flexDirection: 'row', gap: 12 }}>{tile('31', 'клиент')}{tile('12 мин', 'ответ на заявку')}</View>
      <Card>
        <SectionTitle title="Смены по месяцам" />
        <Text variant="bodySm" size={13} weight={600} color="successText" style={{ marginTop: -8 }}>+11% к сентябрю</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, height: 150 }} accessibilityLabel="Смены по месяцам: апрель 38, май 52, июнь 46, июль 61, август 58, сентябрь 72, октябрь 80">
          {bars.map((b, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
              {i === bars.length - 1 ? <Gradient name="gradPrimary" style={{ width: '100%', height: b * 1.5, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} /> : <View style={{ width: '100%', height: b * 1.5, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'rgba(20, 58, 168, 0.18)' }} />}
              <Text variant="caption" weight={400} color="textBody">{months[i]}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Card>
        <SectionTitle title="Услуги" />
        <Row label="Охрана офиса" value="46 смен" />
        <Row label="Охрана склада" value="24 смены" />
        <Row label="Мероприятия" value="12 смен" />
        <Divider />
        <Row label="Отказов от заявок" value="2" bold={false} />
        <Row label="Средняя оценка" value="4,9" />
      </Card>
    </Screen>
  );
}
