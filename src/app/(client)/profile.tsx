import { router } from 'expo-router';
import { View } from 'react-native';

import { Avatar, Card, Divider, Icon, IconButton, MenuRow, Pressable, Screen, Text } from '@/components';
import { useStore } from '@/data/store';

export default function Profile() {
  const { name, phone, setRole } = useStore();
  return (
    <Screen tabs>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title1" accessibilityRole="header">Профиль</Text>
        <IconButton name="settings" label="Настройки" />
      </View>
      <Card>
        <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <Avatar initials={(name[0] ?? 'А') + 'С'} size={60} strong />
          <View style={{ flex: 1 }}>
            <Text variant="title2">{name} Сейтказы</Text>
            <Text variant="bodySm" color="textBody">{phone}</Text>
          </View>
          <Icon name="edit" size={20} color="textBody" />
        </View>
      </Card>
      <Card gap={6}>
        <MenuRow icon="building" title="Мои объекты" sub="БЦ «Нурлы Тау», склад на Рыскулова" onPress={() => router.push('/objects')} />
        <Divider />
        <MenuRow icon="card" title="Способы оплаты" sub="Kaspi.kz, Visa ··4821" />
        <Divider />
        <MenuRow icon="invoice" title="Чеки и документы" />
        <Divider />
        <MenuRow icon="star" title="Мои отзывы" sub="3 отзыва" />
      </Card>
      <Card gap={6}>
        <MenuRow icon="notification" title="Уведомления" onPress={() => router.push('/notifications')} />
        <Divider />
        <MenuRow icon="message" title="Поддержка" onPress={() => router.push('/chat/barys')} />
        <Divider />
        <MenuRow icon="building" title="Я охранное агентство" sub="Перейти в кабинет агентства" onPress={() => { setRole('agency'); router.replace('/requests'); }} />
        <Divider />
        <MenuRow icon="file" title="Пользовательское соглашение" onPress={() => router.push('/auth/offer')} />
      </Card>
      <Pressable onPress={() => router.replace('/auth/role')} accessibilityRole="button" style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', height: 52 }}>
        <Icon name="logout" size={20} color="dangerText" />
        <Text variant="title3" size={15} color="dangerText">Выйти</Text>
      </Pressable>
    </Screen>
  );
}
