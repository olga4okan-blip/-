import { useEffect } from 'react'

/**
 * Добавляет класс .is-visible элементам .reveal при попадании в зону видимости.
 * Отслеживает и новые элементы (например, при перерисовке каталога).
 * Если IntersectionObserver не доставляет события (фоновая вкладка,
 * встроенный webview), срабатывает запасной проход по координатам.
 */
export function useReveal() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add('is-visible')

    const inViewport = (el: Element) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }

    const manualPass = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        if (inViewport(el)) show(el)
      })

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observeAll = () =>
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible):not([data-reveal-observed])')
        .forEach((el) => {
          el.dataset.revealObserved = '1'
          io.observe(el)
        })

    observeAll()
    manualPass()
    const mo = new MutationObserver(() => {
      observeAll()
      manualPass()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    const onScroll = () => manualPass()
    window.addEventListener('scroll', onScroll, { passive: true })
    const t1 = window.setTimeout(manualPass, 400)
    const t2 = window.setInterval(manualPass, 1500)

    return () => {
      mo.disconnect()
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(t1)
      window.clearInterval(t2)
    }
  }, [])
}
