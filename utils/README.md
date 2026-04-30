# @ncobase/utils

Shared utility helpers for Ncobase frontend packages and applications.

## Install

```bash
pnpm add @ncobase/utils
```

## Main Exports

- Array helpers: `mathArr`, `cleanArray`, `onlyInLeft`
- Date and time helpers: `formatDateTime`, `formatRelativeTime`, `parseDate`, `isToday`, `isYesterday`, `isTomorrow`
- Number and money helpers: `toNumber`, `decimals`, `decimalToPercent`, `formatCurrency`
- Object helpers: `getValueByPath`, `cleanJsonValues`
- String helpers: `randomId`, SQL character cleanup, case helpers, text formatting helpers
- Validation and normalization helpers: `verifyNumber`, `verifyArray`, `verifyObject`, `isSameValue`
- Browser helpers: `locals`, SSR guards, URL and path helpers
- Crypto and ID helpers: RSA helpers and nanoid-based generators
- Styling helpers: class name merge utilities

## Usage

```ts
import { cleanArray, formatCurrency, getValueByPath, locals } from '@ncobase/utils';

const ids = cleanArray(['a', null, 'b']);
const amount = formatCurrency(1280.5, '$');
const owner = getValueByPath(record, 'owner.name', 'Unknown');

locals.set('last_owner', owner);
```

## Path Helpers

```ts
import { isExternal, isPathMatching, joinPath } from '@ncobase/utils';

isExternal('https://example.com');
isPathMatching('/system/options/runtime-settings', '/system/options', 2);
joinPath('system', 'options');
```

## Development

```bash
pnpm --filter @ncobase/utils lint
pnpm --filter @ncobase/utils typecheck
pnpm --filter @ncobase/utils build
```
