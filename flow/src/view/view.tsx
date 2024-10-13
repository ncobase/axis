import React from 'react';

import { cn } from '@ncobase/utils';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

import { FlowViewProvider } from './context';
import { classes } from './styles';
import { FlowViewProps } from './types';

import '@xyflow/react/dist/style.css';

const FlowViewContent: React.FC<FlowViewProps> = ({
  className,
  children,
  nodes,
  edges,
  background = true,
  minZoom = 0.1,
  maxZoom = 2,
  flowProps,
  flowBackgroundProps
}) => {
  return (
    <ReactFlow
      className={cn(classes.container, className)}
      nodes={nodes}
      edges={edges}
      panOnScroll
      fitView
      minZoom={minZoom}
      maxZoom={maxZoom}
      {...flowProps}
    >
      {children}
      <MiniMap />
      <Controls />
      {background && <Background gap={10} color='#cbd5e1' {...flowBackgroundProps} />}
    </ReactFlow>
  );
};

export const FlowView: React.FC<FlowViewProps> = ({ useProvider = false, ...props }) => {
  if (useProvider) {
    return (
      <FlowViewProvider {...props}>
        <FlowViewContent {...props} />
      </FlowViewProvider>
    );
  } else {
    return <FlowViewContent {...props} />;
  }
};
