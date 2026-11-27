import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import './CustomComboPicker.css'

const SIZES = [4, 6, 12]
const PIECE_PRICE = 100
const DISCOUNT = {4: 0, 6: 5, 12: 10}

export default function HamperBuilder({ open, onClose, cookies, rusks }) {
  const { items: cartItems, addItem, setCartOpen } = useCart()
  const [selections, setSelections] = useState({})
  const [size, setSize] = useState(4)
  const [message, setMessage] = useState('')
  const [ribbon, setRibbon] = useState('RED')
  const price = Math.round((size * PIECE_PRICE * (100 - DISCOUNT[size]))/100)

  useEffect(() => {
    if (!open) setSelections({})
  }, [open])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const totalSelected = Object.values(selections).reduce((s, q) => s + q, 0)
  const exactMet = totalSelected === size
  const atCap = totalSelected >= size

  const allProducts = [...cookies, ...rusks]
  const chosen = Object.entries(selections).flatMap(([title, qty]) => Array(qty).fill(title))

  const bump = (title, delta) => {
    setSelections((prev) => {
      const next = { ...prev }
      const current = next[title] || 0
      const updated = current + delta
      if (updated <= 0) {
        delete next[title]
      } else {
        const newTotal = Object.values(prev).reduce((s, q) => s + q, 0) - current + updated
        if (newTotal <= size) next[title] = updated
      }
      return next
    })
  }

  const handleAdd = () => {
    if (!exactMet) return

    const description = Object.entries(selections)
      .map(([title, qty]) => `${qty}x ${title}`)
      .join(', ')

    const uid = Math.random().toString(36).slice(2, 6).toUpperCase()
    const title = `GIFT HAMPER ${size}PC #${uid}`

    const firstSelectedTitle = Object.keys(selections)[0]
    const firstProduct = allProducts.find((p) => p.title === firstSelectedTitle)

    addItem({
      title,
      type: `Gift Hamper  · ${size} pieces`,
      image: firstProduct?.image,
      description: description + ' | Ribbon: ' + ribbon + ' | Message ' + message,
      price: price,
    })

    onClose()
    setCartOpen(true)
  }

  if (!open) return null

  return (
    <>
      <div className="combo-overlay" onClick={onClose} />
      <div className="combo-modal" role="dialog" aria-modal="true" aria-label="Build your custom combo">
        <div className="combo-header">
          <div>
            <h2>BUILD YOUR COMBO</h2>
            <p className="combo-subtitle">Pick exactly {size} — cookies, rusks, mix &amp; match. ₹{price} per combo.</p>
          </div>
          <button className="combo-close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className='hamper-sizes'>
          {SIZES.map((n) => (
          <button key={n} className="btn" onClick={() => { setSize(n); setSelections({}) }}> {n} pieces</button>
          ))}
        </div>

        <div className='hamper-sizes'>
          <input placeholder = "Gift Message" value={message} onChange={(e)=> setMessage(e.target.value)} />
          <select value={ribbon} onChange={(e) => setRibbon(e.target.value)} >
            <option>Red</option>
            <option>Gold</option>
            <option>blue</option>
            </select>
        </div>

        <div className='hamper-slots'>
          {Array.from({ length: size}).map((_, i) => (
            <div key={i} className='hamper-slots'>{chosen[i] || i + 1} </div>
          ))}
        </div>

        <div className="combo-body">
          <h3 className="combo-section-title">COOKIES</h3>
          <div className="combo-grid">
            {cookies.map((p) => (
              <ComboTile
                key={p.title}
                product={p}
                qty={selections[p.title] || 0}
                disableInc={atCap}
                onInc={() => bump(p.title, 1)}
                onDec={() => bump(p.title, -1)}
              />
            ))}
          </div>

          <h3 className="combo-section-title">RUSKS</h3>
          <div className="combo-grid">
            {rusks.map((p) => (
              <ComboTile
                key={p.title}
                product={p}
                qty={selections[p.title] || 0}
                disableInc={atCap}
                onInc={() => bump(p.title, 1)}
                onDec={() => bump(p.title, -1)}
              />
            ))}
          </div>
        </div>

        <div className="combo-footer">
          <div className="combo-count">
            <span className={`combo-count-num ${exactMet ? 'met' : ''}`}>
              {totalSelected}
            </span>
            <span className="combo-count-label">
              / {size} selected{exactMet ? ' ✓' : ''}
            </span>
          </div>
          <button
            className="btn combo-add-btn"
            disabled={!exactMet}
            onClick={handleAdd}
          >
            {exactMet ? `Add Combo · ₹${price}` : `Pick ${size - totalSelected} more`}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

function ComboTile({ product, qty, disableInc, onInc, onDec }) {
  const selected = qty > 0
  return (
    <div className={`combo-tile ${selected ? 'selected' : ''}`}>
      <div className="combo-tile-img-wrap">
        <img src={product.image} alt={product.title} />
        {selected && <span className="combo-tile-badge">{qty}</span>}
      </div>
      <div className="combo-tile-title">{product.title}</div>
      <div className="combo-tile-controls">
        <button
          className="combo-qty-btn"
          onClick={onDec}
          disabled={qty === 0}
          aria-label={`Remove one ${product.title}`}
        >
          −
        </button>
        <span className="combo-qty-num">{qty}</span>
        <button
          className="combo-qty-btn"
          onClick={onInc}
          disabled={disableInc}
          aria-label={`Add one ${product.title}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
