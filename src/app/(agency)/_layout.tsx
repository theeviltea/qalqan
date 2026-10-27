import { Tabs } from 'expo-router';

import { TabBar } from '@/components';
import { useTheme } from '@/theme';

/** Agency cabinet: Заявки · Календарь · Выплаты · Профиль. */
export default function AgencyTabs() {
  const { c } = useTheme();
  return (
    <Tabs backBehavior="history" screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: c.back }, animation: 'fade' }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="requests" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="payouts" />
      <Tabs.Screen name="cabinet" />
    </Tabs>
  );
}
