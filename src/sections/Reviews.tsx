import { useEffect, useState } from 'react'

const REVIEWS = [
  {
    name: 'Ольга М.',
    text: 'Заказывала бокс «Зимняя сказка» подруге на Новый год - она до сих пор не верит, что это не из фирменного магазина. Фото перед отправкой прислали, упаковка - сказка.',
    bouquet: '«Зимняя сказка»',
  },
  {
    name: 'Игорь П.',
    text: 'Брали три композиции в подарок учителям. Собрали за день, доставили к вечеру, каждую завернули отдельно. Выглядит дорого, стоит умеренно.',
    bouquet: 'Три композиции для учителей',
  },
  {
    name: 'Наталья Р.',
    text: 'Ёлочка «Балерина» теперь украшает наш дом каждый декабрь. Дочка назвала её Снежинкой и велит всем в доме её не трогать.',
    bouquet: 'Ёлочка «Балерина»',
  },
]

export function Reviews() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length)

  return (
    <section id="reviews" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="reveal text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Отзывы</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Что говорят клиенты</h2>
      </div>
      <div className="reveal relative mt-10 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-accent/30" aria-hidden="true">
          <path d="M10 8c-3 1-5 3.5-5 7v1h5v-6H7.5C8 9 9 8.6 10 8.5V8Zm9 0c-3 1-5 3.5-5 7v1h5v-6h-2.5c.5-1 1.5-1.4 2.5-1.5V8Z" />
        </svg>
        <blockquote className="mt-4 min-h-[120px] md:min-h-[100px]">
          <p className="font-display text-xl leading-relaxed md:text-2xl">«{REVIEWS[index].text}»</p>
          <footer className="mt-4 text-sm font-semibold text-muted-foreground">
            {REVIEWS[index].name} · {REVIEWS[index].bouquet}
          </footer>
        </blockquote>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2" role="group" aria-label="Выбор отзыва">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Отзыв ${i + 1}`}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  index === i ? 'w-8 bg-accent' : 'w-2.5 bg-border hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
