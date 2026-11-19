import { PRODUCTS, formatPrice } from '../data/products'

interface CatalogProps {
  onOrder: (productName: string) => void
  onAddToCart: (id: string) => void
}

export function Catalog({ onOrder, onAddToCart }: CatalogProps) {
  return (
    <section id="catalog" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Каталог</p>
          <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
            Что собираем в этом сезоне
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Все композиции в единственном экземпляре. Понравившийся вариант можно повторить - будет
          похожим, но не одинаковым.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {PRODUCTS.map((b, i) => (
          <article
            key={b.id}
            className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg sm:flex-row"
            style={{ transitionDelay: `${(i % 2) * 60}ms` }}
          >
            <div className="relative overflow-hidden sm:w-2/5">
              <img
                src={b.image}
                alt={b.name}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
              />
              {b.tag && (
                <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                  {b.tag}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold leading-tight">{b.name}</h3>
                <p className="whitespace-nowrap text-lg font-bold text-primary">{formatPrice(b.price)}</p>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => onAddToCart(b.id)}
                  className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  В корзину
                </button>
                <button
                  type="button"
                  onClick={() => onOrder(b.name)}
                  className="flex-1 rounded-full border border-primary py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Заказать
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
