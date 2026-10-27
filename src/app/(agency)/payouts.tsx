import { ScrollView, View } from 'react-native';

import { Card, Chip, Divider, Gradient, Screen, Text } from '@/components';
import { payouts } from '@/data/mock';

export default function Payouts() {
  return (
    <Screen tabs heading="Выплаты">
      <Gradient name="gradDeep" style={{ borderRadius: 24, padding: 18, gap: 4 }}>
        <Text variant="bodySm" size={13} color="#B8C8F0">К выплате в пятницу, 30 октября</Text>
        <Text variant="display" size={32} color="onPrimary">1 284 000 ₸</Text>
        <Text variant="bodySm" size={13} color="#B8C8F0">на счёт KZ··· 4471, Halyk Bank</Text>
      </Gradient>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <Chip label="Октябрь" icon="calendar" selected />
        <Chip label="Все услуги" icon="chevron-down" />
      </ScrollView>
      <Card>
        {payouts.map((p, i) => (
          <View key={p.date} style={{ gap: 14 }}>
            {i ? <Divider /> : null}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View><Text variant="title3" size={15}>{p.date}</Text><Text variant="bodySm" size={13} color="textBody">{p.meta}</Text></View>
              <View style={{ alignItems: 'flex-end' }}><Text variant="title3" size={15}>{p.sum}</Text><Text variant="caption" weight={600} color="successText">Выплачено</Text></View>
            </View>
          </View>
        ))}
      </Card>
      <Text variant="bodySm" size={13} color="textBody" align="center">Суммы указаны после комиссии сервиса</Text>
    </Screen>
  );
}
