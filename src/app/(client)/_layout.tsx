import { Tabs } from 'expo-router';

import { TabBar } from '@/components';
import { useTheme } from '@/theme';

/** Client app: Главная · Заказы · Сообщения · Профиль. */
export default function ClientTabs() {
  const { c } = useTheme();
  return (
    <Tabs backBehavior="history" screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: c.back }, animation: 'fade' }} tabBar={(props) => <TabBar {...props} live={props.state.routes[props.state.index]?.name === 'profile'} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
