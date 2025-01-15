export const formatNumber = (num: number) =>
  new Intl.NumberFormat('es-MX').format(num)
