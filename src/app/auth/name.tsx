import { router } from 'expo-router';
import { useState } from 'react';

import { Button, Field, Screen, Segmented, Select } from '@/components';
import { useStore } from '@/data/store';

const cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда'];

export default function Name() {
  const { name, setName } = useStore();
  const [kind, setKind] = useState(0);
  const [city, setCity] = useState(0);
  return (
    <Screen title="" heading="Как к вам обращаться?" lead="Имя увидит агентство в заявке." footer={<Button label="Готово" style={{ flex: 1 }} disabled={!name.trim()} onPress={() => router.replace('/home')} />}>
      <Segmented options={['Частное лицо', 'Компания']} value={kind} onChange={setKind} />
      {kind === 0 ? (
        <>
          <Field label="Имя" value={name} onChangeText={setName} />
          <Field label="Фамилия" defaultValue="Сейтказы" />
        </>
      ) : (
        <>
          <Field label="Название компании" placeholder="ТОО «…»" />
          <Field label="БИН" placeholder="12 цифр" keyboardType="number-pad" />
          <Field label="Контактное лицо" value={name} onChangeText={setName} />
        </>
      )}
      <Field label="E-mail — для чеков" placeholder="name@mail.kz" keyboardType="email-address" />
      <Select label="Город" value={cities[city]} onPress={() => setCity((city + 1) % cities.length)} />
    </Screen>
  );
}
