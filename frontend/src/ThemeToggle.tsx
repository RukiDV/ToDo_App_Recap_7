import { useState } from "react";

import { MoonIcon, SunIcon } from "./Icons";

type Theme = "light" | "dark";

// index.html sets data-theme on <html> before React starts, so we only read it here.
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  function handleClick() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; // the CSS reacts to this attribute
    try {
      localStorage.setItem("theme", next); // remember the choice for the next visit
    } catch {
      // Storage is not available: the theme still changes for this visit.
    }
    setTheme(next);
  }

  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className="icon-button"
      aria-label={label}
      title={label}
      onClick={handleClick}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
