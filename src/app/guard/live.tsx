import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Card, Divider, Footer, Glass, Gradient, Icon, IconButton, MapMock, Pressable, SectionTitle, Text, Timeline } from '@/components';
import { journal } from '@/data/mock';
import { useCountdown } from '@/data/useCountdown';
import { useTheme } from '@/theme';

export default function GuardLive() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const time = useCountdown();
  const guard = (ini: string, n: string, m: string, strong: boolean, chat?: boolean) => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Avatar initials={ini} size={48} strong={strong} />
      <View style={{ flex: 1 }}><Text variant="title3">{n}</Text><Text variant="bodySm" size={13} color="textBody">{m}</Text></View>
      {chat ? <IconButton name="message" label={`Написать: ${n}`} tone="input" onPress={() => router.push('/chat/barys')} /> : null}
      <IconButton name="call" label={`Позвонить: ${n}`} tone="input" />
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: c.back }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={{ height: 380, overflow: 'hidden', alignItems: 'center' }}><MapMock width={480} height={380} /></View>
        <View style={{ marginTop: -50, borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: c.back, paddingHorizontal: 20, paddingTop: 10, gap: 12 }}>
          <View style={{ alignItems: 'center' }}><View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: c.backDarker }} /></View>
          <Glass style={{ borderRadius: 24 }}>
            <Gradient style={{ paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.primaryLight }} /><Text variant="bodySm" size={13} weight={600} color="onPrimary">На посту с 08:00</Text></View>
              <Text variant="bodySm" size={13} weight={600} color="onPrimary">Барыс Охрана</Text>
            </Gradient>
            <View style={{ padding: 16, paddingTop: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View><Text variant="number" size={28} accessibilityLabel={`До конца смены ${time}`}>{time}</Text><Text variant="bodySm" color="textBody">до конца смены · 08:00—20:00</Text></View>
                <Text variant="bodySm" color="textBody" align="right">2 поста{'\n'}БЦ «Нурлы Тау»</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: c.backDarker, marginTop: 12 }}><View style={{ width: '52%', height: 6, borderRadius: 3, backgroundColor: c.primary }} /></View>
            </View>
          </Glass>
          <Card pad={14}>
            {guard('ЕА', 'Ерлан Абдрахманов', 'Пост 1 · ресепшен', true, true)}
            <Divider />
            {guard('ТС', 'Тимур Садыков', 'Пост 2 · обходы парковки', false)}
          </Card>
          <Card pad={14}>
            <SectionTitle title="Журнал" action="Весь журнал" onAction={() => router.push('/guard/journal')} />
            <Timeline events={journal.slice(0, 2)} />
          </Card>
          <Pressable onPress={() => router.push('/guard/done')} accessibilityRole="button" style={{ alignItems: 'center', padding: 4 }}>
            <Text variant="bodySm" size={13} color="textMuted">Демо: показать завершение смены</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', left: 20, right: 20, top: insets.top + 12, flexDirection: 'row', justifyContent: 'space-between' }}>
        <IconButton name="arrow-left" label="Назад" onPress={() => (router.canGoBack() ? router.back() : router.replace('/orders'))} />
        <Glass style={{ height: 44, borderRadius: 14, paddingHorizontal: 14, justifyContent: 'center' }}><Text variant="bodySm" weight={600}>Заявка № 1042</Text></Glass>
      </View>
      <Footer>
        <Button label="Связаться с диспетчером" icon="call" variant="secondary" style={{ flex: 1 }} />
        <Pressable onPress={() => router.push('/guard/alarm')} accessibilityRole="button" accessibilityLabel="Тревога: вызвать группу реагирования" style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: c.danger, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="alert" size={24} color="onPrimary" />
        </Pressable>
      </Footer>
    </View>
  );
}
