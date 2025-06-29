import React from 'react';

import { cx } from '@ncobase/utils';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

import { FlowViewProvider } from './context';
import { classes } from './styles';
import type { FlowViewProps } from './types';

import '@xyflow/react/dist/style.css';

const FlowViewContent: React.FC<FlowViewProps> = ({
  className,
  children,
  nodes,
  edges,
  background = true,
  minZoom = 0.2,
  maxZoom = 1.2,
  flowProps,
  flowBackgroundProps
}) => {
  return (
    <ReactFlow
      className={cx(classes.container, className)}
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
  }

  return <FlowViewContent {...props} />;
};
