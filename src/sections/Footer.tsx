export function Footer() {
  return (
    <footer id="contacts" className="scroll-mt-24 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">Подарки с любовью</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/70">
            Авторские новогодние композиции ручной работы с доставкой по Тюмени.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-background/60">Контакты</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="tel:+79969224518" className="text-lg font-semibold hover:underline">
                +7 (996) 922-45-18
              </a>
            </li>
            <li>
              <a href="mailto:hello@podarki-tyumen.example" className="hover:underline">
                hello@podarki-tyumen.example
              </a>
            </li>
            <li className="text-background/70">
              г. Тюмень
              <br />
              Ежедневно 8:00 - 22:00
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-background/60">Мы на картах</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href="https://yandex.ru/maps/?text=Тюмень"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-background/30 px-4 py-2 transition-colors hover:bg-background/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Яндекс Карты
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Тюмень"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-background/30 px-4 py-2 transition-colors hover:bg-background/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Google Maps
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-background/50 md:flex-row md:px-6">
          <p>© 2026 Мастерская «Новогодние подарки с любовью»</p>
          <p>Информация на сайте не является публичной офертой</p>
        </div>
      </div>
    </footer>
  )
}
