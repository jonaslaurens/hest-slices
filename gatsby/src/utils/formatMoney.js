const formatter = Intl.NumberFormat('BE', {
  style: 'currency',
  currency: 'EUR',
});

export const formatMoney = (cents) => formatter.format(cents / 100);
