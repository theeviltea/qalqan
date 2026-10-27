import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Field, Icon, Pressable, Screen, Select, Text } from '@/components';
import { useTheme } from '@/theme';

const cities = ['Алматы, Алматинская обл.', 'Астана', 'Шымкент'];

export default function Company() {
  const { c } = useTheme();
  const [city, setCity] = useState(0);
  return (
    <Screen title="Подключение агентства" steps={{ step: 1 }} heading="О компании" lead="Эти данные увидят клиенты в карточке агентства." footer={<Button label="Далее" style={{ flex: 1 }} onPress={() => router.push('/agency-signup/services')} />}>
      <Pressable accessibilityRole="button" accessibilityLabel="Загрузить логотип" style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 72, height: 72, borderRadius: 16, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#9AA0A8', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="camera" color={c.textBody} />
        </View>
        <View>
          <Text variant="title3" size={15}>Логотип</Text>
          <Text variant="bodySm" size={13} color="textBody">PNG или JPG, квадрат от 400 px</Text>
        </View>
      </Pressable>
      <Field label="Название" defaultValue="Барыс Охрана" />
      <Field label="БИН" defaultValue="180240012345" keyboardType="number-pad" />
      <Select label="Город работы" value={cities[city]} onPress={() => setCity((city + 1) % cities.length)} />
      <Field label="Год основания" defaultValue="2012" keyboardType="number-pad" />
      <Field label="Телефон диспетчерской" defaultValue="+7 727 355 00 12" icon="call" keyboardType="phone-pad" />
    </Screen>
  );
}
