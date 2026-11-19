const STEPS = [
  {
    n: '01',
    title: 'Вы оформляете заказ',
    text: 'На сайте, по телефону или в мессенджере. Менеджер подтвердит состав и наличие за 10 минут.',
  },
  {
    n: '02',
    title: 'Мы собираем подарок',
    text: 'Фотографируем готовую композицию и отправляем вам на согласование перед отправкой.',
  },
  {
    n: '03',
    title: 'Курьер вручает подарок',
    text: 'Доставим по Тюмени точно ко времени или подготовим к самовывозу с бережной упаковкой.',
  },
]

export function Delivery() {
  return (
    <section id="delivery" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Доставка</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Как мы работаем</h2>
          <p className="mt-4 text-primary-foreground/80">
            По Тюмени - доставка в день заказа, до 20:00. Бесплатно при заказе от 3 000 ₽, иначе
            300 ₽ по городу. Самовывоз - бесплатно, упакуем в красивую упаковку. Работаем ежедневно
            с 9:00 до 21:00.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.n} className="reveal rounded-2xl border border-primary-foreground/15 p-6" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="font-display text-3xl font-semibold text-accent">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 rounded-2xl bg-primary-foreground/10 p-6 text-center md:p-8">
          <p className="font-display text-2xl font-semibold md:text-3xl">
            Нужен подарок сегодня к определённому времени?
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary-foreground/75">
            Позвоните до 19:00 - успеем собрать и привезти даже самый сложный заказ.
          </p>
          <a
            href="tel:+79969224518"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            +7 (996) 922-45-18
          </a>
        </div>
      </div>
    </section>
  )
}
