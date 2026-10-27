import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Field, Gradient, Icon, Pressable, Screen, Stars, Text, type IconName } from '@/components';
import { useTheme } from '@/theme';

const labels = ['', 'Плохо', 'Так себе', 'Нормально', 'Хорошо', 'Отлично'];
const likes: [IconName, string][] = [['clock', 'Пунктуаль­ность'], ['smile', 'Вежливость'], ['target', 'Контроль объекта'], ['flash', 'Быстрый отклик']];

export default function WriteReview() {
  const { c } = useTheme();
  const [stars, setStars] = useState(4);
  const [liked, setLiked] = useState([true, true, false, false]);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <Screen back={false} footer={<Button label="Готово" style={{ flex: 1 }} onPress={() => router.replace('/home')} />}>
        <View style={{ alignItems: 'center', gap: 16, paddingTop: 120 }}>
          <Gradient style={{ width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={48} color="onPrimary" /></Gradient>
          <Text variant="title1" size={24} align="center">Спасибо за отзыв</Text>
          <Text variant="body" color="textPrimary" align="center">Он появится на странице агентства после модерации.</Text>
        </View>
      </Screen>
    );
  return (
    <Screen title="Отзыв о смене" subtitle="Барыс Охрана · 28 октября" footer={<Button label="Отправить отзыв" style={{ flex: 1 }} onPress={() => setSent(true)} />} footerNote="Отзыв появится после модерации">
      <Card>
        <Text variant="title3" size={17} align="center">Как прошла охрана?</Text>
        <View style={{ alignItems: 'center' }}><Stars value={stars} size={38} onChange={setStars} /></View>
        <Text variant="bodySm" color="textBody" align="center">{labels[stars]}</Text>
      </Card>
      <Card>
        <Text variant="title3">Что понравилось?</Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {likes.map(([icon, l], i) => (
            <Pressable key={l} onPress={() => setLiked(liked.map((v, k) => (k === i ? !v : v)))} accessibilityRole="checkbox" accessibilityState={{ checked: liked[i] }} accessibilityLabel={l} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
              {liked[i] ? <Gradient style={{ width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} color="onPrimary" /></Gradient> : <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: c.input, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} /></View>}
              <Text variant="caption" weight={400} align="center">{l}</Text>
            </Pressable>
          ))}
        </View>
      </Card>
      <Card>
        <Field label="Комментарий" onSurface multiline value={text} onChangeText={setText} placeholder="Расскажите, что было хорошо и что улучшить" maxLength={1000} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="bodySm" size={13} color="textBody">Не указывайте адреса и коды доступа</Text>
          <Text variant="bodySm" size={13} color="textBody">{text.length} / 1000</Text>
        </View>
      </Card>
    </Screen>
  );
}
