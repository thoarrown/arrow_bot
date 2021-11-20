export default function formatPrice(price: number) {
  return Math.round((price + Number.EPSILON) * 1000) / 1000
}
