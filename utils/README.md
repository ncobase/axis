# @ncobase/utils

A collection of utility functions and helpers for building Ncobase applications. Provides common functionality for data manipulation, formatting, validation, and more.

## Features

- **Type-Safe**: Fully typed with TypeScript
- **Tree-Shakeable**: Import only what you need
- **Well-Tested**: Comprehensive test coverage
- **Zero Dependencies**: Minimal external dependencies
- **Performance**: Optimized for production use

## Installation

```bash
npm install @ncobase/utils
# or
pnpm add @ncobase/utils
# or
yarn add @ncobase/utils
```

## Utility Categories

### String Utilities

```tsx
import { capitalize, truncate, slugify, camelCase, snakeCase, kebabCase } from '@ncobase/utils';

// Capitalize first letter
capitalize('hello world'); // 'Hello world'

// Truncate with ellipsis
truncate('Long text here', 10); // 'Long text...'

// Create URL-friendly slug
slugify('Hello World!'); // 'hello-world'

// Case conversions
camelCase('hello-world'); // 'helloWorld'
snakeCase('helloWorld'); // 'hello_world'
kebabCase('helloWorld'); // 'hello-world'
```

### Number Utilities

```tsx
import { formatNumber, formatCurrency, formatPercent, clamp, random } from '@ncobase/utils';

// Format numbers with locale
formatNumber(1234567.89); // '1,234,567.89'

// Format currency
formatCurrency(99.99, 'USD'); // '$99.99'

// Format percentage
formatPercent(0.1234); // '12.34%'

// Clamp value between min and max
clamp(150, 0, 100); // 100

// Random number in range
random(1, 10); // Random number between 1 and 10
```

### Date Utilities

```tsx
import {
  formatDate,
  formatRelative,
  parseDate,
  addDays,
  diffDays,
  isToday,
  isFuture
} from '@ncobase/utils';

// Format date
formatDate(new Date(), 'YYYY-MM-DD'); // '2026-02-15'

// Relative time
formatRelative(new Date(Date.now() - 3600000)); // '1 hour ago'

// Parse date string
parseDate('2026-02-15'); // Date object

// Date arithmetic
addDays(new Date(), 7); // Date 7 days from now
diffDays(date1, date2); // Difference in days

// Date checks
isToday(new Date()); // true
isFuture(tomorrow); // true
```

### Array Utilities

```tsx
import { unique, groupBy, sortBy, chunk, flatten, intersection } from '@ncobase/utils';

// Remove duplicates
unique([1, 2, 2, 3, 3]); // [1, 2, 3]

// Group by property
groupBy(users, 'role');
// { admin: [...], user: [...] }

// Sort by property
sortBy(users, 'name'); // Sorted array

// Split into chunks
chunk([1, 2, 3, 4, 5], 2);
// [[1, 2], [3, 4], [5]]

// Flatten nested arrays
flatten([
  [1, 2],
  [3, 4]
]); // [1, 2, 3, 4]

// Array intersection
intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
```

### Object Utilities

```tsx
import { pick, omit, merge, clone, isEmpty, isEqual } from '@ncobase/utils';

// Pick properties
pick(user, ['id', 'name']);
// { id: 1, name: 'John' }

// Omit properties
omit(user, ['password']);
// User without password

// Deep merge objects
merge(obj1, obj2); // Merged object

// Deep clone
clone(obj); // Cloned object

// Check if empty
isEmpty({}); // true
isEmpty({ a: 1 }); // false

// Deep equality check
isEqual(obj1, obj2); // true/false
```

### Validation Utilities

```tsx
import { isEmail, isURL, isPhone, isUUID, isCreditCard, isIPAddress } from '@ncobase/utils';

// Email validation
isEmail('user@example.com'); // true

// URL validation
isURL('https://example.com'); // true

// Phone validation
isPhone('+1-234-567-8900'); // true

// UUID validation
isUUID('123e4567-e89b-12d3-a456-426614174000'); // true

// Credit card validation
isCreditCard('4111111111111111'); // true

// IP address validation
isIPAddress('192.168.1.1'); // true
```

