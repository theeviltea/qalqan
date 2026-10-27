import { View } from 'react-native';

import type { reviews } from '@/data/mock';

import { Avatar } from './Avatar';
import { Stars } from './Controls';
import { Text } from './Text';

/** Review: author, tag and date, stars, text. */
export function ReviewItem({ r }: { r: (typeof reviews)[number] }) {
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Avatar initials={r.initials} />
        <View style={{ flex: 1 }}>
          <Text variant="title3" size={15}>{r.name}</Text>
          <Text variant="bodySm" size={13} color="textBody">{r.tag} · {r.date}</Text>
        </View>
        <Stars value={r.stars} />
      </View>
      <Text variant="body" size={15} color="textPrimary">{r.text}</Text>
    </View>
  );
}

