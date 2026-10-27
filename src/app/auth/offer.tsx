import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Screen, Text } from '@/components';

const parts = [
  ['1. О сервисе', 'Qalqan помогает найти охранное агентство и оформить заявку. Договор на охрану заключается между клиентом и агентством; объём услуг, график и стоимость согласуются в заявке.'],
  ['2. Агентства', 'В поиске показываются агентства, загрузившие лицензию на охранную деятельность и справку о регистрации. Отметка «Проверено» значит, что документы сверены с реестром.'],
  ['3. Оплата', '[Условия удержания и возврата средств — текст готовит юрист]'],
  ['4. Отзывы', 'Оставить отзыв можно только после завершённой смены. Не публикуйте в отзывах адреса, коды доступа и личные данные сотрудников.'],
];

export default function Offer() {
  return (
    <Screen title="Пользовательское соглашение" footer={<Button label="Принимаю условия" style={{ flex: 1 }} onPress={() => router.back()} />}>
      {parts.map(([h, t]) => (
        <View key={h} style={{ gap: 8, marginBottom: 8 }}>
          <Text variant="title2">{h}</Text>
          <Text variant="body" color="textPrimary" size={15}>{t}</Text>
        </View>
      ))}
    </Screen>
  );
}
