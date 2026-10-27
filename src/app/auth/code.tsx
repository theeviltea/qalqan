import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Button, Glass, Screen, Text, TextLink } from '@/components';
import { useStore } from '@/data/store';
import { fontFamily, useTheme } from '@/theme';

/** SMS code: 4 cells. Demo: any 4 digits pass, 0000 shows the error state. */
export default function Code() {
  const { c } = useTheme();
  const { phone, role } = useStore();
  const [code, setCode] = useState('');
  const [left, setLeft] = useState(42);
  const ref = useRef<TextInput>(null);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const error = code === '0000';
  const done = code.length === 4 && !error;
  const next = () => router.push(role === 'agency' ? '/agency-signup/company' : '/auth/name');
  useEffect(() => {
    if (done) next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  return (
    <Screen title="" heading="Введите код" footer={<Button label="Подтвердить" style={{ flex: 1 }} disabled={!done} onPress={next} />}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: -8 }}>
        <Text variant="body" color="textBody" size={15}>Отправили на {phone}.</Text>
        <TextLink label="Изменить" onPress={() => router.back()} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }} accessibilityLabel="Код из SMS">
        {[0, 1, 2, 3].map((i) => (
          <Glass key={i} style={{ width: 64, height: 72, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: i === code.length || error ? 2 : 1, borderColor: error ? c.danger : i === code.length ? c.primary : 'rgba(255,255,255,0.85)' }}>
            <Text variant="number" size={28}>{code[i] ?? ''}</Text>
          </Glass>
        ))}
        <TextInput ref={ref} value={code} onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, 4))} keyboardType="number-pad" autoFocus maxLength={4} accessibilityLabel="Код" style={{ position: 'absolute', inset: 0, opacity: 0.01, fontFamily: fontFamily('sans') } as object} />
      </View>
      {error ? <Text variant="bodySm" weight={600} color="dangerText">Неверный код. Проверьте SMS и попробуйте ещё раз.</Text> : null}
      {left > 0 ? <Text variant="body" color="textBody" size={15}>Отправить код повторно через 0:{String(left).padStart(2, '0')}</Text> : <TextLink label="Отправить код ещё раз" onPress={() => setLeft(42)} />}
      <Text variant="bodySm" size={13} color="textMuted">Демо: любые 4 цифры, 0000 — ошибка.</Text>
    </Screen>
  );
}
