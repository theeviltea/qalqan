import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Divider, Footer, Gradient, Icon, IconButton, LogoTile, Orbs, Pressable, ReviewItem, Row, SectionTitle, Text, Verified } from '@/components';
import { agencyById, reviews, tenge } from '@/data/mock';
import { useStore } from '@/data/store';
import { useTheme } from '@/theme';

export default function AgencyPage() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = agencyById(id);
  const { setOrder } = useStore();
  const stat = (v: React.ReactNode, l: string, onPress?: () => void) => (
    <Pressable onPress={onPress} disabled={!onPress} style={{ flex: 1, backgroundColor: c.back, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12 }}>
      {v}
      <Text variant="caption" weight={400} color="textBody">{l}</Text>
    </Pressable>
  );
  return (
    <View style={{ flex: 1, backgroundColor: c.back }}>
      <Orbs />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Gradient name="gradDeep" style={{ height: 260, paddingTop: insets.top + 12, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconButton name="arrow-left" label="Назад" tone="onDark" onPress={() => router.back()} />
            <IconButton name="share" label="Поделиться" tone="onDark" />
          </View>
          <View style={{ position: 'absolute', right: 20, bottom: 44, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text variant="caption" weight={500} color="onPrimary">Фото команды · 1 / 12</Text>
          </View>
        </Gradient>
        <View style={{ paddingHorizontal: 20, marginTop: -28, gap: 12 }}>
          <Card>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <LogoTile initials={a.initials} size={56} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Text variant="title2" size={20} accessibilityRole="header">{a.name}</Text>{a.verified ? <Verified size={18} /> : null}</View>
                <Text variant="bodySm" color="textBody">Алматы · на рынке с {a.since}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {stat(<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Text variant="number" size={20}>{a.rating}</Text><Icon name="star-filled" size={16} filled color="primary" /></View>, `${a.reviews} отзывов`, () => router.push(`/reviews/${a.id}`))}
              {stat(<Text variant="number" size={20}>{a.staff}</Text>, 'охранников')}
              {stat(<Text variant="number" size={20}>{a.reply}</Text>, 'ответ на заявку')}
            </View>
          </Card>
          <Card>
            <SectionTitle title="Услуги и цены" />
            {a.services.map((s, i) => (
              <View key={s.name} style={{ gap: 14 }}>
                {i ? <Divider /> : null}
                <Pressable onPress={() => { setOrder({ service: i }); router.push('/order/service'); }} accessibilityRole="button" accessibilityLabel={`${s.name}, ${tenge(s.price)} в час`} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text variant="title3" size={15}>{s.name}</Text>
                    <Text variant="bodySm" size={13} color="textBody">{s.desc}</Text>
                  </View>
                  <Text variant="title3" size={15}>{tenge(s.price)}/ч</Text>
                  <Icon name="chevron-right" size={18} color="textBody" />
                </Pressable>
              </View>
            ))}
          </Card>
          <Card>
            <SectionTitle title="О компании" />
            <Text variant="body" size={15} color="textPrimary">{a.about}</Text>
            <Row label="Лицензия" value={<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Text variant="title3" size={15}>Проверена</Text><Icon name="check" size={16} color="successText" /></View>} />
            <Row label="Режим" value="круглосуточно" />
            <Row label="Группа реагирования" value="есть, до 15 мин" />
          </Card>
          <Card>
            <SectionTitle title="Отзывы" action={`Все ${a.reviews}`} onAction={() => router.push(`/reviews/${a.id}`)} />
            <ReviewItem r={reviews[0]} />
            <Divider />
            <ReviewItem r={reviews[1]} />
          </Card>
        </View>
      </ScrollView>
      <Footer>
        <Button label="Написать" variant="secondary" onPress={() => router.push(`/chat/${a.id}`)} />
        <Button label="Заказать охрану" style={{ flex: 1 }} onPress={() => router.push('/order/service')} />
      </Footer>
    </View>
  );
}
