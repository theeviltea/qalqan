import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Icon, Row, Screen, Text, TextLink } from '@/components';
import { useTheme } from '@/theme';

export default function ShiftDone() {
  const { c } = useTheme();
  return (
    <Screen title="Заявка № 1042" footer={<><Button label="Повторить" variant="secondary" style={{ flex: 1 }} onPress={() => router.push('/order/service')} /><Button label="Оценить" style={{ flex: 1 }} onPress={() => router.push('/review')} /></>}>
      <View style={{ alignItems: 'center', gap: 12, paddingTop: 8 }}>
        <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: c.successBack, alignItems: 'center', justifyContent: 'center' }}><Icon name="shield-check" size={48} color="successText" /></View>
        <Text variant="title1" size={24} align="center">Смена завершена</Text>
        <Text variant="body" color="textPrimary" align="center">Охрана сдала объект в 20:02. Происшествий не было.</Text>
      </View>
      <Card style={{ marginTop: 12 }}>
        <Row label="Посты" value="2" />
        <Row label="Время охраны" value="12 ч 02 мин" />
        <Row label="Обходов" value="8" />
        <Row label="Замечаний" value="1, устранено" />
        <Row label="Журнал" value={<TextLink label="Открыть" onPress={() => router.push('/guard/journal')} />} />
      </Card>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text variant="title3">Списано</Text>
          <Text variant="number">60 000 ₸</Text>
        </View>
        <Text variant="bodySm" size={13} color="textBody">Kaspi.kz · чек отправлен на aruzhan@mail.kz</Text>
      </Card>
    </Screen>
  );
}
