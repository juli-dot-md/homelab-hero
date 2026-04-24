import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import { ThemeProvider } from "./themes/ThemeContext";

// GitHub Pages SPA redirect: restore path saved by 404.html
const redirect = sessionStorage.getItem("spa-redirect");
if (redirect) {
  sessionStorage.removeItem("spa-redirect");
  window.history.replaceState(null, "", redirect);
}

const root = document.getElementById("root");
if (!root) throw new Error("No root element");

// Use the Vite base path for the router basename so sub-path
// deployments (e.g. username.github.io/homelab-hero) work correctly.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
