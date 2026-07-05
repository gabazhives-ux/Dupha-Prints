// Flat, background-less SVG silhouettes standing in for the client's
// product photography (bottle + umbrella mockups). Swap these for real
// cut-out PNGs later — the drop animation in Hero.tsx works with any
// image element, so no logic changes are needed.

export function BottleIcon({ color }: { color: string }) {
  return (
    <svg width="72" height="160" viewBox="0 0 72 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="4" width="16" height="18" rx="3" fill={color} opacity="0.9" />
      <path
        d="M24 22h24l4 20c6 8 8 16 8 26v70a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10V68c0-10 2-18 8-26l4-20Z"
        fill={color}
      />
      <rect x="14" y="86" width="44" height="34" rx="4" fill="white" opacity="0.18" />
    </svg>
  );
}

export function UmbrellaIcon({ color }: { color: string }) {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M75 8C40 8 12 34 8 66c0 4 3 6 6 4l14-9 15 10c2 1 4 1 6 0l16-10 16 10c2 1 4 1 6 0l15-10 14 9c3 2 6 0 6-4C138 34 110 8 75 8Z"
        fill={color}
      />
      <rect x="72" y="60" width="6" height="70" rx="3" fill={color} opacity="0.85" />
      <path d="M78 118c0 8-6 14-14 14" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
