# Migration From `frontend/packages`

`axis` is the frontend library source of truth. The duplicated `frontend/packages` tree is a
migration-era copy and should not receive long-term library work unless a task explicitly targets
that tree.

## Current Package Mapping

| Package  | Axis source     | Legacy source                 | Current state                                    | Next work                                                                                                |
| -------- | --------------- | ----------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| React UI | `axis/react`    | `frontend/packages/react`     | README migrated; source is not fully diff-clean. | Move any remaining useful exports/styles/fixes into `axis/react`, then consume the package from console. |
| Editor   | `axis/editor`   | `frontend/packages/editor`    | README migrated.                                 | Reconcile Tiptap major version with console before shared release.                                       |
| Charts   | `axis/charts`   | no active duplicate found     | Existing package.                                | Add docs/tests for Recharts/ECharts theme behavior.                                                      |
| Flows    | `axis/flows`    | `frontend/packages/flows`     | README migrated.                                 | Add examples and API surface tests.                                                                      |
| Utils    | `axis/utils`    | package references in console | README migrated.                                 | Add tests for storage, URL, query, crypto helpers.                                                       |
| Tailwind | `axis/tailwind` | `frontend/packages/tailwind`  | Marked deprecated but still in workspace.        | Decide deprecate/remove/replace with Tailwind 4 token package.                                           |
| Types    | `axis/types`    | `frontend/packages/types`     | Existing package.                                | Keep DTO-like shared types generic; do not add business backend types without a plan.                    |
| Tsconfig | `axis/tsconfig` | `frontend/packages/tsconfig`  | Existing package.                                | Keep version aligned with React/TypeScript toolchain.                                                    |
| Scaffold | `axis/scaffold` | no real legacy implementation | Private placeholder/reserved package.            | Real scaffolding lives in console Builder until backend generation exists.                               |

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

1. Finish `axis/react` export/style/type parity.
2. Add minimal component tests or build API checks in `axis`.
3. Remove console alias for `@ncobase/react`.
4. Consume workspace/package builds in console.
5. Keep business-only components in the console app.

## Compatibility Notes

- Console currently uses React 19 and Tiptap 3.
- Some `axis` packages still reflect older peer/tooling versions; align before publishing.
- Drawer export in `axis/react` has known declaration-generation concerns and must be resolved before
  treating the package as complete.
- `axis/scaffold` is a reserved private package, not a production generator.

## Required Release Checks

Before an `axis` package release:

1. `pnpm build` for the changed package and dependents.
2. Verify `exports`, generated `.d.ts`, and peer dependencies.
3. Update package README for public API changes.
4. Update changelog/version when releasing.
5. Run console build after alias migration changes.
