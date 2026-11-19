import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { Catalog } from '../sections/Catalog'
import { About } from '../sections/About'
import { Delivery } from '../sections/Delivery'
import { Reviews } from '../sections/Reviews'
import { Subscribe } from '../sections/Subscribe'
import { Footer } from '../sections/Footer'
import { OrderModal } from '../sections/OrderModal'
import { CartDrawer } from '../sections/CartDrawer'
import type { CartLine } from '../sections/CartDrawer'

const CART_KEY = 'gifts-cart'

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.id === 'string' && l.qty > 0) : []
  } catch {
    return []
  }
}

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false)
  const [bouquet, setBouquet] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartLine[]>(loadCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useReveal()

  const openOrder = (name: string) => {
    setBouquet(name)
    setOrderOpen(true)
  }

  const addToCart = (id: string) => {
    setCart((prev) => {
      const line = prev.find((l) => l.id === id)
      return line
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (id: string, qty: number) =>
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    )

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0)

  return (
    <>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Catalog onOrder={openOrder} onAddToCart={addToCart} />
        <About />
        <Delivery />
        <Reviews />
        <Subscribe />
      </main>
      <Footer />
      <OrderModal open={orderOpen} bouquet={bouquet} onClose={() => setOrderOpen(false)} />
      <CartDrawer
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={(id) => changeQty(id, 0)}
        onClear={() => setCart([])}
      />
    </>
  )
}
