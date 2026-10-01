export const chapters = [
  { number: 1, id: "01", title: "Gateway" },
  { number: 2, id: "02", title: "Highlights" },
  { number: 3, id: "03", title: "Financial Statements" },
  { number: 4, id: "04", title: "Audit" },
  { number: 5, id: "05", title: "Board Resolution" },
  { number: 6, id: "06", title: "Thank You, Mom" },
] as const;

export type Chapter = (typeof chapters)[number];
