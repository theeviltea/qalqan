import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { Button, Checkbox, Glass, Pressable, Screen, Text } from '@/components';
import { fontFamily, useTheme } from '@/theme';

const list = [
  { name: 'Охрана офиса', sub: 'БЦ, офисы, банки', price: '2 500' },
  { name: 'Охрана склада', sub: 'Склады, стройплощадки', price: '2 200' },
  { name: 'Мероприятия', sub: 'Концерты, свадьбы, выставки', price: '3 500' },
  { name: 'Охрана дома', sub: 'Частные дома, ЖК', price: '' },
  { name: 'Личная охрана', sub: 'Сопровождение', price: '' },
  { name: 'Пультовая + ГБР', sub: 'Сигнализация, выезд группы', price: '' },
];

export default function Services() {
  const { c } = useTheme();
  const [on, setOn] = useState([true, true, true, false, false, false]);
  return (
    <Screen title="Подключение агентства" steps={{ step: 2 }} heading="Услуги и цены" lead="Отметьте, что вы делаете, и цену за час одного поста." footer={<Button label="Далее" style={{ flex: 1 }} disabled={!on.some(Boolean)} onPress={() => router.push('/agency-signup/docs')} />}>
      {list.map((s, i) => (
        <Pressable key={s.name} onPress={() => setOn(on.map((v, k) => (k === i ? !v : v)))} accessibilityRole="checkbox" accessibilityState={{ checked: on[i] }}>
          <Glass style={{ borderRadius: 24, paddingVertical: 14, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 2, borderColor: on[i] ? c.primary : 'rgba(255,255,255,0.75)' }}>
            <Checkbox on={on[i]} />
            <View style={{ flex: 1 }}>
              <Text variant="title3">{s.name}</Text>
              <Text variant="bodySm" size={13} color="textBody">{s.sub}</Text>
            </View>
            <View style={{ height: 40, minWidth: 104, borderRadius: 12, backgroundColor: c.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 12, gap: 4 }}>
              <TextInput defaultValue={s.price} editable={on[i]} placeholder="—" placeholderTextColor={c.textMuted} keyboardType="number-pad" accessibilityLabel={`Цена, ${s.name}`} style={{ width: 52, textAlign: 'right', fontFamily: fontFamily('sans', 600), fontSize: 15, color: on[i] ? c.textHeadline : c.textMuted, outlineStyle: 'none' } as object} />
              <Text variant="title3" size={15} color={on[i] ? 'textHeadline' : 'textMuted'}>₸/ч</Text>
            </View>
          </Glass>
        </Pressable>
      ))}
    </Screen>
  );
}
