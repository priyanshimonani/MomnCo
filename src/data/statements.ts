export type LedgerLine = {
  code: string;
  description: string;
  amount: number;
  note: string;
};

export type OperatingLine = {
  label: string;
  amount: number;
  category: "revenue" | "expense";
};

export type CashFlowLine = {
  label: string;
  amount: number;
  note: string;
};

export const balanceAssets: LedgerLine[] = [
  { code: "A01", description: "Your endless love", amount: 900000, note: "No number comes close." },
  { code: "A02", description: "My safe place", amount: 84000, note: "Always there." },
  { code: "A03", description: "Your brilliant brain", amount: 650000, note: "One of a kind." },
  { code: "A04", description: "Our Goa trips", amount: 320000, note: "You make us better." },
  { code: "A05", description: "Advice (even before I ask)", amount: 210000, note: "Usually exactly right." },
];

export const balanceLiabilities: LedgerLine[] = [
  { code: "L01", description: "Hugs I still owe you", amount: 180000, note: "Repayment anytime." },
  { code: "L02", description: "Infinite garam rotis", amount: 76000, note: "Sorry, {momNickname}." },
  { code: "L03", description: "Good jeans", amount: 49000, note: "More on the way." },
  { code: "L04", description: "All the things you notice", amount: 420000, note: "I notice now, too." },
];

export const operatingLines: OperatingLine[] = [
  { label: "Unconditional Emotional Support", amount: 920000, category: "revenue" },
  { label: "Emergency Advice (Free Tier)", amount: 740000, category: "revenue" },
  { label: "Personal Life Consultancy", amount: 510000, category: "revenue" },
  { label: "Finding 'Lost' Items Instantly", amount: 680000, category: "revenue" },
  { label: "Late-Night Crisis Management", amount: 265000, category: "expense" },
  { label: "Unanswered Texts & Calls", amount: 198000, category: "expense" },
  { label: "Child-Related Operating Costs", amount: 132000, category: "expense" },
  { label: "Dramatic Life Complaints", amount: 185000, category: "expense" },
];

export const cashFlowLines: CashFlowLine[] = [
  { label: "Zero ROI Starting Point", amount: 0, note: "Opening balance." },
  { label: "Unsolicited Seed Funding", amount: 420000, note: "Funding received." },
  { label: "Childhood Overheads & Waste", amount: -260000, note: "Operating expenditure." },
  { label: "Mandatory Hug Buybacks", amount: -110000, note: "Repurchase completed." },
  { label: "Unrealized Emotional Capital", amount: 50000, note: "Unrealized closing balance." },
];

export const hugsPerRupee = 10;
