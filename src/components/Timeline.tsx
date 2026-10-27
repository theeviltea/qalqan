import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Text } from './Text';

export type Event = { time: string; title: string; sub?: string };

/** Duty log: dots on a line; the current event is a ring. */
export function Timeline({ events }: { events: Event[] }) {
  const { c } = useTheme();
  return (
    <View>
      {events.map((e, i) => {
        const last = i === events.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 12, alignItems: 'center' }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 4, backgroundColor: i === 0 ? '#FFFFFF' : c.primary, borderWidth: i === 0 ? 3 : 0, borderColor: c.primary }} />
              {last ? null : <View style={{ flex: 1, width: 2, backgroundColor: c.backDarker, marginTop: 4 }} />}
            </View>
            <View style={{ flex: 1, paddingBottom: last ? 0 : 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <Text variant="title3" size={15} style={{ flexShrink: 1 }}>{e.title}</Text>
                <Text variant="bodySm" color="textBody">{e.time}</Text>
              </View>
              {e.sub ? <Text variant="bodySm" size={13} color="textBody">{e.sub}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
