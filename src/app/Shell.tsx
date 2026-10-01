import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { chapters } from "../chapters/chapterData";
import { TopBar } from "../components/shell/TopBar";

export function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const active = chapters.findIndex((chapter) => `/${chapter.id}` === pathname);

  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <TopBar />
      <main id="main-content" className="workspace__main">
        <div className="route-transition">{children}</div>
      </main>
      <nav className="journey-dots" aria-label="Report progress">
        <ol>
          {chapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className={`journey-dots__item ${index === active ? "journey-dots__item--active" : ""} ${index < active ? "journey-dots__item--complete" : ""}`}
              aria-current={index === active ? "step" : undefined}
            >
              <span className="journey-dots__dot" aria-hidden="true" />
              <span className="sr-only">{`Screen ${index + 1}: ${chapter.title}`}</span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
