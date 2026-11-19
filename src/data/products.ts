export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  tag?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'zimnyaya-skazka',
    name: 'Подарочный бокс «Зимняя сказка»',
    price: 7500,
    description: 'Белоснежный бокс со свечами, птичкой, шишками и зимней зеленью. Светится даже без гирлянды.',
    image: '/images/zimnyaya-skazka.jpg',
    tag: 'Хит продаж',
  },
  {
    id: 'moroznoe-utro',
    name: 'Композиция «Морозное утро»',
    price: 2000,
    description: 'Ёлочные ветки с санками и ягодами в красном кашпо с росписью. Настроение декабря в миниатюре.',
    image: '/images/moroznoe-utro.jpg',
  },
  {
    id: 'rozovyj-inej',
    name: 'Композиция со свечой «Розовый иней»',
    price: 3000,
    description: 'Нежная композиция с розовыми ягодами, бусинами и свечой. Уютный вечер гарантирован.',
    image: '/images/rozovyj-inej.jpg',
    tag: 'Новинка',
  },
  {
    id: 'elochnka-balerina',
    name: 'Ёлочка из шишек «Балерина»',
    price: 3000,
    description: 'Авторская ёлочка из шишек, жемчуга и винтажных шаров с фигуркой балерины. Собирается 2 дня.',
    image: '/images/elochnka-balerina.jpg',
    tag: 'Под заказ',
  },
]

export const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
