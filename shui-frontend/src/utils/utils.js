export const formatDate = (date) => {
  const dateObj = new Date(date);

  const dayMonth = dateObj.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });

  const time = dateObj.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

  return `${dayMonth} kl. ${time}`;

  // return date.substring(0, 10);
};
