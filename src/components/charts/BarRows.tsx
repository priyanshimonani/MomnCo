export type BarRow = { label: string; amount: number; category: "revenue" | "expense" };

export function BarRows({
  rows,
  currencyLabel,
  multiplier = 1,
}: {
  rows: BarRow[];
  currencyLabel: string;
  multiplier?: number;
}) {
  const maximum = Math.max(...rows.map((row) => row.amount * multiplier));
  const rowsByCategory = [
    { category: "revenue", title: "OPERATING REVENUE (MOM)", data: rows.filter((row) => row.category === "revenue") },
    { category: "expense", title: "OPERATING EXPENSES (ME)", data: rows.filter((row) => row.category === "expense") },
  ] as const;
  const revenue = rows
    .filter((row) => row.category === "revenue")
    .reduce((total, row) => total + row.amount, 0);
  const expenses = rows
    .filter((row) => row.category === "expense")
    .reduce((total, row) => total + row.amount, 0);
  const netProfit = revenue - expenses;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const formatAmount = (amount: number) =>
    `${currencyLabel}${(amount * multiplier).toLocaleString("en-IN")}`;

  return (
    <div className="bar-rows" role="group" aria-label={`Profit and loss statement in ${currencyLabel}.`}>
      {rowsByCategory.map((group) => (
        <section className="bar-rows__group" key={group.category}>
          <h3>{group.title}</h3>
          {group.data.map((row) => (
            <div className="bar-row" key={row.label}>
              <span className="bar-row__label">{row.label}</span>
              <span className="bar-row__track" aria-hidden="true">
                <span
                  className={`bar-row__fill bar-row__fill--${row.category}`}
                  style={{ width: `${Math.max(1, (row.amount / maximum) * 100)}%` }}
                />
              </span>
              <span className="bar-row__amount mono tabular-nums">{formatAmount(row.amount)}</span>
            </div>
          ))}
          <p className="bar-rows__total">
            <strong>{group.category === "revenue" ? "TOTAL REVENUE" : "TOTAL EXPENSES"}</strong>
            <span className="mono tabular-nums">
              {formatAmount(group.data.reduce((total, row) => total + row.amount, 0))}
            </span>
          </p>
        </section>
      ))}
      <section className="bar-rows__net-profit" aria-label="Net profit summary">
        <div>
          <strong>NET PROFIT (MOM&apos;S SURPLUS):</strong>
          <strong className="mono tabular-nums">{formatAmount(netProfit)}</strong>
        </div>
        <p>Mom operates at a {netMargin.toFixed(1)}% net margin. Obviously, you win.</p>
      </section>
      <ul className="sr-only" aria-label="Profit and loss statement line items">
        {rows.map((row) => <li key={row.label}>{row.label}: {formatAmount(row.amount)}</li>)}
        <li>Total revenue: {formatAmount(revenue)}</li>
        <li>Total expenses: {formatAmount(expenses)}</li>
        <li>Net profit: {formatAmount(netProfit)}, net margin {netMargin.toFixed(1)} percent.</li>
      </ul>
    </div>
  );
}
