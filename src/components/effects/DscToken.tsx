import { Button } from "../ui/primitives";

export function DscToken({ inserted, onInsert }: { inserted: boolean; onInsert?: () => void }) {
  return (
    <div className="dsc-token">
      <svg viewBox="0 0 150 56" role="img" aria-label={inserted ? "Tiny signing key is ready" : "A tiny accounting signing key"}>
        <rect x="10" y="15" width="105" height="26" rx="3" />
        <rect x="115" y="21" width="20" height="14" rx="1" />
        <line x1="120" y1="24" x2="120" y2="32" />
        <line x1="126" y1="24" x2="126" y2="32" />
        <circle cx="28" cy="28" r="4" />
      </svg>
      <div>
        <span className="eyebrow">{inserted ? "Magic key connected" : "A tiny accounting key"}</span>
        <p>{inserted ? "Ready when you are." : "Insert the DSC key to sign."}</p>
      </div>
      {!inserted && onInsert && <Button variant="secondary" onClick={onInsert}>Insert magic key</Button>}
    </div>
  );
}
