import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AgencyCard, Button, Glass, Gradient, MapMock, Mark, Screen, Text } from '@/components';
import { agencies } from '@/data/mock';
import { shadows, useTheme } from '@/theme';

const slides = [
  { title: 'Охрана рядом', text: 'Проверенные агентства Алматы и Астаны: сравните цены, отзывы и лицензии в одном месте.' },
  { title: 'Заказ за минуту', text: 'Выберите услугу, дату и число постов. Оплата через Kaspi, картой или по счёту для юрлиц.' },
  { title: 'Охрана на виду', text: 'Видно, кто на посту, когда был обход и что записано в журнал. Связь с охранником и диспетчером в одно касание.' },
];

function Visual({ i }: { i: number }) {
  const { c } = useTheme();
  if (i === 0)
    return (
      <View style={{ padding: 20, gap: 12 }} pointerEvents="none">
        <AgencyCard agency={agencies[0]} />
        <View style={{ opacity: 0.55 }}><AgencyCard agency={agencies[1]} /></View>
        <View style={{ opacity: 0.25 }}><AgencyCard agency={agencies[2]} /></View>
        <Gradient style={{ position: 'absolute', right: 24, bottom: 24, width: 96, height: 96, borderRadius: 28, alignItems: 'center', justifyContent: 'center', boxShadow: shadows.shadowGlow }}>
          <Mark size={56} color="#FFFFFF" />
        </Gradient>
      </View>
    );
  if (i === 1)
    return (
      <View style={{ padding: 20, gap: 12, flex: 1 }} pointerEvents="none">
        <View style={{ borderRadius: 20, backgroundColor: '#FFFFFF', padding: 16, gap: 8 }}>
          <Text variant="bodySm" size={13} color="textBody">Заказ охраны · 2 из 3</Text>
          <Text variant="title1" size={20}>2 поста · 12 часов</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text variant="bodySm" color="textPrimary">28 октября, 08:00—20:00</Text><Text variant="title3" size={14}>60 000 ₸</Text></View>
        </View>
        <View style={{ borderRadius: 20, backgroundColor: '#FFFFFF', padding: 16, gap: 12 }}>
          <Text variant="title3" size={15}>Kaspi.kz</Text>
          <Text variant="title3" size={15} color="textBody">Банковская карта</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Button label="Оплатить 60 000 ₸" />
      </View>
    );
  return (
    <View style={{ flex: 1 }} pointerEvents="none">
      <MapMock width={440} height={380} />
      <View style={{ position: 'absolute', left: 16, right: 16, bottom: 16, borderRadius: 20, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <View style={{ backgroundColor: c.signal, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.carbon }} />
          <Text variant="bodySm" size={13} weight={600} color="carbon">На посту с 08:00</Text>
        </View>
        <View style={{ padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text variant="number">05:42:10</Text>
          <Text variant="bodySm" size={13} color="textBody">10:00 · обход выполнен</Text>
        </View>
      </View>
    </View>
  );
}

export default function Onboarding() {
  const { c } = useTheme();
  const [i, setI] = useState(0);
  const next = () => (i < 2 ? setI(i + 1) : router.replace('/auth/role'));
  return (
    <Screen
      back={false}
      scroll={false}
      footer={
        <>
          <Button label="Пропустить" variant="secondary" style={{ flex: 1 }} onPress={() => router.replace('/auth/role')} />
          <Button label={i < 2 ? 'Далее' : 'Начать'} style={{ flex: 1 }} onPress={next} />
        </>
      }>
      <Glass style={{ height: 380, borderRadius: 28, marginTop: 20 }}>
        <Visual i={i} />
      </Glass>
      <View style={{ paddingTop: 20, paddingHorizontal: 4, gap: 12, alignItems: 'center' }}>
        <Text variant="title1" size={26} align="center">{slides[i].title}</Text>
        <Text variant="body" color="textPrimary" align="center">{slides[i].text}</Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }} accessibilityLabel={`Слайд ${i + 1} из 3`}>
          {[0, 1, 2].map((k) => <View key={k} style={{ width: k === i ? 22 : 6, height: 6, borderRadius: 3, backgroundColor: k === i ? c.primary : '#C4C7CD' }} />)}
        </View>
      </View>
    </Screen>
  );
}
