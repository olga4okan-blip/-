import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

interface OrderModalProps {
  open: boolean
  bouquet: string
  onClose: () => void
}

export function OrderModal({ open, bouquet, onClose }: OrderModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (open) {
      setSent(false)
      setErrors({})
      setComment('')
    }
  }, [open, bouquet])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (name.trim().length < 2) errs.name = 'Введите имя (минимум 2 буквы)'
    if (!/^\+?[\d\s()\-]{10,16}$/.test(phone.trim())) errs.phone = 'Введите телефон в формате +7 900 000-00-00'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Оформление заказа"
        className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-2xl sm:rounded-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold">
            {sent ? 'Заявка отправлена' : 'Заказать подарок'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="mt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Спасибо, {name.trim()}! Мы свяжемся с вами по номеру {phone.trim()} в течение
              10 минут, чтобы подтвердить заказ{bouquet ? ` «${bouquet}»` : ''}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Отлично, жду звонка
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6" noValidate>
            {bouquet && (
              <p className="mb-4 rounded-xl bg-secondary px-4 py-3 text-sm">
                <span className="font-semibold">{bouquet}</span>
              </p>
            )}
            <label className="block text-sm font-medium">
              Ваше имя
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                placeholder="Анна"
                className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 ${
                  errors.name ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
            </label>
            <label className="mt-4 block text-sm font-medium">
              Телефон
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!errors.phone}
                placeholder="+7 900 000-00-00"
                className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30 ${
                  errors.phone ? 'border-destructive' : 'border-input'
                }`}
              />
              {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
            </label>
            <label className="mt-4 block text-sm font-medium">
              Комментарий (необязательно)
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Например: доставка завтра к 12:00, открытка к юбилею"
                className="mt-1.5 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-accent py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Отправить заявку
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
