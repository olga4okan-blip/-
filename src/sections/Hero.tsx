export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:pb-24 md:pt-36">
        <div className="reveal">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            Авторские композиции в Тюмени
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] md:text-6xl">
            Новогодние подарки, собранные с любовью
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/80">
            Каждая композиция - ручная работа: свечи, шишки, зимняя зелень и винтажные украшения.
            Доставим по Тюмени за день или соберём набор лично под ваших близких.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              Смотреть каталог
            </a>
            <a
              href="#delivery"
              className="rounded-full border border-primary-foreground/40 px-7 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Условия доставки
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              ['120+', 'композиций в год'],
              ['4.9', 'рейтинг на картах'],
              ['1 день', 'доставка по Тюмени'],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-semibold text-accent">{num}</dt>
                <dd className="mt-1 text-xs text-primary-foreground/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="reveal relative">
          <div className="overflow-hidden rounded-[2rem] border-4 border-primary-foreground/15 shadow-2xl">
            <img
              src="images/zimnyaya-skazka.jpg"
              alt="Подарочный бокс «Зимняя сказка» со свечами и птичкой"
              className="h-[420px] w-full object-cover md:h-[520px]"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl bg-background px-5 py-4 text-foreground shadow-xl md:-left-8">
            <p className="text-xs font-medium text-muted-foreground">Подарок недели</p>
            <p className="font-display text-lg font-semibold">«Зимняя сказка» — 7 500 ₽</p>
          </div>
        </div>
      </div>
    </section>
  )
}
