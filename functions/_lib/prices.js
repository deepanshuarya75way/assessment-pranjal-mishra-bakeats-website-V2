const CATALOGUE = {
  'Festive Delight': 299,
  'Sweet & Salty': 399,
  'Dry Fruit Cookies': 429,
  'Sweet Cravings': 499,
  'Classic Rusks': 335,
}

const CUSTOM_COMBO_PRICE = 469

export const AREA_DISCOUNT_PERCENT = {
  '201310': 10,
  '201306': 5,
}

 export function getAreaDiscountPercentage(area) {
  const key = typeof area === 'string' ? area.trim() : ''
  return Object.hasOwn(AREA_DISCOUNT_PERCENT, key) ? AREA_DISCOUNT_PERCENT[key] : 0
 }

export function computeTotal(items, area) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.title.startsWith('CUSTOM COMBO')
      ? CUSTOM_COMBO_PRICE
      :Object.hasOwn(CATALOGUE, item.title) ? CATALOGUE[item.title] : undefined
    if (!price) throw new Error(`Unknown item: ${item.title}`)
    return sum + price * (item.qty || 1)
  }, 0)
  const pct = getAreaDiscountPercentage(area)
  return Math.round((subtotal * (100 - pct)) / 100)
}

