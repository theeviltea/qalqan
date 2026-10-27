import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Icon, MapMock, Pressable, Sheet, Text } from '@/components';
import { useTheme } from '@/theme';

export default function Alarm() {
  const { c } = useTheme();
  const [called, setCalled] = useState(false);
  return (
    <Sheet behind={<MapMock width={480} height={420} />}>
      <View style={{ alignItems: 'center', gap: 18 }}>
        <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: called ? c.successBack : c.dangerBack, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={called ? 'check' : 'alert'} size={40} color={called ? 'successText' : 'danger'} />
        </View>
        <Text variant="title1" size={24} align="center">{called ? 'Группа выехала' : 'Вызвать группу реагирования?'}</Text>
        <Text variant="body" size={15} color="textPrimary" align="center">
          {called ? 'Диспетчер Барыс Охрана получил сигнал. Группа будет примерно через 12 минут, охранник на посту уже предупреждён.' : 'Диспетчер Барыс Охрана получит сигнал и ваше местоположение. Группа приедет в течение 15 минут.'}
        </Text>
      </View>
      {called ? (
        <Button label="Вернуться к охране" onPress={() => router.back()} />
      ) : (
        <>
          <Pressable onLongPress={() => setCalled(true)} onPress={() => setCalled(true)} delayLongPress={600} accessibilityRole="button" accessibilityLabel="Вызвать группу" style={{ height: 64, borderRadius: 20, backgroundColor: c.danger, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 10px 24px rgba(229, 36, 63, 0.3)' }}>
            <Icon name="alert" size={24} color="onPrimary" />
            <Text variant="title2" weight={700} color="onPrimary">Вызвать</Text>
          </Pressable>
          <Text variant="bodySm" size={13} color="textBody" align="center">Удерживайте кнопку 2 секунды · ложный вызов можно отменить в течение 10 секунд</Text>
          <Button label="Отмена" variant="secondary" onPress={() => router.back()} />
        </>
      )}
    </Sheet>
  );
}
