import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Divider, Icon, IconButton, LogoTile, MenuRow, Pressable, Screen, SectionTitle, StatusChip, Text, Verified, type IconName } from '@/components';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

const svc: [IconName, string, string, boolean][] = [
  ['building', 'Охрана офиса', 'БЦ, офисы · 2 500 ₸/ч', true],
  ['warehouse', 'Охрана склада', 'Круглосуточно · 2 200 ₸/ч', true],
  ['event', 'Мероприятия', 'Фейсконтроль · 3 500 ₸/ч', true],
  ['personal-guard', 'Личная охрана', 'Сопровождение · —', false],
];

export default function Cabinet() {
  const { c } = useTheme();
  const { setRole } = useStore();
  return (
    <Screen tabs>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="title1" accessibilityRole="header">Профиль агентства</Text>
        <IconButton name="settings" label="Настройки" />
      </View>
      <Card>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <LogoTile initials="БО" size={64} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Text variant="title2">Барыс Охрана</Text><Verified size={18} /></View>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}><Icon name="star-filled" size={14} filled color="primary" /><Text variant="bodySm" color="textBody">4,9 · 128 отзывов</Text></View>
          </View>
        </View>
        <Text variant="body" size={15} color="textPrimary">Охраняем бизнес-центры, склады и мероприятия в Алматы и области. Своя диспетчерская 24/7.</Text>
        <Button label="Как видят клиенты" icon="view" variant="secondary" onPress={() => router.push('/agency/barys')} />
      </Card>
      <Card>
        <SectionTitle title="Мои услуги" action="+ Добавить" />
        {svc.map(([icon, t, d, on], i) => (
          <View key={t} style={{ gap: 14 }}>
            {i ? <Divider /> : null}
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} /></View>
              <View style={{ flex: 1 }}><Text variant="title3">{t}</Text><Text variant="bodySm" size={13} color="textBody">{d}</Text></View>
              <StatusChip label={on ? 'Активна' : 'Скрыта'} kind={on ? 'ok' : 'wait'} />
              <Pressable onPress={() => router.push('/service-edit')} accessibilityRole="button" accessibilityLabel={`Изменить: ${t}`} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}><Icon name="edit" size={20} color="textBody" /></Pressable>
            </View>
          </View>
        ))}
      </Card>
      <Card gap={6}>
        <MenuRow icon="users" title="Сотрудники" sub="140 охранников, 12 на смене" onPress={() => router.push('/staff')} />
        <Divider />
        <MenuRow icon="file" title="Документы" sub="лицензия до 03.2029" />
        <Divider />
        <MenuRow icon="wallet" title="Реквизиты для выплат" />
        <Divider />
        <MenuRow icon="stats" title="Статистика" onPress={() => router.push('/stats')} />
        <Divider />
        <MenuRow icon="user" title="Мне нужна охрана" sub="Перейти в приложение клиента" onPress={() => { setRole('client'); router.replace('/home'); }} />
      </Card>
    </Screen>
  );
}
