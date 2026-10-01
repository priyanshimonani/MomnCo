import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const displayFontUrl = new URL(
  "../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2",
  import.meta.url,
).href;
const displayFontPreload = document.createElement("link");
displayFontPreload.rel = "preload";
displayFontPreload.as = "font";
displayFontPreload.type = "font/woff2";
displayFontPreload.href = displayFontUrl;
displayFontPreload.crossOrigin = "anonymous";
document.head.append(displayFontPreload);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
