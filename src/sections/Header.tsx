import { useEffect, useState } from 'react'

const NAV = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#about', label: 'О композициях' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header({ cartCount = 0, onCartOpen }: { cartCount?: number; onCartOpen?: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 shadow-sm backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        <a
          href="#top"
          className={`font-display text-2xl font-semibold tracking-wide transition-colors ${
            scrolled ? 'text-primary' : 'text-primary-foreground'
          }`}
        >
          Подарки с любовью
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ${
                scrolled ? 'text-foreground/80 hover:text-primary' : 'text-primary-foreground/85 hover:text-primary-foreground'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCartOpen}
            aria-label={cartCount > 0 ? `Открыть корзину, ${cartCount} товаров` : 'Открыть корзину'}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
              scrolled ? 'border-border text-primary' : 'border-primary-foreground/40 text-primary-foreground'
            }`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M6 7h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 7Z" strokeLinejoin="round" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" strokeLinecap="round" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="tel:+79969224518"
            className={`hidden text-sm font-semibold transition-colors hover:underline md:block ${
              scrolled ? 'text-primary' : 'text-primary-foreground'
            }`}
          >
            +7 (996) 922-45-18
          </a>
          <a
            href="#catalog"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 md:block"
          >
            Выбрать подарок
          </a>
          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
              scrolled ? 'border-border text-primary' : 'border-primary-foreground/40 text-primary-foreground'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-foreground/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`absolute inset-x-0 top-full z-40 origin-top bg-background shadow-lg transition-all duration-200 md:hidden ${
          open ? 'visible scale-y-100 opacity-100' : 'invisible scale-y-95 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Мобильная навигация">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3.5 text-base font-medium last:border-0"
            >
              {n.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onCartOpen?.()
            }}
            className="flex items-center justify-between border-b border-border py-3.5 text-base font-medium last:border-0"
          >
            Корзина
            {cartCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="tel:+79969224518"
            className="py-3.5 text-base font-semibold text-primary"
            onClick={() => setOpen(false)}
          >
            +7 (996) 922-45-18
          </a>
        </nav>
      </div>
    </header>
  )
}
