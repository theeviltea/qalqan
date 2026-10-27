import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Card, Gradient, Icon, Screen, Text, TextLink, type IconName } from '@/components';
import { notifications } from '@/data/mock';
import { useTheme } from '@/theme';

export default function Notifications() {
  const { c } = useTheme();
  const [read, setRead] = useState(false);
  return (
    <Screen title="Уведомления" right={<TextLink label="Прочитать все" onPress={() => setRead(true)} />}>
      {notifications.map((n, i) => {
        const head = i === 0 || notifications[i - 1].day !== n.day ? n.day : null;
        const unread = 'unread' in n && n.unread && !read;
        const strong = 'strong' in n && n.strong;
        return (
          <View key={n.title} style={{ gap: 12 }}>
            {head ? <Text variant="bodySm" weight={600} color="textBody" style={{ paddingHorizontal: 4, paddingTop: 4 }}>{head}</Text> : null}
            <Card pad={16} onPress={'href' in n ? () => router.push(n.href as never) : undefined} style={{ flexDirection: 'row', gap: 14 }}>
              {strong ? (
                <Gradient style={{ width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Icon name={n.icon as IconName} size={22} color="onPrimary" /></Gradient>
              ) : (
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={n.icon as IconName} size={22} /></View>
              )}
              <View style={{ flex: 1, gap: 2, paddingRight: 12 }}>
                <Text variant="title3" size={15}>{n.title}</Text>
                <Text variant="bodySm" color="textPrimary">{n.text}</Text>
                <Text variant="caption" color="textBody" style={{ marginTop: 4 }}>{n.time}</Text>
              </View>
              {unread ? <View style={{ position: 'absolute', top: 18, right: 18, width: 8, height: 8, borderRadius: 4, backgroundColor: c.primary }} /> : null}
            </Card>
          </View>
        );
      })}
    </Screen>
  );
}
