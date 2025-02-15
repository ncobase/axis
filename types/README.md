# @ncobase/types

Common TypeScript type definitions

## Installation

```bash
pnpm add @ncobase/types
```

## Usage

### Environment Types

Environment related type definitions for configuration.

```typescript
import type { HostVariables, Environment, EnvironmentConfig } from '@ncobase/types';

const config: EnvironmentConfig = {
  development: {
    HOST: 'localhost',
    PORT: '3000',
    PATH: '/api'
  }
};
```

### Utility Types

General purpose utility types.

```typescript
import type {
  AsyncOrSync,
  AsyncOrSyncReturn,
  Overwrite,
  PlainObject,
  DeepPartial
} from '@ncobase/types';

// Async or sync function return type
type UserFetch = () => Promise<{ id: number }>;
type User = AsyncOrSyncReturn<UserFetch>; // { id: number }

// Deep partial type
interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
    name: string;
  };
}

type PartialConfig = DeepPartial<Config>;
const config: PartialConfig = {
  server: {
    host: 'localhost'
    // port is optional
  }
  // database is optional
};
```

### React Types

React specific type definitions.

```typescript
import type { ComponentProps, CSSProperties, EventHandler } from '@ncobase/types';

// Component props type
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const styles: CSSProperties = {
  color: 'blue',
  fontSize: 16
};

// Event handler type
const handleClick: EventHandler<React.MouseEvent> = event => {
  console.log('Clicked:', event.target);
};
```

## Available Types

### Environment Types

- `HostVariables` - Host environment variables configuration
- `Environment` - Environment type ('production' | 'development' | 'test')
- `EnvironmentConfig` - Environment configuration mapping

### Utility Types

- `AsyncOrSync<T>` - Type that can be T or Promise<T>
- `AsyncOrSyncReturn<T>` - Return type of async or sync function
- `Overwrite<T, U>` - Merge two types, overwriting first type's properties with second
- `PlainObject` - Object literal type
- `AnyObject` - Any object type
- `ObjectArray` - Array of objects
- `DeepPartial<T>` - Make all properties in T and its nested objects optional
- `DeepRequired<T>` - Make all properties in T and its nested objects required
- `NonNullable<T>` - Remove null and undefined from T
- `Awaited<T>` - Unwrap Promise type

### React Types

- `ComponentProps<T>` - Extract props type from React component
- `CSSProperties` - React CSS properties type
- `EventHandler<E>` - React event handler type
