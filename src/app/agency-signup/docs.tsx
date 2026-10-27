import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Divider, Gradient, Icon, Pressable, Screen, StatusChip, Text } from '@/components';
import { useTheme } from '@/theme';

const initial = [
  { name: 'Лицензия на охранную деятельность', meta: 'license_baris.pdf · 2,4 МБ', done: true },
  { name: 'Справка о гос. регистрации', meta: 'spravka_bin.pdf · 840 КБ', done: true },
  { name: 'Удостоверение руководителя', meta: 'Фото или PDF', done: false },
  { name: 'Договор-образец с клиентом', meta: 'Необязательно', done: false },
];

export default function Docs() {
  const { c } = useTheme();
  const [docs, setDocs] = useState(initial);
  const upload = (i: number) => setDocs(docs.map((d, k) => (k === i ? { ...d, done: true, meta: 'scan.pdf · 1,1 МБ' } : d)));
  return (
    <Screen title="Подключение агентства" steps={{ step: 3 }} heading="Документы" lead="Нужны, чтобы получить отметку «Проверено». Клиенты документы не видят." footer={<Button label="Отправить на проверку" style={{ flex: 1 }} disabled={!docs[0].done || !docs[1].done || !docs[2].done} onPress={() => router.push('/agency-signup/review')} />}>
      <Card>
        {docs.map((d, i) => (
          <View key={d.name} style={{ gap: 14 }}>
            {i ? <Divider /> : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name="file" size={22} /></View>
              <View style={{ flex: 1 }}>
                <Text variant="title3" size={15}>{d.name}</Text>
                <Text variant="bodySm" size={13} color="textBody">{d.meta}</Text>
              </View>
              {d.done ? <StatusChip label="Загружено" kind="ok" /> : (
                <Pressable onPress={() => upload(i)} accessibilityRole="button" accessibilityLabel={`Загрузить: ${d.name}`}>
                  <Gradient style={{ height: 36, borderRadius: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Icon name="upload" size={18} color="onPrimary" />
                    <Text variant="bodySm" weight={600} color="onPrimary">Загрузить</Text>
                  </Gradient>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </Card>
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 4 }}>
        <Icon name="lock" size={18} color="textBody" />
        <Text variant="bodySm" size={13} color="textBody" style={{ flex: 1 }}>Документы хранятся в зашифрованном виде и нужны только для проверки.</Text>
      </View>
    </Screen>
  );
}
