# @ncobase/scaffold

Private project scaffolding and code generation utilities for Ncobase applications.

## Current Status

`@ncobase/scaffold` now exposes a programmatic API. It can generate basic project shells,
components, and feature modules, and it reports whether files were created, overwritten, or skipped.

It is still not a complete product generator:

- No CLI package entry is defined yet.
- Generated backend schema, API, permission, menu, migration, and test files are not implemented.
- The console Builder remains the product-facing feature planning surface.
- Snapshot tests and fixture-based generation tests still need to be added.

## Exports

```ts
export const version = '0.0.1';
export const status = 'ready';

export type ProjectTemplate = 'admin-console' | 'package' | 'plugin';
export type PackageManager = 'pnpm' | 'npm' | 'yarn';
export type FileAction = 'created' | 'overwritten' | 'skipped';

export interface CreateProjectOptions {
  name: string;
  directory?: string;
  template?: ProjectTemplate;
  packageManager?: PackageManager;
  description?: string;
  features?: string[];
  overwrite?: boolean;
}

export interface GenerateComponentOptions {
  name: string;
  directory?: string;
  type?: 'component' | 'page' | 'layout';
  extension?: 'tsx' | 'jsx';
  propsName?: string;
  withIndex?: boolean;
  client?: boolean;
  overwrite?: boolean;
}

export interface GenerateFeatureOptions {
  name: string;
  directory?: string;
  withRoutes?: boolean;
  withService?: boolean;
  withTypes?: boolean;
  overwrite?: boolean;
}
```

Primary functions:

- `createProject(options)`: generate an `admin-console`, `package`, or `plugin` project shell.
- `generateComponent(options)`: generate a component/page/layout file and optional `index.ts`.
- `generateFeatureModule(options)`: generate a feature folder with optional routes, service, and
  types.
- `toKebabCase(value)` and `toPascalCase(value)`: naming helpers used by the generators.

## Usage

```ts
import { createProject, generateComponent, generateFeatureModule } from '@ncobase/scaffold';

await createProject({
  name: 'Ops Console',
  template: 'admin-console',
  directory: './tmp',
  features: ['resources', 'billing']
});

await generateComponent({
  name: 'ResourceCard',
  directory: './tmp/components',
  type: 'component',
  withIndex: true
});

await generateFeatureModule({
  name: 'Media Library',
  directory: './tmp/src',
  withRoutes: true,
  withService: true,
  withTypes: true
});
```

## Next Work

1. Add fixture-based tests for create/skip/overwrite behavior.
2. Add generated-output snapshots for each project template and feature option set.
3. Decide whether the package needs a CLI entry or remains a library consumed by Builder.
4. Align any future backend generation with the `ncobase` schema -> repository -> service ->
   handler -> permission -> docs workflow.
