import { View } from 'react-native';

import type { Agency } from '@/data/mock';

import { LogoTile, Verified } from './Avatar';
import { Glass } from './Glass';
import { Icon } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Agency in search and on Home: logo 72, name + verified, one-line description, price and rating. */
export function AgencyCard({ agency, onPress }: { agency: Agency; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${agency.name}, ${agency.price}, рейтинг ${agency.rating}`}>
      <Glass style={{ borderRadius: 24, padding: 14, flexDirection: 'row', gap: 14 }}>
        <LogoTile initials={agency.initials} />
        <View style={{ flex: 1, minWidth: 0, justifyContent: 'space-between' }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text variant="title3" numberOfLines={1}>{agency.name}</Text>
              {agency.verified ? <Verified /> : null}
            </View>
            <Text variant="bodySm" color="textBody" numberOfLines={1}>{agency.tagline}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text variant="title3" size={15}>{agency.price}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Icon name="star-filled" size={16} filled color="primary" />
              <Text variant="title3" size={15}>{agency.rating}</Text>
              <Text variant="bodySm" color="textBody">({agency.reviews})</Text>
            </View>
          </View>
        </View>
      </Glass>
    </Pressable>
  );
}
