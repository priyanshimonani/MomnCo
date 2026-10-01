import { Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { config, personalize } from "../../data/config";
import { useTheme } from "../../hooks/useTheme";
import { useEasterEggs } from "../../eastereggs/EasterEggProvider";
import { Button, Sheet } from "../ui/primitives";
import { useNavigate } from "react-router-dom";

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { notify, recordLogoClick } = useEasterEggs();
  const [profileOpen, setProfileOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleLogout = () => {
    setProfileOpen(false);
    notify("Nice try.");
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (theme === "light") notify(`${config.momNickname} has entered night mode.`);
  };
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <button className="topbar__brand" type="button" onClick={() => navigate("/01")} aria-label={`${config.momNickname} & Co. logo`}>
        <span className="topbar__monogram" aria-hidden="true">♥</span>
        <span>{config.momNickname} &amp; Co.</span>
      </button>
      <div className="topbar__actions">
        <Button
          variant="tertiary"
          className="icon-button"
          aria-label={`Switch to ${theme === "light" ? "night" : "day"} mode`}
          onClick={handleThemeToggle}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        <div className="topbar__menu-wrap">
          <Button
            variant="tertiary"
            className="icon-button"
            aria-label="Profile menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <UserRound size={18} />
          </Button>
          {profileOpen && (
            <div className="menu-popover menu-popover--profile" role="menu" aria-label="Profile">
              <span className="eyebrow">Your favorite person</span>
              <strong>{config.momNickname}</strong>
              <button role="menuitem" onClick={handleLogout}>Logout</button>
              <button role="menuitem" onClick={() => { setDeleteOpen(true); setProfileOpen(false); }}>Delete account</button>
            </div>
          )}
        </div>
      </div>
      <Sheet open={deleteOpen} title="Delete account" onClose={() => setDeleteOpen(false)}>
        <div className="sheet__body delete-account-dialog">
          <p className="delete-account-dialog__copy">{personalize("Requires approval from {momNickname}.")}</p>
          <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Close</Button>
        </div>
      </Sheet>
    </header>
  );
}
