# @ncobase/flows

A powerful flow diagram and workflow visualization library built on React Flow. Create interactive flowcharts, process diagrams, and visual workflows with ease.

## Features

- **Interactive Diagrams**: Drag-and-drop node creation and connection
- **Custom Nodes**: Extensible node types for different use cases
- **Auto Layout**: Automatic diagram layout algorithms
- **Zoom & Pan**: Smooth navigation of large diagrams
- **Mini Map**: Overview navigation for complex flows
- **Edge Types**: Multiple edge styles (straight, bezier, step)
- **Node Grouping**: Group related nodes together
- **Undo/Redo**: Full history management
- **Export**: Export diagrams as PNG, SVG, or JSON
- **Responsive**: Works on desktop and mobile devices

## Installation

```bash
npm install @ncobase/flows
# or
pnpm add @ncobase/flows
# or
yarn add @ncobase/flows
```

## Quick Start

### Basic Flow Diagram

```tsx
import { FlowCanvas, Node, Edge } from '@ncobase/flows';

function MyFlow() {
  const nodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Process' },
      position: { x: 0, y: 100 }
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'End' },
      position: { x: 0, y: 200 }
    }
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' }
  ];

  return (
    <FlowCanvas
      nodes={nodes}
      edges={edges}
      onNodesChange={changes => console.log('Nodes changed:', changes)}
      onEdgesChange={changes => console.log('Edges changed:', changes)}
    />
  );
}
```

### Interactive Flow Editor

```tsx
import { FlowEditor } from '@ncobase/flows';

function FlowEditorExample() {
  const [flow, setFlow] = useState({
    nodes: [],
    edges: []
  });

  return (
    <FlowEditor
      flow={flow}
      onChange={setFlow}
      editable={true}
      showMiniMap={true}
      showControls={true}
    />
  );
}
```

## Node Types

### Built-in Node Types

```tsx
// Input Node - Starting point
{
  id: '1',
  type: 'input',
  data: { label: 'Start' },
  position: { x: 0, y: 0 },
}

// Default Node - Standard process
{
  id: '2',
  type: 'default',
  data: { label: 'Process' },
  position: { x: 0, y: 100 },
}

// Output Node - End point
{
  id: '3',
  type: 'output',
  data: { label: 'End' },
  position: { x: 0, y: 200 },
}

// Decision Node - Conditional branching
{
  id: '4',
  type: 'decision',
  data: { label: 'Is Valid?' },
  position: { x: 0, y: 300 },
}
```

### Custom Node Types

```tsx
import { FlowCanvas, CustomNode } from '@ncobase/flows';

const CustomTaskNode = ({ data }) => {
  return (
    <div className='custom-node'>
      <div className='node-header'>{data.label}</div>
      <div className='node-body'>
        <p>Assignee: {data.assignee}</p>
        <p>Status: {data.status}</p>
      </div>
    </div>
  );
};

const nodeTypes = {
  task: CustomTaskNode
};

function FlowWithCustomNodes() {
  return <FlowCanvas nodes={nodes} edges={edges} nodeTypes={nodeTypes} />;
}
```

## Edge Types

```tsx
// Straight Edge
{
  id: 'e1',
  source: '1',
  target: '2',
  type: 'straight',
}

// Bezier Edge (default)
{
  id: 'e2',
  source: '2',
  target: '3',
  type: 'default',
}

// Step Edge
{
  id: 'e3',
  source: '3',
  target: '4',
  type: 'step',
}

// Animated Edge
{
  id: 'e4',
  source: '4',
  target: '5',
  animated: true,
}

// Labeled Edge
{
  id: 'e5',
  source: '5',
  target: '6',
  label: 'Success',
  labelStyle: { fill: '#10b981' },
}
```

## Features

### Auto Layout

```tsx
import { FlowCanvas, autoLayout } from '@ncobase/flows';

function AutoLayoutFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleAutoLayout = () => {
    const layouted = autoLayout(nodes, edges, {
      direction: 'TB', // Top to Bottom
      spacing: [50, 50]
    });
    setNodes(layouted.nodes);
  };

  return (
    <>
      <button onClick={handleAutoLayout}>Auto Layout</button>
      <FlowCanvas nodes={nodes} edges={edges} />
    </>
  );
}
```

### Mini Map

