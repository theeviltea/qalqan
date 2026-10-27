import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Gradient, Icon, LogoTile, Row, Screen, Text, Verified } from '@/components';
import { shadows } from '@/theme';

export default function Approved() {
  return (
    <Screen back={false} footer={<Button label="Открыть кабинет" style={{ flex: 1 }} onPress={() => router.replace('/requests')} />}>
      <View style={{ alignItems: 'center', gap: 16, paddingTop: 80, paddingHorizontal: 4 }}>
        <Gradient style={{ width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center', boxShadow: shadows.shadowGlow }}><Icon name="shield-check" size={52} color="onPrimary" /></Gradient>
        <Text variant="title1" size={24} align="center">Агентство проверено</Text>
        <Text variant="body" color="textPrimary" align="center">Барыс Охрана появилась в поиске с отметкой «Проверено». Заявки будут приходить в кабинет и пушем.</Text>
      </View>
      <Card style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <LogoTile initials="БО" size={56} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Text variant="title3" size={17}>Барыс Охрана</Text><Verified size={18} /></View>
            <Text variant="bodySm" color="textBody">Так вас видят клиенты</Text>
          </View>
        </View>
        <Row label="Лицензия" value="до 03.2029" />
        <Row label="Услуг в поиске" value="3" />
      </Card>
    </Screen>
  );
}
