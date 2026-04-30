# @ncobase/flows

React Flow based primitives for rendering Ncobase flow views. The package exposes the local `FlowView` wrapper, selection-aware node and edge types, background helpers, and selected re-exports from `@xyflow/react`.

## Install

```bash
pnpm add @ncobase/flows @xyflow/react
```

## Exports

- `FlowView`, `FlowViewProvider`, `FlowViewContext`, `useFlowView`
- `FlowViewNode`, `FlowViewEdge`, `FlowViewProps`, `SelectType`
- `Background`, `BackgroundVariantType`
- `BaseEdge`, `Handle`, `Position`, `applyNodeChanges`, `applyEdgeChanges`, and path helpers from `@xyflow/react`

## Basic Usage

```tsx
import { FlowView, SelectType, type FlowViewEdge, type FlowViewNode } from '@ncobase/flows';

const nodes: FlowViewNode[] = [
  {
    id: 'start',
    type: 'input',
    position: { x: 0, y: 0 },
    data: { label: 'Start' },
    select: SelectType.Selected
  }
];

const edges: FlowViewEdge[] = [];

export const Workflow = () => {
  return <FlowView nodes={nodes} edges={edges} background />;
};
```

## Provider Usage

`FlowView` can manage its own provider or run inside a shared `FlowViewProvider`.

```tsx
import { FlowView, FlowViewProvider } from '@ncobase/flows';

export const WorkflowCanvas = ({ nodes, edges }) => {
  return (
    <FlowViewProvider>
      <FlowView nodes={nodes} edges={edges} useProvider={false} />
    </FlowViewProvider>
  );
};
```

## Notes

- Layout and editor workflows should be implemented by the consuming app or a higher-level package.
- The package is intentionally thin around React Flow so downstream applications can supply custom nodes, edges, controls, and data adapters.
