import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { IconButton } from './Button';
import { Steps } from './Controls';
import { Glass } from './Glass';
import { Orbs } from './Orbs';
import { Text } from './Text';

type Props = {
  /** Glass navbar title. Omit for screens with a large in-content title. */
  title?: string;
  subtitle?: string;
  /** Show the back button (default true when `title` is set). */
  back?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  /** Glass progress under the navbar, e.g. { step: 2, of: 3 }. */
  steps?: { step: number; of?: number };
  /** Large Geologica title at the top of the content (screens without a navbar or under it). */
  heading?: string;
  lead?: string;
  footer?: ReactNode;
  footerNote?: ReactNode;
  /** Leaves room for the floating tab bar. */
  tabs?: boolean;
  scroll?: boolean;
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  /** Replaces the background (e.g. the gradient splash). */
  background?: ReactNode;
};

/** Screen on `back` with light orbs, optional glass navbar, scroll content (sides 20, gap 12) and a glass footer. */
export function Screen({ title, subtitle, back, onBack, right, steps, heading, lead, footer, footerNote, tabs, scroll = true, children, contentStyle, background }: Props) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const showBack = back ?? !!title;
  const top = insets.top + 12;
  const header = title !== undefined || showBack ? (
    <Glass border={false} style={{ backgroundColor: 'rgba(255,255,255,0.38)', paddingTop: top, paddingHorizontal: 20, paddingBottom: steps ? 16 : 12, gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44 }}>
        {showBack ? (
          <View style={{ marginLeft: -10 }}>
            <IconButton name="arrow-left" label="Назад" tone="input" onPress={onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/')))} />
          </View>
        ) : null}
        <View style={{ flex: 1, minWidth: 0 }}>
          {title ? <Text variant="title2" numberOfLines={1} accessibilityRole="header">{title}</Text> : null}
          {subtitle ? <Text variant="bodySm" size={13} color="textBody" numberOfLines={1}>{subtitle}</Text> : null}
        </View>
        {steps ? <Text variant="bodySm" color="textBody">{steps.step} из {steps.of ?? 3}</Text> : right}
      </View>
      {steps ? <Steps step={steps.step} of={steps.of} /> : null}
    </Glass>
  ) : null;

  const body = (
    <>
      {heading ? (
        <View style={{ gap: 8, marginBottom: 4 }}>
          <Text variant="title1" size={24} accessibilityRole="header">{heading}</Text>
          {lead ? <Text variant="body" color="textBody" size={15}>{lead}</Text> : null}
        </View>
      ) : null}
      {children}
    </>
  );
  const pad = { paddingHorizontal: 20, paddingTop: header ? 16 : top + 8, paddingBottom: (footer ? 140 : 32) + (tabs ? 110 : 0), gap: 12 };

  return (
    <View style={{ flex: 1, backgroundColor: c.back, overflow: 'hidden' }}>
      {background ?? <Orbs />}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {header}
        {scroll ? (
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[pad, contentStyle]}>{body}</ScrollView>
        ) : (
          <View style={[{ flex: 1 }, pad, contentStyle]}>{body}</View>
        )}
        {footer ? <Footer note={footerNote}>{footer}</Footer> : null}
      </KeyboardAvoidingView>
    </View>
  );
}

export function Footer({ children, note }: { children: ReactNode; note?: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <Glass border={false} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(246, 247, 252, 0.55)', paddingHorizontal: 20, paddingTop: 14, paddingBottom: Math.max(insets.bottom, 20) + 14, gap: 10 }}>
      {typeof note === 'string' ? <Text variant="bodySm" size={13} color="textBody" align="center">{note}</Text> : note}
      <View style={{ flexDirection: 'row', gap: 8 }}>{children}</View>
    </Glass>
  );
}

/** Two-up row of buttons that share the width. */
export const grow = { flex: 1 } as const;