### File Utilities

```tsx
import {
  formatFileSize,
  getFileExtension,
  getMimeType,
  isImage,
  isVideo,
  isPDF
} from '@ncobase/utils';

// Format file size
formatFileSize(1024); // '1 KB'
formatFileSize(1048576); // '1 MB'

// Get file extension
getFileExtension('document.pdf'); // 'pdf'

// Get MIME type
getMimeType('image.jpg'); // 'image/jpeg'

// File type checks
isImage('photo.jpg'); // true
isVideo('movie.mp4'); // true
isPDF('document.pdf'); // true
```

### Color Utilities

```tsx
import { hexToRgb, rgbToHex, lighten, darken, isValidColor } from '@ncobase/utils';

// Convert hex to RGB
hexToRgb('#3b82f6');
// { r: 59, g: 130, b: 246 }

// Convert RGB to hex
rgbToHex(59, 130, 246); // '#3b82f6'

// Lighten color
lighten('#3b82f6', 0.2); // Lighter shade

// Darken color
darken('#3b82f6', 0.2); // Darker shade

// Validate color
isValidColor('#3b82f6'); // true
```

### Async Utilities

```tsx
import { sleep, retry, debounce, throttle, timeout } from '@ncobase/utils';

// Sleep/delay
await sleep(1000); // Wait 1 second

// Retry failed operations
await retry(
  async () => {
    return await fetchData();
  },
  { attempts: 3, delay: 1000 }
);

// Debounce function calls
const debouncedSearch = debounce(query => {
  search(query);
}, 300);

// Throttle function calls
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// Timeout promise
await timeout(fetchData(), 5000);
// Throws if takes > 5s
```

### Storage Utilities

```tsx
import { storage } from '@ncobase/utils';

// LocalStorage with JSON support
storage.set('user', { id: 1, name: 'John' });
storage.get('user'); // { id: 1, name: 'John' }
storage.remove('user');
storage.clear();

// With expiration
storage.set('token', 'abc123', {
  expires: 3600000 // 1 hour
});
```

### URL Utilities

```tsx
import { parseURL, buildURL, getQueryParams, setQueryParams } from '@ncobase/utils';

// Parse URL
parseURL('https://example.com/path?foo=bar');
// { protocol, host, pathname, search, hash }

// Build URL with params
buildURL('/api/users', {
  page: 1,
  limit: 10
});
// '/api/users?page=1&limit=10'

// Get query parameters
getQueryParams('?foo=bar&baz=qux');
// { foo: 'bar', baz: 'qux' }

// Set query parameters
setQueryParams({ page: 2 });
// Updates URL query params
```

### Tree Utilities

```tsx
import { buildTree, flattenTree, findInTree, filterTree } from '@ncobase/utils';

// Build tree from flat array
const tree = buildTree(items, {
  idKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'children'
});

// Flatten tree to array
const flat = flattenTree(tree);

// Find node in tree
const node = findInTree(tree, n => n.id === 5);

// Filter tree
const filtered = filterTree(tree, n => n.active);
```

## TypeScript Support

All utilities are fully typed:

```tsx
import { sortBy } from '@ncobase/utils';

interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [...];

// Type-safe sorting
const sorted = sortBy(users, 'name'); // ✓
const invalid = sortBy(users, 'invalid'); // ✗ Type error
```

## Tree Shaking

Import only what you need:

```tsx
// ✓ Good - Only imports formatDate
import { formatDate } from '@ncobase/utils';

// ✗ Avoid - Imports everything
import * as utils from '@ncobase/utils';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Node.js 18+

## Dependencies

Minimal dependencies for core functionality:

- date-fns (for date utilities)
- lodash-es (for some object/array utilities)

## Performance

All utilities are optimized for production use:

- Memoization where appropriate
- Efficient algorithms
- Minimal memory footprint
- Tree-shakeable exports

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

For issues and questions, please open an issue on GitHub.
