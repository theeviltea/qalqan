import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Gradient } from './Gradient';
import { Icon } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

export function Checkbox({ on }: { on: boolean }) {
  const { c } = useTheme();
  return on ? (
    <View style={{ width: 22, height: 22, borderRadius: 7, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="check" size={14} color="onPrimary" />
    </View>
  ) : (
    <View style={{ width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: c.stroke }} />
  );
}

export function Radio({ on }: { on: boolean }) {
  const { c } = useTheme();
  return <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: on ? 7 : 2, borderColor: on ? c.primary : c.stroke }} />;
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  const { c } = useTheme();
  const knob = <View style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(10, 34, 102, 0.2)' }} />;
  return (
    <Pressable onPress={() => onChange(!on)} accessibilityRole="switch" accessibilityLabel={label} accessibilityState={{ checked: on }}>
      {on ? <Gradient style={{ width: 50, height: 30, borderRadius: 15 }}>{knob}</Gradient> : <View style={{ width: 50, height: 30, borderRadius: 15, backgroundColor: c.backDarker }}>{knob}</View>}
    </Pressable>
  );
}

export function Stepper({ value, onChange, min = 1, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  const { c } = useTheme();
  const b = (name: 'minus' | 'add', d: number, label: string) => (
    <Pressable onPress={() => onChange(Math.min(max, Math.max(min, value + d)))} accessibilityRole="button" accessibilityLabel={label} style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={name} size={18} />
    </Pressable>
  );
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: c.input, borderRadius: 14, padding: 4 }}>
      {b('minus', -1, 'Меньше')}
      <Text variant="title2" align="center" style={{ width: 36 }}>{value}</Text>
      {b('add', 1, 'Больше')}
    </View>
  );
}

/** Step progress: N segments, done ones in primary. */
export function Steps({ step, of = 3 }: { step: number; of?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 6 }} accessibilityLabel={`Шаг ${step} из ${of}`}>
      {Array.from({ length: of }, (_, i) => <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < step ? c.primary : c.backDarker }} />)}
    </View>
  );
}

/** Segmented control on back-darker track. */
export function Segmented({ options, value, onChange }: { options: string[]; value: number; onChange: (i: number) => void }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', padding: 4, borderRadius: 14, backgroundColor: c.backDarker }} accessibilityRole="tablist">
      {options.map((o, i) => (
        <Pressable key={o} onPress={() => onChange(i)} accessibilityRole="tab" accessibilityState={{ selected: i === value }} style={{ flex: 1, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: i === value ? '#FFFFFF' : 'transparent' }}>
          <Text variant="bodySm" size={14} weight={i === value ? 600 : 500} color={i === value ? 'textHeadline' : 'textBody'}>{o}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function Stars({ value, size = 14, onChange }: { value: number; size?: number; onChange?: (v: number) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: onChange ? 4 : 2 }} accessibilityLabel={`Оценка ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const star = <Icon name="star-filled" size={size} filled color={i <= value ? 'primary' : 'backDarker'} />;
        return onChange ? (
          <Pressable key={i} onPress={() => onChange(i)} accessibilityRole="button" accessibilityLabel={`${i} из 5`} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>{star}</Pressable>
        ) : <View key={i}>{star}</View>;
      })}
    </View>
  );
}
