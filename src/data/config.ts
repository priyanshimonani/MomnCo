export const config = {
  entityName: "{momNickname} & Co.",
  fiscalYear: "FY 2025–26",
  momNickname: "Mom",
  daughterName: "",
  signOff: "With love, {daughterName}",
  closingLines: [
    "Thank you, {momNickname}. I understand more now.",
    "You make hard things feel possible.",
    "I hope you know how loved you are.",
    "Happy birthday to my favorite person.",
  ],
} as const;

export function personalize(copy: string): string {
  return copy
    .replaceAll("{momNickname}", config.momNickname)
    .replaceAll("{daughterName}", config.daughterName || "your daughter");
}
