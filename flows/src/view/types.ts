import type { ReactNode, MutableRefObject } from 'react';

import type { Node, Edge, ReactFlowInstance, ReactFlowProps, BackgroundProps } from '@xyflow/react';

export enum SelectType {
  // eslint-disable-next-line no-unused-vars
  Selected = 'selected',
  // eslint-disable-next-line no-unused-vars
  Unselected = 'unselected',
  // eslint-disable-next-line no-unused-vars
  Highlighted = 'highlighted'
}

export interface FlowViewNode extends Node {
  select?: SelectType;
}

export interface FlowViewEdge extends Edge {
  select?: SelectType;
}

export interface MiniMapPosition {
  x: number;
  y: number;
}

export interface LayoutOptions {
  rankdir: 'TB' | 'BT' | 'LR' | 'RL';
  align: 'UL' | 'DL' | 'UR' | 'DR';
  nodesep: number;
  ranksep: number;
}

export type NodeMapping = Record<string, FlowViewNode>;

export interface FlowDataAdapterParams {
  nodes: FlowViewNode[];
  edges: FlowViewEdge[];
  zoom: number;
  autoLayout: boolean;
  layoutOptions: LayoutOptions;
}

export interface FlowViewProps {
  className?: string;
  children?: ReactNode;
  nodes: FlowViewNode[];
  edges: FlowViewEdge[];
  background?: boolean;
  minZoom?: number;
  maxZoom?: number;
  // eslint-disable-next-line no-unused-vars
  flowDataAdapter?: (params: FlowDataAdapterParams) => void;
  mapping?: NodeMapping;
  useProvider?: boolean;
  reactFlowInstance?: ReactFlowInstance;
  miniMapPosition?: MiniMapPosition;
  flowViewRef?: MutableRefObject<ReactNode>;
  setMiniMapPosition?: React.Dispatch<React.SetStateAction<MiniMapPosition>>;
  // eslint-disable-next-line no-unused-vars
  updateSelectNode?: (nodeId: string, selectType: SelectType) => void;
  // eslint-disable-next-line no-unused-vars
  updateSelectEdge?: (edgeId: string, selectType: SelectType) => void;
  // eslint-disable-next-line no-unused-vars
  updateSelectNodes?: (nodeIds: string[], selectType: SelectType) => void;
  // eslint-disable-next-line no-unused-vars
  updateSelectEdges?: (edgeIds: string[], selectType: SelectType) => void;
  flowProps?: ReactFlowProps;
  flowBackgroundProps?: BackgroundProps;
}
