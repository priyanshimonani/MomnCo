import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Third drawer.</h1>
      <Link to="/01">Return to report</Link>
    </section>
  );
}
