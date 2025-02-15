# @ncobase/tailwind

Common Tailwind CSS configuration and design tokens for projects.

## Features

- Predefined color scales (brand, primary, secondary, etc.)
- Consistent spacing scale
- Typography scale
- Animation keyframes
- Fully typed exports
- Support both ESM and CommonJS

## Requirements

- Node.js: >=16.0.0
- Tailwind CSS: ^3.4.x
- PostCSS: ^8.5.x

## Installation

```bash
# Install package
npm install @ncobase/tailwind

# Install peer dependencies
npm install --save-dev tailwindcss@^3.4 postcss@^8.5 postcss-import@^16.0 postcss-nesting@^12.0 autoprefixer@^10.4 cssnano@^7.0
```

## Usage

### Basic Setup

You can use the predefined PostCSS and Tailwind configurations directly:

#### ESM (Recommended)

```javascript
// postcss.config.mjs
import { postcss } from '@ncobase/tailwind';
export default postcss;

// tailwind.config.mjs
import { tailwind } from '@ncobase/tailwind';
export default tailwind;
```

#### CommonJS

```javascript
// postcss.config.js
const { postcss } = require('@ncobase/tailwind');
module.exports = postcss;

// tailwind.config.js
const { tailwind } = require('@ncobase/tailwind');
module.exports = tailwind;
```

### Design Tokens

#### Colors

Available color scales: `brand`, `primary`, `secondary`, `success`, `danger`, `warning`

Each color scale includes: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

```javascript
import { brand, primary, warning } from '@ncobase/tailwind';

const config = {
  theme: {
    extend: {
      colors: {
        brand,
        custom: {
          primary: primary[500], // Main primary color
          danger: danger[600], // Darker danger color
          warning: warning[400] // Lighter warning color
        }
      }
    }
  }
};
```

#### Spacing

The `spacing` scale can be used for padding, margin, width, height, gap, etc.

```javascript
import { spacing } from '@ncobase/tailwind';

const config = {
  theme: {
    extend: {
      padding: spacing,
      margin: spacing,
      gap: spacing,
      // or use it for specific properties
      width: {
        panel: spacing[96], // 21.6rem
        sidebar: spacing[80] // 18rem
      }
    }
  }
};
```

#### Typography

Predefined font sizes with consistent scaling:

```javascript
import { fontSize } from '@ncobase/tailwind';

const config = {
  theme: {
    extend: {
      fontSize
    }
  }
};
```

Available sizes:

- xs: 0.675rem
- sm: 0.7875rem
- base: 0.9rem
- lg: 1.0125rem
- xl: 1.125rem
- 2xl ~ 9xl

#### Animations

Predefined keyframes for common animations:

```javascript
import { keyframes } from '@ncobase/tailwind';

const config = {
  theme: {
    extend: {
      keyframes
    }
  }
};
```

### TypeScript Support

The package includes TypeScript definitions for all exports:

```typescript
import type { ColorScale, Config, PostCSSConfig } from '@ncobase/tailwind';

// Example: Using type for color scale
const customColors: ColorScale = {
  50: '#...',
  // ...
  950: '#...'
};
```

## Default Configuration

The default configuration includes:

- Typography plugin (@tailwindcss/typography)
- Animation plugin (tailwindcss-animate)
- Responsive container
- Extended screen sizes (up to 3xl)
- Production optimizations (when NODE_ENV=production)
