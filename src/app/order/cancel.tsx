import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Pressable, Radio, Sheet, Text } from '@/components';
import { useStore } from '@/data/store';

const reasons = ['Охрана больше не нужна', 'Нашёл другое агентство', 'Изменились даты', 'Другая причина'];

export default function Cancel() {
  const { id = '1047' } = useLocalSearchParams<{ id: string }>();
  const { cancel } = useStore();
  const [r, setR] = useState(0);
  return (
    <Sheet>
      <View style={{ gap: 8 }}>
        <Text variant="title1" size={22}>Отменить заявку № {id}?</Text>
        <Text variant="body" size={15} color="textPrimary">До начала больше 24 часов — деньги вернутся полностью. Позже агентство может удержать стоимость первой смены.</Text>
      </View>
      <View accessibilityRole="radiogroup">
        {reasons.map((t, i) => (
          <Pressable key={t} onPress={() => setR(i)} accessibilityRole="radio" accessibilityState={{ checked: r === i }} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 44 }}>
            <Radio on={r === i} />
            <Text variant="body">{t}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button label="Не отменять" variant="secondary" style={{ flex: 1 }} onPress={() => router.back()} />
        <Button label="Отменить" variant="danger" style={{ flex: 1 }} onPress={() => { cancel(id); router.dismissTo('/orders'); }} />
      </View>
    </Sheet>
  );
}
