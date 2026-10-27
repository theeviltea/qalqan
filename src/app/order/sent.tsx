import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Gradient, Icon, Row, Screen, StatusChip, Text } from '@/components';
import { services } from '@/data/mock';
import { useStore } from '@/data/store';
import { shadows } from '@/theme';

export default function Sent() {
  const { order } = useStore();
  return (
    <Screen back={false} footer={<><Button label="На главную" variant="secondary" style={{ flex: 1 }} onPress={() => router.replace('/home')} /><Button label="Мои заказы" style={{ flex: 1 }} onPress={() => router.replace('/orders')} /></>}>
      <View style={{ alignItems: 'center', gap: 16, paddingTop: 90 }}>
        <Gradient style={{ width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center', boxShadow: shadows.shadowGlow }}><Icon name="check" size={48} color="onPrimary" /></Gradient>
        <Text variant="title1" size={24} align="center">Заявка отправлена</Text>
        <Text variant="body" color="textPrimary" align="center">Барыс Охрана подтвердит её и назначит охранников. Обычно это занимает до 15 минут.</Text>
      </View>
      <Card style={{ marginTop: 20 }}>
        <Row label="Заявка" value="№ 1055" />
        <Row label={services[order.service].name} value={`${order.posts} ${order.posts === 1 ? 'пост' : 'поста'}`} />
        <Row label="Когда" value="28 окт, 08:00—20:00" />
        <Row label="Статус" value={<StatusChip label="Ждёт подтверждения" />} />
      </Card>
    </Screen>
  );
}
