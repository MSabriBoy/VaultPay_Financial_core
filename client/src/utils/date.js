const formatDate = (
  date,
  locale = "en-US"
) => {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default formatDate;