```tsx
import { FlowCanvas, MiniMap } from '@ncobase/flows';

function FlowWithMiniMap() {
  return (
    <FlowCanvas nodes={nodes} edges={edges}>
      <MiniMap
        nodeColor={node => {
          switch (node.type) {
            case 'input':
              return '#10b981';
            case 'output':
              return '#ef4444';
            default:
              return '#3b82f6';
          }
        }}
      />
    </FlowCanvas>
  );
}
```

### Controls

```tsx
import { FlowCanvas, Controls } from '@ncobase/flows';

function FlowWithControls() {
  return (
    <FlowCanvas nodes={nodes} edges={edges}>
      <Controls showZoom={true} showFitView={true} showInteractive={true} />
    </FlowCanvas>
  );
}
```

### Background

```tsx
import { FlowCanvas, Background } from '@ncobase/flows';

function FlowWithBackground() {
  return (
    <FlowCanvas nodes={nodes} edges={edges}>
      <Background
        variant='dots' // 'dots' | 'lines' | 'cross'
        gap={12}
        size={1}
      />
    </FlowCanvas>
  );
}
```

## Events

```tsx
<FlowCanvas
  nodes={nodes}
  edges={edges}
  onNodeClick={(event, node) => console.log('Node clicked:', node)}
  onNodeDoubleClick={(event, node) => console.log('Node double-clicked:', node)}
  onNodeDragStart={(event, node) => console.log('Node drag start:', node)}
  onNodeDragStop={(event, node) => console.log('Node drag stop:', node)}
  onEdgeClick={(event, edge) => console.log('Edge clicked:', edge)}
  onConnect={connection => console.log('Nodes connected:', connection)}
  onConnectStart={(event, { nodeId, handleType }) => console.log('Connect start')}
  onConnectEnd={event => console.log('Connect end')}
/>
```

## Export

```tsx
import { FlowCanvas, exportToPNG, exportToSVG, exportToJSON } from '@ncobase/flows';

function ExportableFlow() {
  const flowRef = useRef(null);

  const handleExportPNG = () => {
    exportToPNG(flowRef.current, 'my-flow.png');
  };

  const handleExportSVG = () => {
    exportToSVG(flowRef.current, 'my-flow.svg');
  };

  const handleExportJSON = () => {
    const json = exportToJSON(nodes, edges);
    console.log(json);
  };

  return (
    <>
      <button onClick={handleExportPNG}>Export PNG</button>
      <button onClick={handleExportSVG}>Export SVG</button>
      <button onClick={handleExportJSON}>Export JSON</button>
      <FlowCanvas ref={flowRef} nodes={nodes} edges={edges} />
    </>
  );
}
```

## Styling

```css
/* Custom node styles */
.custom-node {
  padding: 10px;
  border-radius: 8px;
  background: white;
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-node:hover {
  border-color: #2563eb;
}

/* Custom edge styles */
.react-flow__edge-path {
  stroke: #3b82f6;
  stroke-width: 2;
}

.react-flow__edge.selected .react-flow__edge-path {
  stroke: #2563eb;
  stroke-width: 3;
}
```

## API Reference

### FlowCanvas Props

| Prop            | Type                   | Default | Description          |
| --------------- | ---------------------- | ------- | -------------------- |
| `nodes`         | `Node[]`               | `[]`    | Array of nodes       |
| `edges`         | `Edge[]`               | `[]`    | Array of edges       |
| `nodeTypes`     | `NodeTypes`            | -       | Custom node types    |
| `edgeTypes`     | `EdgeTypes`            | -       | Custom edge types    |
| `onNodesChange` | `(changes) => void`    | -       | Node change callback |
| `onEdgesChange` | `(changes) => void`    | -       | Edge change callback |
| `onConnect`     | `(connection) => void` | -       | Connection callback  |
| `fitView`       | `boolean`              | `false` | Fit view on mount    |

### Node Type

```typescript
interface Node {
  id: string;
  type?: string;
  data: any;
  position: { x: number; y: number };
  style?: CSSProperties;
  className?: string;
}
```

### Edge Type

```typescript
interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
  style?: CSSProperties;
}
```

## Use Cases

- **Workflow Automation**: Visual workflow builders
- **Process Diagrams**: Business process modeling
- **State Machines**: State transition diagrams
- **Data Pipelines**: ETL and data flow visualization
- **Decision Trees**: Decision-making flowcharts
- **Network Diagrams**: System architecture visualization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 19+
- React Flow 11+

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

For issues and questions, please open an issue on GitHub.
