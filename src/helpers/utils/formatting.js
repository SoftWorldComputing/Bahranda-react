export const formatCurrency = (amount) => {
  if(!amount) return ''
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
  return formatter
}

export const formatDate = (timestamp) => {
  if(!timestamp) return ''
  const date = new Date(timestamp)
  const formatter = new Intl.DateTimeFormat('en-GB').format(date);
  return formatter
}
