# @ncobase/tailwind

Shared Tailwind CSS v4 theme and PostCSS config for ncobase.

## What it provides

- `styles.css`: CSS-first Tailwind v4 theme (design tokens, base layer, shared utilities)
- `postcss`: PostCSS config using `@tailwindcss/postcss`

## Usage (CSS-first, Tailwind v4)

Add the shared stylesheet in your app entry CSS:

```css
@import '@ncobase/tailwind/styles.css';

@source "./**/*.{ts,tsx}";
```

Adjust the `@source` paths to match your app and any workspace packages that contain Tailwind class names.

If you use PostCSS:

```js
// postcss.config.mjs
export { postcss as default } from '@ncobase/tailwind';
```

## Notes

- Tailwind v4 prefers CSS-first configuration (`@theme`, `@source`, `@plugin`).
- No `tailwind.config.*` is required unless you need custom JS configuration.
