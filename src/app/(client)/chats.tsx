import { router } from 'expo-router';
import { View } from 'react-native';

import { Card, Divider, Glass, Gradient, Icon, LogoTile, Pressable, Screen, Text } from '@/components';
import { agencyById, chats } from '@/data/mock';

export default function Chats() {
  return (
    <Screen tabs heading="Сообщения">
      <Glass style={{ height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }}>
        <Icon name="search" size={20} color="textBody" />
        <Text variant="body" color="textMuted">Поиск по чатам</Text>
      </Glass>
      <Card gap={8} pad={16}>
        {chats.map((ch, i) => {
          const a = agencyById(ch.id);
          return (
            <View key={ch.id} style={{ gap: 8 }}>
              {i ? <Divider /> : null}
              <Pressable onPress={() => router.push(`/chat/${ch.id}`)} accessibilityRole="button" accessibilityLabel={`Чат: ${a.name}`} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 4 }}>
                <LogoTile initials={a.initials} size={52} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text variant="title3">{a.name}</Text><Text variant="caption" color="textBody">{ch.time}</Text></View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <Text variant="bodySm" color="textBody" numberOfLines={1} style={{ flex: 1 }}>{ch.last}</Text>
                    {ch.unread ? <Gradient style={{ minWidth: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 }}><Text variant="caption" weight={700} color="onPrimary">{ch.unread}</Text></Gradient> : null}
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}
