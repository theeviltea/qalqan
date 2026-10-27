import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Divider, Icon, Row, Screen, Text, TextLink } from '@/components';
import { useTheme } from '@/theme';

export default function ShiftDoneAgency() {
  const { c } = useTheme();
  const [sent, setSent] = useState(false);
  return (
    <Screen title="Смена" footer={<Button label={sent ? 'Вернуться к заявкам' : 'Отправить отчёт клиенту'} style={{ flex: 1 }} onPress={() => (sent ? router.dismissTo('/requests') : setSent(true))} />}>
      <View style={{ alignItems: 'center', gap: 12, paddingTop: 8 }}>
        <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: c.successBack, alignItems: 'center', justifyContent: 'center' }}><Icon name="shield-check" size={48} color="successText" /></View>
        <Text variant="title1" size={24} align="center">{sent ? 'Отчёт отправлен' : 'Дежурство завершено'}</Text>
        <Text variant="body" color="textPrimary" align="center">{sent ? 'Клиент получил отчёт и чек. Деньги поступят с ближайшей выплатой.' : 'Проверьте отчёт перед отправкой клиенту.'}</Text>
      </View>
      <Card style={{ marginTop: 12 }}>
        <Row label="Посты" value="2" />
        <Row label="Время охраны" value="12 ч 02 мин" />
        <Row label="Обходов" value="8" />
        <Row label="Замечаний" value="1" />
        <Row label="Журнал" value={<TextLink label="Смотреть" onPress={() => router.push('/guard/journal')} />} />
      </Card>
      <Card>
        <Row label="Оплачено клиентом" value="60 000 ₸" />
        <Row label="Комиссия сервиса" value="[YOUR FEE] ₸" bold={false} />
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}><Text variant="title3">К выплате</Text><Text variant="number">[NET] ₸</Text></View>
      </Card>
    </Screen>
  );
}
