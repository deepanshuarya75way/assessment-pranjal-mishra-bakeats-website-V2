import { createRazorpayOrder } from '../_lib/razorpay.js'
import { json, error } from '../_lib/responses.js'
import { computeTotal } from '../_lib/prices.js'

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return error(400, 'Invalid JSON body')
  }

  const { items, currency = 'INR', receipt, deliveryArea } = body
  if (!items || !Array.isArray(items) || items.length === 0) {
    return error(400, 'Invalid items')
  }

  let amount
  try {
    amount = computeTotal(items, deliveryArea) * 100 // paise
  } catch (err) {
    return error(400, err.message)
  }

  try {
    const order = await createRazorpayOrder({
      amount: Math.round(amount),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      keyId: env.RAZORPAY_KEY_ID,
      keySecret: env.RAZORPAY_KEY_SECRET,
    })

    return json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error('Razorpay order creation failed:', err.message)
    return error(500, 'Failed to create order')
  }
}
