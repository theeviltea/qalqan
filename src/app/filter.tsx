import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button, Checkbox, Chip, Field, Pressable, Sheet, Text, TextLink } from '@/components';

function Group({ title, options, value, onChange }: { title: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <View style={{ gap: 10 }}>
      <Text variant="title3" size={15}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {options.map((o, i) => <Chip key={o} label={o} selected={i === value} onPress={() => onChange(i)} />)}
      </View>
    </View>
  );
}

export default function Filter() {
  const [kind, setKind] = useState(0);
  const [mode, setMode] = useState(2);
  const [checks, setChecks] = useState([true, false, false]);
  const labels = ['Только проверенные агентства', 'Рейтинг 4,5 и выше', 'Есть группа быстрого реагирования'];
  return (
    <Sheet full>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title1" size={20}>Фильтры</Text>
        <TextLink label="Сбросить" color="textBody" onPress={() => { setKind(0); setMode(2); setChecks([false, false, false]); }} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 20, paddingBottom: 12 }}>
        <Group title="Вид охраны" options={['Офис', 'Дом', 'Склад', 'Мероприятие', 'Личная', 'Пультовая']} value={kind} onChange={setKind} />
        <Group title="Режим" options={['Днём', 'Ночью', 'Круглосуточно', 'Разово']} value={mode} onChange={setMode} />
        <View style={{ gap: 10 }}>
          <Text variant="title3" size={15}>Цена за час поста, ₸</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}><Field onSurface placeholder="от 2 000" keyboardType="number-pad" /></View>
            <View style={{ flex: 1 }}><Field onSurface defaultValue="3 000" keyboardType="number-pad" /></View>
          </View>
        </View>
        <View style={{ gap: 14 }}>
          {labels.map((l, i) => (
            <Pressable key={l} onPress={() => setChecks(checks.map((v, k) => (k === i ? !v : v)))} accessibilityRole="checkbox" accessibilityState={{ checked: checks[i] }} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Checkbox on={checks[i]} />
              <Text variant="body" size={15}>{l}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Button label="Показать 24 агентства" onPress={() => router.back()} />
    </Sheet>
  );
}
