import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Glass, Gradient, Icon, IconButton, Orbs, Pressable, StatusChip, Text } from '@/components';
import { agencyById } from '@/data/mock';
import { useStore } from '@/data/store';
import { fontFamily, useTheme } from '@/theme';

export default function Chat() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = agencyById(id);
  const { messages, send } = useStore();
  const [text, setText] = useState('');
  const scroll = useRef<ScrollView>(null);
  const submit = () => {
    if (!text.trim()) return;
    send(text.trim());
    setText('');
    setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 50);
  };
  return (
    <View style={{ flex: 1, backgroundColor: c.back }}>
      <Orbs />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Glass border={false} style={{ backgroundColor: 'rgba(255,255,255,0.38)', paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ marginLeft: -10 }}><IconButton name="arrow-left" label="Назад" tone="input" onPress={() => router.back()} /></View>
          <View style={{ flex: 1 }}>
            <Text variant="title2" numberOfLines={1}>{a.name}</Text>
            <Text variant="bodySm" size={13} color="textBody">Обычно отвечает за {a.reply}</Text>
          </View>
          <IconButton name="call" label="Позвонить агентству" />
        </Glass>
        <ScrollView ref={scroll} contentContainerStyle={{ padding: 20, gap: 10 }}>
          <Pressable onPress={() => router.push('/order/1047')} accessibilityRole="button">
            <Glass style={{ borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Icon name="orders" size={20} color="primary" />
              <View style={{ flex: 1 }}>
                <Text variant="title3" size={14}>Заявка № 1042 · Охрана офиса</Text>
                <Text variant="caption" weight={400} color="textBody">28 окт, 08:00—20:00 · 2 поста</Text>
              </View>
              <StatusChip label="Подтверждена" kind="plain" />
            </Glass>
          </Pressable>
          <Text variant="caption" weight={400} color="textBody" align="center" style={{ marginTop: 10 }}>Вчера</Text>
          {messages.map((m, i) =>
            m.me ? (
              <Gradient key={i} style={{ alignSelf: 'flex-end', maxWidth: '78%', borderRadius: 20, borderBottomRightRadius: 6, paddingHorizontal: 14, paddingVertical: 10 }}>
                <Text variant="body" size={15} color="onPrimary">{m.text}</Text>
                <Text variant="caption" weight={400} color="#D3DEFA" align="right">{m.time}</Text>
              </Gradient>
            ) : (
              <Glass key={i} style={{ alignSelf: 'flex-start', maxWidth: '78%', borderRadius: 20, borderBottomLeftRadius: 6, paddingHorizontal: 14, paddingVertical: 10 }}>
                <Text variant="body" size={15}>{m.text}</Text>
                <Text variant="caption" weight={400} color="textBody" align="right">{m.time}</Text>
              </Glass>
            ),
          )}
        </ScrollView>
        <Glass border={false} style={{ backgroundColor: 'rgba(246,247,252,0.6)', paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 20) + 14, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <IconButton name="add" label="Прикрепить" />
          <Glass style={{ flex: 1, height: 48, borderRadius: 16, justifyContent: 'center', paddingHorizontal: 16 }}>
            <TextInput value={text} onChangeText={setText} onSubmitEditing={submit} placeholder="Сообщение" placeholderTextColor={c.textMuted} accessibilityLabel="Сообщение" returnKeyType="send" style={{ fontFamily: fontFamily('sans'), fontSize: 16, color: c.textHeadline, outlineStyle: 'none' } as object} />
          </Glass>
          <Pressable onPress={submit} accessibilityRole="button" accessibilityLabel="Отправить">
            <Gradient style={{ width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}><Icon name="upload" size={22} color="onPrimary" /></Gradient>
          </Pressable>
        </Glass>
      </KeyboardAvoidingView>
    </View>
  );
}
