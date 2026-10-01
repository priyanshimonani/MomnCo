import { Component, lazy, Suspense } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./Shell";
import NotFound from "../eastereggs/NotFound";
import { Skeleton } from "../components/ui/primitives";

const pages = {
  "01": lazy(() => import("../chapters/Gateway")),
  "02": lazy(() => import("../chapters/Highlights")),
  "03": lazy(() => import("../chapters/Statements")),
  "04": lazy(() => import("../chapters/Assurance")),
  "05": lazy(() => import("../chapters/Dividend")),
  "06": lazy(() => import("../chapters/ThankYou")),
};

class ScreenErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unable to render report screen.", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="screen-error" role="alert">
          <h1>Report screen unavailable.</h1>
          <button className="button button--secondary" type="button" onClick={() => window.location.reload()}>
            Reload report
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}

function ReportPage({ id }: { id: keyof typeof pages }) {
  const Page = pages[id];
  return (
    <Shell>
      <Suspense fallback={<div className="screen-loading" role="status"><Skeleton /> <span>Preparing the record…</span></div>}>
        <ScreenErrorBoundary><Page /></ScreenErrorBoundary>
      </Suspense>
    </Shell>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/01" replace />} />
      <Route path="/01" element={<ReportPage id="01" />} />
      <Route path="/02" element={<ReportPage id="02" />} />
      <Route path="/03" element={<ReportPage id="03" />} />
      <Route path="/04" element={<ReportPage id="04" />} />
      <Route path="/05" element={<ReportPage id="05" />} />
      <Route path="/06" element={<ReportPage id="06" />} />
      <Route path="*" element={<Shell><NotFound /></Shell>} />
    </Routes>
  );
}
