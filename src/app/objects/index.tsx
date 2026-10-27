import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Icon, Screen, Text } from '@/components';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

export default function Objects() {
  const { c } = useTheme();
  const { objects } = useStore();
  return (
    <Screen title="Мои объекты" footer={<Button label="Добавить объект" icon="add" style={{ flex: 1 }} onPress={() => router.push('/objects/new')} />}>
      {objects.map((o) => (
        <Card key={o.title} pad={18} style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={o.icon} /></View>
          <View style={{ flex: 1 }}>
            <Text variant="title3">{o.title}</Text>
            <Text variant="bodySm" color="textBody">{o.addr}</Text>
            <Text variant="caption" weight={400} color="textBody" style={{ marginTop: 4 }}>{o.meta}</Text>
          </View>
          <Icon name="chevron-right" size={20} color="textBody" />
        </Card>
      ))}
    </Screen>
  );
}
