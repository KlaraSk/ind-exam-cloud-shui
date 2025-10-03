export const sortByDate = (data, queries) => {
  // Konverterar isodatumsträngarna till Date-objekt, vilket gör att datumet formateras om till millisekunder i sort-funktionen.
  const oldestFirst = data.sort(function (a, b) {
    return new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt);
  });
  // Om queryparametern är sort=oldest returneras listan med äldsta meddelandet överst
  if (queries.sort === "oldest") return oldestFirst;
  // Om queryparametern är sort=newest returneras listan med nyaste meddelandet överst
  else if (queries.sort === "newest") return oldestFirst.reverse();
};
