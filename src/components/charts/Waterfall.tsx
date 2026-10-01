export type WaterfallRow = { label: string; amount: number; note: string };

export function Waterfall({
  rows,
  currencyLabel,
  unitLabel,
  multiplier = 1,
}: {
  rows: WaterfallRow[];
  currencyLabel: string;
  unitLabel?: string;
  multiplier?: number;
}) {
  const cumulative = rows.map((row, index) => {
    const amount = row.amount * multiplier;
    if (index === 0 || index === rows.length - 1) return { start: 0, end: amount };
    const prior = rows.slice(0, index).reduce((total, entry) => total + entry.amount * multiplier, 0);
    return { start: prior, end: prior + amount };
  });
  const low = Math.min(0, ...cumulative.flatMap((row) => [row.start, row.end]));
  const high = Math.max(0, ...cumulative.flatMap((row) => [row.start, row.end]));
  const span = Math.max(1, high - low);
  const yFor = (value: number) => 20 + ((high - value) / span) * 140;
  const baseline = yFor(0);

  return (
    <div className="waterfall" role="img" aria-label={`Cash flow waterfall. Values shown in ${currencyLabel}.`}>
      <svg viewBox={`0 0 ${rows.length * 150} 220`} preserveAspectRatio="xMinYMin meet" aria-hidden="true">
        <line x1="0" x2={rows.length * 150} y1={baseline} y2={baseline} className="waterfall__baseline" />
        {rows.map((row, index) => {
          const amount = row.amount * multiplier;
          const { start, end } = cumulative[index];
          const top = yFor(Math.max(start, end));
          const bottom = yFor(Math.min(start, end));
          const height = Math.max(2, bottom - top);
          const x = index * 150 + 24;
          const barWidth = 86;
          const labelY = Math.min(194, Math.max(179, bottom + 18));
          return (
            <g key={row.label} className="waterfall__mark" tabIndex={0} role="img" aria-label={`${row.label}: ${amount < 0 ? `(${currencyLabel}${Math.abs(amount).toLocaleString("en-IN")})` : `${currencyLabel}${amount.toLocaleString("en-IN")}`}. ${row.note}`}>
              <title>{row.note}</title>
              {index > 0 && index < rows.length - 1 && (
                <line x1={x - 24} x2={x} y1={yFor(start)} y2={yFor(start)} className="waterfall__connector" />
              )}
              <rect
                x={x}
                y={top}
                width={barWidth}
                height={height}
                className={`waterfall__bar ${row.amount < 0 ? "waterfall__bar--negative" : ""} ${index === 0 || index === rows.length - 1 ? "waterfall__bar--total" : ""}`}
              />
              <text x={x + barWidth / 2} y={Math.max(14, top - 6)} className="waterfall__value" textAnchor="middle">
                {row.amount < 0 ? `(${Math.abs(row.amount * multiplier).toLocaleString("en-IN")})` : (row.amount * multiplier).toLocaleString("en-IN")}
              </text>
              <text x={x + barWidth / 2} y={labelY} className="waterfall__label" textAnchor="middle">{row.label}</text>
            </g>
          );
        })}
      </svg>
      <p className="waterfall__unit eyebrow">{unitLabel ?? `${currencyLabel}· Reporting units`}</p>
      <ol className="sr-only waterfall__screen-reader-list">
        {rows.map((row) => <li key={row.label}>{row.label}: {row.amount < 0 ? `(${currencyLabel}${Math.abs(row.amount * multiplier).toLocaleString("en-IN")})` : `${currencyLabel}${(row.amount * multiplier).toLocaleString("en-IN")}`}. {row.note}</li>)}
      </ol>
      <ol className="waterfall__mobile-list">
        {rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <strong className="mono tabular-nums">{row.amount < 0 ? `(${currencyLabel}${Math.abs(row.amount * multiplier).toLocaleString("en-IN")})` : `${currencyLabel}${(row.amount * multiplier).toLocaleString("en-IN")}`}</strong>
            <small>{row.note}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
