import { useState } from 'react'

export function Subscribe() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Проверьте адрес почты - кажется, в нём опечатка')
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="reveal mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center md:px-6 md:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Рассылка</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Первыми узнавайте о новинках сезона</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Раз в месяц - свежие композиции, идеи для подарков и промокод на скидку 10% на первый
            заказ за подписку.
          </p>
        </div>

        {done ? (
          <div className="flex items-center gap-3 rounded-full border border-primary/30 bg-card px-6 py-3 text-sm font-medium text-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Готово! Промокод ФЛОРА10 уже летит на {email.trim()}
          </div>
        ) : (
          <form onSubmit={submit} className="w-full max-w-md" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="subscribe-email" className="sr-only">Электронная почта</label>
              <input
                id="subscribe-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваша электронная почта"
                className="h-12 flex-1 rounded-full border border-input bg-card px-5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                autoComplete="email"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
              >
                Подписаться
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            <p className="mt-3 text-xs text-muted-foreground">
              Никакого спама. Отписаться можно в один клик в любом письме.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
