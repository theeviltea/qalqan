import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Chip, Field, Icon, MapMock, Screen, Text } from '@/components';
import { useStore } from '@/data/store';

const kinds = [
  { label: 'Офис', icon: 'building' },
  { label: 'Дом', icon: 'house' },
  { label: 'Склад', icon: 'warehouse' },
  { label: 'Мероприятие', icon: 'event' },
] as const;

export default function NewObject() {
  const { addObject } = useStore();
  const [k, setK] = useState(1);
  const [addr, setAddr] = useState('мкр. Горный Гигант, ул. Жамакаева, 54');
  const [title, setTitle] = useState('Дом');
  const save = () => {
    addObject({ icon: kinds[k].icon, title, addr, meta: 'Заказов пока не было' });
    router.back();
  };
  return (
    <Screen title="Новый объект" footer={<Button label="Сохранить" style={{ flex: 1 }} disabled={!addr.trim()} onPress={save} />}>
      <View style={{ borderRadius: 24, overflow: 'hidden', height: 160, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', inset: 0 } as object}><MapMock width={440} height={160} pin={false} /></View>
        <View style={{ marginTop: -36 }}><Icon name="location" size={36} color="primary" /></View>
      </View>
      <View style={{ gap: 8 }}>
        <Text variant="bodySm" weight={500} color="textBody">Тип объекта</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {kinds.map((x, i) => <Chip key={x.label} label={x.label} icon={x.icon} selected={k === i} onPress={() => setK(i)} />)}
        </View>
      </View>
      <Field label="Адрес" value={addr} onChangeText={setAddr} icon="location" />
      <Field label="Название для себя" value={title} onChangeText={setTitle} />
      <Field label="Как попасть: подъезд, код, ориентир" placeholder="Ворота с улицы, звонок у калитки" />
    </Screen>
  );
}
