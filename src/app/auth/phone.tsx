import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Checkbox, Field, Pressable, Screen, Text, TextLink } from '@/components';
import { useStore } from '@/data/store';

export default function Phone() {
  const { phone, setPhone } = useStore();
  const [agree, setAgree] = useState(true);
  const ok = phone.replace(/\D/g, '').length >= 11 && agree;
  return (
    <Screen
      title=""
      heading="Вход или регистрация"
      lead="Отправим SMS с кодом. Пароль не нужен."
      footer={<Button label="Получить код" style={{ flex: 1 }} disabled={!ok} onPress={() => router.push('/auth/code')} />}>
      <Field label="Номер телефона" value={phone} onChangeText={setPhone} keyboardType="phone-pad" icon="call" autoFocus />
      <Pressable onPress={() => setAgree(!agree)} accessibilityRole="checkbox" accessibilityState={{ checked: agree }} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
        <Checkbox on={agree} />
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          <Text variant="bodySm" color="textPrimary">Принимаю</Text>
          <TextLink label="пользовательское соглашение" onPress={() => router.push('/auth/offer')} />
          <Text variant="bodySm" color="textPrimary">и согласие на обработку персональных данных</Text>
        </View>
      </Pressable>
    </Screen>
  );
}
