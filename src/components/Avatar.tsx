import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Gradient } from './Gradient';
import { Icon } from './Icon';
import { Text } from './Text';

/** Initials avatar. `strong` = primary fill (people on shift). */
export function Avatar({ initials, size = 40, strong }: { initials: string; size?: number; strong?: boolean }) {
  const { c } = useTheme();
  return (
    <View accessibilityElementsHidden style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: strong ? c.primary : c.backDarker, alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="body" weight={600} size={Math.round(size * 0.36)} color={strong ? 'onPrimary' : 'textHeadline'}>{initials}</Text>
    </View>
  );
}

/** Agency logo placeholder: grad-deep tile with initials. */
export function LogoTile({ initials, size = 72, radius = 16 }: { initials: string; size?: number; radius?: number }) {
  return (
    <Gradient name="gradDeep" style={{ width: size, height: size, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}>
      <Text variant="title1" color="onPrimary" size={Math.round(size * 0.3)}>{initials}</Text>
    </Gradient>
  );
}

/** "Verified agency" shield. */
export function Verified({ size = 16 }: { size?: number }) {
  return (
    <View accessibilityLabel="Проверенное агентство">
      <Icon name="shield-check" size={size} color="primary" />
    </View>
  );
}
