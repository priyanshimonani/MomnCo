import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "../hooks/useTheme";
import { EasterEggProvider } from "../eastereggs/EasterEggProvider";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/components.css";
import "../styles/editorial.css";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <EasterEggProvider>
          <AppRoutes />
        </EasterEggProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
