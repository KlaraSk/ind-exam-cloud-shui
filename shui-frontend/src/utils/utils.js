export const formatDate = (date) => {
  // Omvandlar isosträngen till ett Date-objekt
  const dateObj = new Date(date);

  // Konverterar till svensk tid och skriver ut ex "7 september"
  const dayMonth = dateObj.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });

  // Konverterar till svensk tid och skriver ut ex "11.20"
  const time = dateObj.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

  // Slår ihop datum och klockslag
  return `${dayMonth} kl. ${time}`;
};

// Omvandlar databassvar till mer UX-vänliga svenska varianter
export const formatErrorMsg = (error) => {
  if (error === null) return;

  if (error.data.message === `"message" is required`) return "Meddelandet får inte vara tomt.";
  else if (error.data.message === `"message" length must be at least 5 characters long`) return "Meddelandet måste vara minst 5 tecken.";
  else if (error.data.message === `"message" length must be less than or equal to 250 characters long`)
    return "Meddelandet får vara max 250 tecken.";
};

export const sortByDate = (data, isNewestFirst) => {
  // Konverterar isodatumsträngarna till Date-objekt, vilket gör att datumet formateras om till millisekunder i sort-funktionen.
  const oldestFirst = [...data].sort(function (a, b) {
    return new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt);
  });

  if (!isNewestFirst) return oldestFirst;
  else if (isNewestFirst) return oldestFirst.reverse();
};

export const filterMessages = (arr, usersArr) => {
  const filteredMessagesArr = usersArr.flatMap((user) => {
    const filteredMessages = arr.filter((obj) => obj.attributes.user === user);
    return filteredMessages;
  });
  return filteredMessagesArr;
};

export const toggleState = (bool, setState) => {
  const prevValue = bool;
  setState(!prevValue);
};
