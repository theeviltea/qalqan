import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Field, Screen, Select, Text, Toggle } from '@/components';

export default function ServiceEdit() {
  const [visible, setVisible] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const modes = ['Днём, ночью, круглосуточно', 'Только днём', 'Только ночью'];
  const [m, setM] = useState(0);
  return (
    <Screen title="Охрана офиса" subtitle={visible ? 'Услуга активна' : 'Скрыта из поиска'} footer={<><Button label="Удалить" icon="delete" variant="secondary" /><Button label="Сохранить" style={{ flex: 1 }} onPress={() => router.back()} /></>}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}><Text variant="title3">Показывать в поиске</Text><Text variant="bodySm" size={13} color="textBody">Клиенты видят услугу и могут заказать</Text></View>
          <Toggle on={visible} onChange={setVisible} label="Показывать в поиске" />
        </View>
      </Card>
      <Card>
        <Field label="Цена за час одного поста, ₸" onSurface defaultValue="2 500" keyboardType="number-pad" />
        <Field label="Минимальный заказ, часов" onSurface defaultValue="8" keyboardType="number-pad" />
        <Select label="Режим" value={modes[m]} onSurface onPress={() => setM((m + 1) % modes.length)} />
      </Card>
      <Card>
        <Field label="Что входит" onSurface multiline defaultValue="Пост на входе, контроль доступа, обходы каждые 3 часа, журнал в приложении" />
      </Card>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}><Text variant="title3">Срочный выезд</Text><Text variant="bodySm" size={13} color="textBody">Принимать заказы с началом через 2 часа · +20%</Text></View>
          <Toggle on={urgent} onChange={setUrgent} label="Срочный выезд" />
        </View>
      </Card>
    </Screen>
  );
}
