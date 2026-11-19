import { useEffect, useState } from 'react'
import { PRODUCTS, formatPrice } from '../data/products'
import type { Product } from '../data/products'

export interface CartLine {
  id: string
  qty: number
}

interface CartDrawerProps {
  open: boolean
  lines: CartLine[]
  onClose: () => void
  onChangeQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onClear: () => void
}

type Step = 'cart' | 'checkout' | 'success'

const bouquetById = (id: string): Product | undefined => PRODUCTS.find((b) => b.id === id)

export function CartDrawer({ open, lines, onClose, onChangeQty, onRemove, onClear }: CartDrawerProps) {
  const [step, setStep] = useState<Step>('cart')
  const [orderNo, setOrderNo] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '', comment: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      setStep('cart')
      setErrors({})
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const items = lines
    .map((l) => ({ ...l, bouquet: bouquetById(l.id) }))
    .filter((l): l is CartLine & { bouquet: Product } => Boolean(l.bouquet))

  const total = items.reduce((sum, l) => sum + l.bouquet.price * l.qty, 0)
  const count = items.reduce((sum, l) => sum + l.qty, 0)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (form.name.trim().length < 2) next.name = 'Введите имя (минимум 2 буквы)'
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Введите телефон полностью'
    if (form.address.trim().length < 5) next.address = 'Укажите адрес доставки'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setOrderNo(`ФЛ-${Math.floor(1000 + Math.random() * 9000)}`)
    setStep('success')
    onClear()
  }

  const field =
    'w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20'

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-semibold">
            {step === 'cart' && `Корзина${count > 0 ? ` (${count})` : ''}`}
            {step === 'checkout' && 'Оформление заказа'}
            {step === 'success' && 'Заказ принят'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-muted-foreground" aria-hidden="true">
                    <path d="M6 7h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 7Z" strokeLinejoin="round" />
                    <path d="M9 7V6a3 3 0 0 1 6 0v1" strokeLinecap="round" />
                  </svg>
                  <p className="text-muted-foreground">Пока пусто. Загляните в каталог - там красиво.</p>
                  <a
                    href="#catalog"
                    onClick={onClose}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                  >
                    Смотреть каталог
                  </a>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ bouquet: b, qty }) => (
                    <li key={b.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                      <img src={b.image} alt={b.name} className="h-20 w-16 shrink-0 rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold leading-tight">{b.name}</p>
                          <button
                            type="button"
                            onClick={() => onRemove(b.id)}
                            aria-label={`Убрать ${b.name} из корзины`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{formatPrice(b.price)} / шт.</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-border">
                            <button
                              type="button"
                              onClick={() => onChangeQty(b.id, qty - 1)}
                              aria-label="Уменьшить количество"
                              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                            <button
                              type="button"
                              onClick={() => onChangeQty(b.id, qty + 1)}
                              aria-label="Увеличить количество"
                              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-bold text-primary">{formatPrice(b.price * qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Доставка по Тюмени</span>
                  <span className="font-semibold text-primary">бесплатно от 3 000 ₽</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-semibold">Итого</span>
                  <span className="font-display text-2xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && (
          <form onSubmit={submitOrder} className="flex flex-1 flex-col overflow-y-auto px-5 py-4" noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="cart-name" className="mb-1 block text-sm font-medium">Имя</label>
                <input id="cart-name" type="text" value={form.name} onChange={set('name')} className={field} autoComplete="name" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="cart-phone" className="mb-1 block text-sm font-medium">Телефон</label>
                <input id="cart-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+7 (___) ___-__-__" className={field} autoComplete="tel" />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="cart-address" className="mb-1 block text-sm font-medium">Адрес доставки</label>
                <input id="cart-address" type="text" value={form.address} onChange={set('address')} placeholder="Улица, дом, квартира" className={field} autoComplete="street-address" />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="cart-date" className="mb-1 block text-sm font-medium">Дата и время</label>
                <input id="cart-date" type="text" value={form.date} onChange={set('date')} placeholder="Например: завтра к 12:00" className={field} />
              </div>
              <div>
                <label htmlFor="cart-comment" className="mb-1 block text-sm font-medium">Комментарий</label>
                <textarea id="cart-comment" value={form.comment} onChange={set('comment')} rows={3} placeholder="Открытка, особые пожелания..." className={field} />
              </div>
            </div>
            <div className="mt-auto space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">К оплате</span>
                <span className="font-display text-2xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Подтвердить заказ
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-full rounded-full border border-border py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Вернуться в корзину
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold">Спасибо, {form.name.trim() || 'друг'}!</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Заказ {orderNo} принят. Мы позвоним на {form.phone.trim()} в течение 15 минут, чтобы
              подтвердить детали.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Продолжить
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
