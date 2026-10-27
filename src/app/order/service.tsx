import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Glass, Icon, Pressable, Radio, Screen, Select, Text } from '@/components';
import { services, tenge } from '@/data/mock';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

const objects = ['Офис · БЦ «Нурлы Тау», пр. Аль-Фараби, 17', 'Склад · ул. Рыскулова, 103'];

export default function OrderService() {
  const { c } = useTheme();
  const { order, setOrder } = useStore();
  const [obj, setObj] = useState(0);
  return (
    <Screen title="Заказ охраны" subtitle="Барыс Охрана" steps={{ step: 1 }} heading="Что охраняем?" footer={<Button label="Далее" style={{ flex: 1 }} onPress={() => router.push('/order/details')} />}>
      <View accessibilityRole="radiogroup" style={{ gap: 12 }}>
        {services.map((s, i) => {
          const on = order.service === i;
          return (
            <Pressable key={s.name} onPress={() => setOrder({ service: i })} accessibilityRole="radio" accessibilityState={{ checked: on }}>
              <Glass style={{ borderRadius: 24, padding: 18, flexDirection: 'row', gap: 12, alignItems: 'center', borderWidth: 2, borderColor: on ? c.primary : 'rgba(255,255,255,0.75)' }}>
                <Radio on={on} />
                <View style={{ flex: 1 }}>
                  <Text variant="title3">{s.name}</Text>
                  <Text variant="bodySm" size={13} color="textBody">{s.desc}</Text>
                </View>
                <Text variant="title3" size={15}>{tenge(s.price)}/ч</Text>
              </Glass>
            </Pressable>
          );
        })}
      </View>
      <View style={{ marginTop: 8 }}><Select label="Объект" value={objects[obj]} icon="chevron-right" onPress={() => setObj((obj + 1) % objects.length)} /></View>
      <Pressable onPress={() => router.push('/objects/new')} accessibilityRole="button" style={{ flexDirection: 'row', gap: 8, alignItems: 'center', paddingVertical: 8 }}>
        <Icon name="add" size={20} />
        <Text variant="title3" size={15}>Добавить другой объект</Text>
      </Pressable>
    </Screen>
  );
}
