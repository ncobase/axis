# Migration From `frontend/packages`

`axis` is the frontend library source of truth. The duplicated `frontend/packages` tree is a
migration-era copy and should not receive long-term library work unless a task explicitly targets
that tree.

## Current Package Mapping

| Package  | Axis source     | Legacy source                 | Current state                                                                                               | Next work                                                                                                                |
| -------- | --------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| React UI | `axis/react`    | `frontend/packages/react`     | Drawer export, uploader auto-upload fix, table/editor type fixes, and README baseline are merged in `axis`. | Consume `axis/react` from console after alias/style parity checks and component tests.                                   |
| Editor   | `axis/editor`   | `frontend/packages/editor`    | README migrated and table node-view typing fixes merged.                                                    | Reconcile Tiptap major version with console before shared release.                                                       |
| Charts   | `axis/charts`   | no active duplicate found     | Existing package.                                                                                           | Add docs/tests for Recharts/ECharts theme behavior.                                                                      |
| Flows    | `axis/flows`    | `frontend/packages/flows`     | README migrated.                                                                                            | Add examples and API surface tests.                                                                                      |
| Utils    | `axis/utils`    | package references in console | README migrated.                                                                                            | Add tests for storage, URL, query, crypto helpers.                                                                       |
| Tailwind | `axis/tailwind` | `frontend/packages/tailwind`  | CSS-first Tailwind v4 theme and PostCSS config are now the active axis package shape.                       | Verify console consumption, then decide whether the legacy frontend copy can be removed.                                 |
| Types    | `axis/types`    | `frontend/packages/types`     | Existing package.                                                                                           | Keep DTO-like shared types generic; do not add business backend types without a plan.                                    |
| Tsconfig | `axis/tsconfig` | `frontend/packages/tsconfig`  | Existing package.                                                                                           | Keep version aligned with React/TypeScript toolchain.                                                                    |
| Scaffold | `axis/scaffold` | no real legacy implementation | Private programmatic API exists for project, component, and feature module generation.                      | Add generator tests, examples, and a CLI plan; keep backend schema/API generation in Builder planning until implemented. |

## Migration Rules

- New reusable UI primitives, editor extensions, chart wrappers, flow wrappers, utilities, and shared
  config belong in `axis`.
- Console-specific composition, data fetching, route guards, business forms, and feature pages stay
  in `frontend/apps/console`.
- Do not patch both `axis/*` and `frontend/packages/*` for the same long-term library behavior unless
  the task is explicitly a migration sync.
- Public package exports must be stable and documented in each package README.
- Package changes need build verification and, when risk is meaningful, unit/component tests.

## Console Consumption Target

Current console aliasing still points `@ncobase/react` to local UI sources in
`frontend/apps/console/src/components/ui`. The migration target is:

1. Finish `axis/react` export/style/type parity against console UI usage.
2. Add minimal component tests or build API checks in `axis`.
3. Verify `axis/tailwind/styles.css` works with console Tailwind v4 source scanning.
4. Remove console alias for `@ncobase/react`.
5. Consume workspace/package builds in console.
6. Keep business-only components in the console app.

## Compatibility Notes

- Console currently uses React 19 and Tiptap 3; `axis/react` still depends on Tiptap 2 packages, so
  editor compatibility must be resolved before replacing console editor usage.
- `axis/react` exports Drawer again and has passed typecheck/build after the merge.
- `axis/scaffold` is usable as a private programmatic generator, but it is not yet a complete CLI or
  backend-aware generator.

## Required Release Checks

Before an `axis` package release:

1. `pnpm build` for the changed package and dependents.
2. Verify `exports`, generated `.d.ts`, and peer dependencies.
3. Update package README for public API changes.
4. Update changelog/version when releasing.
5. Run console build after alias migration changes.
