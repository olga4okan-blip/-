const ITEMS = [
  {
    title: 'Только ручная работа',
    text: 'Ни одной одинаковой композиции - каждую собираем вручную и присылаем фото на согласование.',
    icon: (
      <>
        <path d="M7 11V6a3 3 0 0 1 6 0" strokeLinecap="round" />
        <path d="M10 8.5 4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Безопасные материалы',
    text: 'Стабилизированная зелень, качественные свечи и гипоаллергенный декор - можно ставить рядом с детьми.',
    icon: (
      <path d="M12 3c-3 3.5-4.5 6.5-4.5 9.5A4.5 4.5 0 0 0 12 17a4.5 4.5 0 0 0 4.5-4.5C16.5 9.5 15 6.5 12 3Zm0 14v4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Открытка от руки',
    text: 'Напишем тёплые слова от вашего имени и упакуем подарок в красивую упаковку с лентой.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Сборка под бюджет',
    text: 'Назовите сумму и повод - предложим три варианта композиции в течение часа.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">О композициях</p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-snug md:text-4xl">
            Каждый подарок собираем как для своей семьи
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            «Новогодние подарки с любовью» - тюменская мастерская праздничных композиций. Мы сами
            отбираем шишки, винтажные шары и свечи, а потом превращаем их в подарки, которые не
            хочется дарить - хочется оставить себе.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="reveal rounded-2xl border border-border bg-card p-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-primary"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
