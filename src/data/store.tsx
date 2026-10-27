import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { chatSeed } from './mock';

type Msg = { me: boolean; text: string; time: string };
type Obj = { icon: 'building' | 'warehouse' | 'house' | 'event'; title: string; addr: string; meta: string };

type Store = {
  role: 'client' | 'agency';
  setRole: (r: 'client' | 'agency') => void;
  phone: string;
  setPhone: (p: string) => void;
  name: string;
  setName: (n: string) => void;
  order: { service: number; posts: number; mode: number; pay: number; comment: string };
  setOrder: (p: Partial<Store['order']>) => void;
  cancelled: string[];
  cancel: (id: string) => void;
  messages: Msg[];
  send: (text: string) => void;
  objects: Obj[];
  addObject: (o: Obj) => void;
  requestsDone: Record<string, 'accepted' | 'declined'>;
  resolveRequest: (id: string, r: 'accepted' | 'declined') => void;
};

const Ctx = createContext<Store | null>(null);

/** Prototype state shared across screens (resets on reload). */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<'client' | 'agency'>('client');
  const [phone, setPhone] = useState('+7 701 234 56 78');
  const [name, setName] = useState('Аружан');
  const [order, setOrderState] = useState({ service: 0, posts: 2, mode: 0, pay: 0, comment: 'Пост у ресепшена на 1 этаже, второй — обходы парковки' });
  const [cancelled, setCancelled] = useState<string[]>([]);
  const [messages, setMessages] = useState<Msg[]>(chatSeed);
  const [objects, setObjects] = useState<Obj[]>([
    { icon: 'building', title: 'Офис · БЦ «Нурлы Тау»', addr: 'пр. Аль-Фараби, 17, блок 5Б', meta: '3 заказа · сейчас под охраной' },
    { icon: 'warehouse', title: 'Склад', addr: 'ул. Рыскулова, 103', meta: '1 заказ · с 1 ноября' },
  ]);
  const [requestsDone, setReq] = useState<Record<string, 'accepted' | 'declined'>>({});
  const value = useMemo<Store>(
    () => ({
      role, setRole, phone, setPhone, name, setName,
      order, setOrder: (p) => setOrderState((o) => ({ ...o, ...p })),
      cancelled, cancel: (id) => setCancelled((c) => [...c, id]),
      messages, send: (text) => setMessages((m) => [...m, { me: true, text, time: 'сейчас' }]),
      objects, addObject: (o) => setObjects((l) => [...l, o]),
      requestsDone, resolveRequest: (id, r) => setReq((s) => ({ ...s, [id]: r })),
    }),
    [role, phone, name, order, cancelled, messages, objects, requestsDone],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used inside <StoreProvider>');
  return v;
}
