export type Highlight = {
  id: "meals" | "problems" | "inquiries" | "patience";
  label: string;
  value: string;
  suffix?: string;
  tone: "saffron" | "indigo" | "coral" | "plum";
  points: string;
};

export const highlights: Highlight[] = [
  { id: "meals", label: "Nights we binge watched ", value: "Too many", tone: "saffron", points: "0,27 18,22 36,24 54,13 72,17 90,7" },
  { id: "problems", label: "Shopping sprees", value: "Shh", tone: "indigo", points: "0,26 18,19 36,22 54,11 72,14 90,5" },
  { id: "inquiries", label: "Tea and “Tea” exchanged on the swing", value: "Too hot", tone: "coral", points: "0,25 18,18 36,20 54,10 72,12 90,4" },
  { id: "patience", label: "Times you let me sleep on your lap", value: "Infinite", suffix: "%", tone: "plum", points: "0,5 18,8 36,11 54,16 72,20 90,26" },
];
