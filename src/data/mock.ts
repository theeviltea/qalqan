// Demo content for the clickable prototype. Names, prices and ratings are examples.
export type Agency = { id: string; initials: string; name: string; tagline: string; price: string; rating: string; reviews: number; verified: boolean; since: number; staff: number; reply: string; about: string; services: Service[] };
export type Service = { name: string; desc: string; price: number };

export const services: Service[] = [
  { name: 'Охрана офиса', desc: 'Пост, контроль доступа, обходы', price: 2500 },
  { name: 'Охрана склада', desc: 'Круглосуточно, видеонаблюдение', price: 2200 },
  { name: 'Мероприятие', desc: 'Фейсконтроль, сопровождение гостей', price: 3500 },
];

const about = 'Охраняем бизнес-центры, склады и мероприятия в Алматы и области. Своя диспетчерская 24/7, группа быстрого реагирования, отчёт о смене в приложении.';
export const agencies: Agency[] = [
  { id: 'barys', initials: 'БО', name: 'Барыс Охрана', tagline: 'Офисы, склады, мероприятия', price: 'от 2 500 ₸/ч', rating: '4,9', reviews: 128, verified: true, since: 2012, staff: 140, reply: '12 мин', about, services },
  { id: 'berkut', initials: 'БС', name: 'Беркут Секьюрити', tagline: 'Личная охрана и сопровождение', price: 'от 3 000 ₸/ч', rating: '4,8', reviews: 96, verified: true, since: 2015, staff: 60, reply: '20 мин', about, services },
  { id: 'alatau', initials: 'АГ', name: 'Алатау Гард', tagline: 'Охрана домов и жилых комплексов', price: 'от 2 200 ₸/ч', rating: '4,6', reviews: 54, verified: true, since: 2018, staff: 85, reply: '25 мин', about, services },
  { id: 'shield', initials: 'SP', name: 'Shield Pro KZ', tagline: 'Пультовая охрана и выезд ГБР', price: 'от 2 800 ₸/ч', rating: '4,5', reviews: 31, verified: false, since: 2020, staff: 40, reply: '30 мин', about, services },
  { id: 'kuzet', initials: 'КС', name: 'Кузет Сервис', tagline: 'Склады и стройплощадки', price: 'от 2 000 ₸/ч', rating: '4,3', reviews: 22, verified: false, since: 2019, staff: 55, reply: '40 мин', about, services },
];
export const agencyById = (id?: string) => agencies.find((a) => a.id === id) ?? agencies[0];

export const reviews = [
  { initials: 'АК', name: 'Алексей К.', tag: 'Охрана офиса', stars: 5, date: '18 окт', text: 'Организовали охрану офиса за день. Сотрудники пунктуальные, отчёт после каждой смены приходит в приложение.' },
  { initials: 'МС', name: 'Марина С.', tag: 'Мероприятие', stars: 5, date: '12 окт', text: 'Охрана на свадьбе на 120 гостей. Приехали заранее, вели себя незаметно и вежливо.' },
  { initials: 'ДА', name: 'Дмитрий А.', tag: 'Охрана склада', stars: 4, date: '5 окт', text: 'Работают хорошо. В первую неделю пришлось уточнить график обходов, но вопрос решили быстро.' },
];

export type OrderStatus = 'live' | 'plain' | 'wait' | 'ok' | 'err';
export const orders = [
  { id: '1042', title: 'Охрана офиса', agency: 'barys', when: 'сегодня, 08:00—20:00', sum: '60 000 ₸', status: 'На посту', kind: 'live' as OrderStatus, href: '/guard/live' },
  { id: '1047', title: 'Охрана склада', agency: 'kuzet', when: '1—7 нояб, 24/7', sum: '369 600 ₸', status: 'Подтверждена', kind: 'plain' as OrderStatus, href: '/order/1047' },
  { id: '1051', title: 'Мероприятие', agency: 'berkut', when: '15 нояб, 18:00—23:00', sum: '70 000 ₸', status: 'Ждёт подтверждения', kind: 'wait' as OrderStatus, href: '/order/1051' },
];
export const pastOrders = [{ id: '1031', title: 'Охрана офиса', agency: 'barys', when: '21 окт', sum: '60 000 ₸', status: 'Завершена', kind: 'ok' as OrderStatus, href: '/guard/done' }];

