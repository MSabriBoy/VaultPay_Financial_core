const formatCurrency = (
  amount,
  currency = "USD",
  locale = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount ?? 0);
};

export { formatCurrency };