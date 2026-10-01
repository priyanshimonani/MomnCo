import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Button, StatusBadge } from "../components/ui/primitives";
import { config, personalize } from "../data/config";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Gateway() {
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const enterReport = () => {
    if (authenticating) return;
    setAuthenticating(true);
    window.setTimeout(() => {
      navigate("/02");
    }, 3200);
  };

  return (
    <div className="gateway">
      <AnimatePresence mode="wait">
        {authenticating ? (
          <motion.section
            key="authenticating"
            className="gateway__loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.3 }}
            aria-live="polite"
            aria-busy="true"
          >
            <span className="eyebrow">One tiny check</span>
            <p className="gateway__loading-copy">Checking you are the best {config.momNickname.toLowerCase()}… verified.</p>
            
          </motion.section>
        ) : (
          <motion.section
            key="cover"
            className="gateway__cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.4 }}
          >
            <StatusBadge className="gateway__edition">Audited with love</StatusBadge>
            <h1>{personalize(config.entityName)}</h1>
            <p className="gateway__period mono">{config.fiscalYear}</p>
            <div className="gateway__preview">
              <span className="gateway__letter-seal" aria-hidden="true">
                <Calculator size={24} strokeWidth={1.8} />
                <span className="gateway__calculator-smile" />
              </span>
              <div>
                <p className="gateway__preview-title">Annual Report</p>
                <p className="gateway__preview-note">A very biased one</p>
              </div>
            </div>
            <div className="gateway__actions">
              <Button variant="primary" onClick={enterReport} className="gateway__enter">Open</Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <span className="gateway__folio mono" aria-hidden="true">M&amp;CO. / IR / {config.fiscalYear}</span>
    </div>
  );
}
