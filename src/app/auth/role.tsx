import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Glass, Gradient, Icon, Lockup, Pressable, Screen, Text, TextLink } from '@/components';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

function RoleCard({ icon, title, sub, points, on, onPress }: { icon: 'shield' | 'building'; title: string; sub: string; points: string[]; on: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ checked: on }}>
      <Glass style={{ borderRadius: 24, padding: 20, gap: 14, borderWidth: 2, borderColor: on ? c.primary : 'rgba(255,255,255,0.75)' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {on ? (
            <Gradient style={{ width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} color="onPrimary" /></Gradient>
          ) : (
            <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: c.back, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} /></View>
          )}
          <View style={{ flex: 1 }}>
            <Text variant="title3" size={17}>{title}</Text>
            <Text variant="bodySm" color="textBody">{sub}</Text>
          </View>
          {on ? <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={16} color="onPrimary" /></View> : <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: c.stroke }} />}
        </View>
        {points.map((p) => (
          <View key={p} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Icon name="check" size={16} />
            <Text variant="bodySm" color="textPrimary">{p}</Text>
          </View>
        ))}
      </Glass>
    </Pressable>
  );
}

export default function Role() {
  const { setRole } = useStore();
  const [r, setR] = useState<'client' | 'agency'>('client');
  const go = () => {
    setRole(r);
    router.push(r === 'client' ? '/auth/phone' : '/agency-signup/company');
  };
  return (
    <Screen
      back={false}
      footer={<Button label="Продолжить" style={{ flex: 1 }} onPress={go} />}
      footerNote={<View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}><Text variant="bodySm" size={13} color="textBody">Уже есть аккаунт?</Text><TextLink label="Войти" onPress={() => router.push('/auth/phone')} /></View>}>
      <Lockup height={28} />
      <View style={{ gap: 8, marginTop: 12, marginBottom: 4 }}>
        <Text variant="title1" size={26} accessibilityRole="header">Кто вы?</Text>
        <Text variant="body" color="textBody">От этого зависит, какие разделы мы покажем. Роль можно сменить в профиле.</Text>
      </View>
      <RoleCard icon="shield" title="Мне нужна охрана" sub="Частное лицо или компания" points={['Найти и сравнить агентства', 'Заказать охрану онлайн', 'Видеть, что объект под охраной']} on={r === 'client'} onPress={() => setR('client')} />
      <RoleCard icon="building" title="Я охранное агентство" sub="Подключить компанию" points={['Получать заявки от клиентов', 'Вести смены и журнал', 'Получать выплаты']} on={r === 'agency'} onPress={() => setR('agency')} />
    </Screen>
  );
}
