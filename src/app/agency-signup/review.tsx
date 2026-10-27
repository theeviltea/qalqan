import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Divider, Glass, Icon, Row, Screen, StatusChip, Text } from '@/components';

export default function Review() {
  return (
    <Screen back={false} footer={<><Button label="Профиль" variant="secondary" style={{ flex: 1 }} onPress={() => router.replace('/cabinet')} /><Button label="Готово" style={{ flex: 1 }} onPress={() => router.replace('/agency-signup/approved')} /></>}>
      <View style={{ alignItems: 'center', gap: 16, paddingTop: 80, paddingHorizontal: 4 }}>
        <Glass style={{ width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center' }}><Icon name="clock" size={44} /></Glass>
        <Text variant="title1" size={24} align="center">Проверяем документы</Text>
        <Text variant="body" color="textPrimary" align="center">Обычно до 24 часов. Пришлём уведомление, когда агентство появится в поиске.</Text>
      </View>
      <Card style={{ marginTop: 20 }}>
        <Row label="Компания" value="готово" />
        <Row label="Услуги и цены" value="3 услуги" />
        <Row label="Документы" value={<StatusChip label="На проверке" />} />
        <Divider />
        <Text variant="bodySm" color="textBody">Пока идёт проверка, можно заполнить профиль: описание, фото команды, график диспетчерской.</Text>
      </Card>
      <Text variant="bodySm" size={13} color="textMuted" align="center">Демо: «Готово» показывает экран после проверки.</Text>
    </Screen>
  );
}
