import type { ReactNode } from "react";

// Small outline icons as inline SVG: no extra package needed.
// `currentColor` makes the icon use the text color of its button, so CSS can color it.
// aria-hidden: the button has an aria-label, so screen readers should skip the drawing.
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PencilIcon() {
  return (
    <Svg>
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </Svg>
  );
}

export function TrashIcon() {
  return (
    <Svg>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </Svg>
  );
}

export function CheckIcon() {
  return (
    <Svg>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

export function CloseIcon() {
  return (
    <Svg>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}