export const journal = [
  { time: '13:00', title: 'Обход парковки', sub: 'Ерлан А. · замечаний нет' },
  { time: '11:40', title: 'Посетитель без пропуска', sub: 'Тимур С. · направлен в бюро пропусков, 3 этаж' },
  { time: '10:00', title: 'Обход этажей 1–3', sub: 'Ерлан А. · открыт пожарный выход на 2 этаже — закрыт' },
  { time: '08:05', title: 'Обход при приёме поста', sub: 'Все помещения закрыты, сигнализация снята' },
  { time: '08:00', title: 'Пост принят', sub: 'Ерлан А., Тимур С. · прибыли вовремя' },
];

export const chats = [
  { id: 'barys', last: 'Охранники будут в 07:50, встретьте на ресепшене', time: '19:12', unread: 2 },
  { id: 'kuzet', last: 'Договор отправили на почту', time: 'вчера', unread: 0 },
  { id: 'berkut', last: 'Сколько гостей ожидается?', time: 'пн', unread: 1 },
];
export const chatSeed = [
  { me: false, text: 'Здравствуйте! Подтвердили заявку, на посту будут Ерлан и Тимур.', time: '18:40' },
  { me: true, text: 'Отлично. Где им лучше встретиться с администратором?', time: '18:52' },
  { me: false, text: 'Охранники будут в 07:50, встретьте на ресепшене. Пропуска оформит ваш администратор?', time: '19:12' },
];

export const notifications = [
  { icon: 'shield-check', title: 'Охранник на посту', text: 'Ерлан А. принял пост в БЦ «Нурлы Тау» в 08:00', time: '08:02', unread: true, href: '/guard/live', strong: true, day: 'Сегодня' },
  { icon: 'route', title: 'Обход выполнен', text: 'Этажи 1–3: открыт пожарный выход на 2 этаже — закрыт', time: '10:04', unread: true, href: '/guard/journal', day: 'Сегодня' },
  { icon: 'check', title: 'Заявка № 1047 подтверждена', text: 'Кузет Сервис назначил охранника на 1—7 ноября', time: '07:40', href: '/order/1047', day: 'Сегодня' },
  { icon: 'message', title: 'Новое сообщение', text: 'Барыс Охрана: «Охранники будут в 07:50, встретьте на ресепшене»', time: '19:12', href: '/chat/barys', day: 'Вчера' },
  { icon: 'invoice', title: 'Чек об оплате', text: '60 000 ₸ · Kaspi.kz · заявка № 1031', time: '18:30', day: 'Вчера' },
  { icon: 'star', title: 'Оцените смену', text: 'Как прошла охрана офиса 21 октября?', time: '12:00', href: '/review', day: 'Вчера' },
] as const;

export const requests = [
  { id: '1051', title: 'Мероприятие · 4 поста', who: 'ТОО «Арт Ивент»', when: '15 нояб, 18:00—23:00', where: 'Atakent Expo, Тимирязева 42', sum: '70 000 ₸' },
  { id: '1053', title: 'Охрана склада · 1 пост', who: 'Клиент: Данияр М.', when: 'с 3 нояб, круглосуточно', where: 'ул. Рыскулова 103', sum: '52 800 ₸/сут' },
];

export const staff = [
  { initials: 'ЕА', name: 'Ерлан Абдрахманов', meta: 'Стаж 6 лет · 4,9 ★', status: 'На посту', kind: 'live' as const, free: false },
  { initials: 'ТС', name: 'Тимур Садыков', meta: 'Стаж 3 года · 4,8 ★', status: 'На посту', kind: 'live' as const, free: false },
  { initials: 'АН', name: 'Асель Нурланова', meta: 'Стаж 5 лет · 15 нояб — мероприятие', status: 'Запланирована', kind: 'plain' as const, free: true },
  { initials: 'РК', name: 'Руслан Каримов', meta: 'Стаж 4 года', status: 'Свободен', kind: 'wait' as const, free: true },
  { initials: 'ДС', name: 'Дмитрий Соколов', meta: 'Стаж 9 лет', status: 'Свободен', kind: 'wait' as const, free: true },
  { initials: 'МЖ', name: 'Марат Жумабеков', meta: 'Удостоверение истекает 12.11', status: 'Проверить', kind: 'err' as const, free: false },
];

export const payouts = [
  { date: '23 октября', meta: '24 смены · 14 клиентов', sum: '1 116 000 ₸' },
  { date: '16 октября', meta: '21 смена · 12 клиентов', sum: '982 500 ₸' },
  { date: '9 октября', meta: '19 смен · 11 клиентов', sum: '874 000 ₸' },
  { date: '2 октября', meta: '18 смен · 10 клиентов', sum: '801 000 ₸' },
];

export const tenge = (n: number) => `${n.toLocaleString('ru-RU').replace(/ |,/g, ' ')} ₸`;
