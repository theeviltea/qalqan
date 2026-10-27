import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { fontFamily, useTheme } from '@/theme';

import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Pressable } from './Pressable';
import { Text } from './Text';

type Props = TextInputProps & { label?: string; icon?: IconName; onSurface?: boolean; error?: string; hint?: string; multiline?: boolean };

/** Field: label above, 52 tall. On the screen background it is glass; inside a card it is `input` with no border. */
export function Field({ label, icon, onSurface, error, hint, multiline, style, ...rest }: Props) {
  const { c } = useTheme();
  const [focus, setFocus] = useState(false);
  const border = error ? { borderWidth: 2, borderColor: c.danger } : focus ? { borderWidth: 2, borderColor: c.primary } : null;
  const input = (
    <View style={{ flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center', minHeight: multiline ? 96 : 52, paddingHorizontal: 16, paddingVertical: multiline ? 12 : 0, gap: 8 }}>
      <TextInput
        {...rest}
        multiline={multiline}
        accessibilityLabel={label}
        placeholderTextColor={c.textMuted}
        onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
        style={[{ flex: 1, fontFamily: fontFamily('sans', 400), fontSize: 16, color: c.textHeadline, outlineStyle: 'none', minHeight: multiline ? 72 : undefined, textAlignVertical: multiline ? 'top' : 'center' } as object, style]}
      />
      {icon ? <Icon name={icon} size={20} color="textBody" /> : null}
    </View>
  );
  return (
    <View style={{ gap: 6 }}>
      {label ? <Text variant="bodySm" weight={500} color="textBody">{label}</Text> : null}
      {error ? <View style={{ borderRadius: 14, backgroundColor: c.dangerBack, ...border }}>{input}</View>
        : onSurface ? <View style={{ borderRadius: 14, backgroundColor: c.input, ...border }}>{input}</View>
        : <Glass style={[{ borderRadius: 14, borderColor: 'rgba(255,255,255,0.85)' }, border]}>{input}</Glass>}
      {error || hint ? <Text variant="bodySm" size={13} weight={error ? 600 : 400} color={error ? 'dangerText' : 'textBody'}>{error ?? hint}</Text> : null}
    </View>
  );
}

/** Select-like row that opens a picker (prototype: cycles options). */
export function Select({ label, value, icon = 'chevron-down', onSurface, onPress }: { label?: string; value: string; icon?: IconName; onSurface?: boolean; onPress?: () => void }) {
  const { c } = useTheme();
  const inner = (
    <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 14, gap: 8 }}>
      <Text variant="body" numberOfLines={1} style={{ flex: 1, minWidth: 0 }}>{value}</Text>
      <Icon name={icon} size={20} color="textBody" />
    </View>
  );
  return (
    <View style={{ gap: 6, flex: 1 }}>
      {label ? <Text variant="bodySm" weight={500} color="textBody">{label}</Text> : null}
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${label ?? ''} ${value}`}>
        {onSurface ? <View style={{ borderRadius: 14, backgroundColor: c.input }}>{inner}</View> : <Glass style={{ borderRadius: 14 }}>{inner}</Glass>}
      </Pressable>
    </View>
  );
}
