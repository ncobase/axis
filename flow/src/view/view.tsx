import React from 'react';

import { ReactFlow } from '@xyflow/react';

import { FlowViewContext, useFlowView } from './context';
import { FlowViewProps } from './types';

export const FlowView: React.FC<FlowViewProps> = ({ children, nodes, edges, ...rest }) => {
  const context = React.useContext(FlowViewContext);

  if (context === null) {
    return (
      <ReactFlow nodes={nodes} edges={edges} {...rest}>
        {children}
      </ReactFlow>
    );
  } else {
    const { nodes: contextNodes, edges: contextEdges } = useFlowView();
    return (
      <ReactFlow nodes={contextNodes} edges={contextEdges} {...rest}>
        {children}
      </ReactFlow>
    );
  }
};
