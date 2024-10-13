import { ReactNode, MutableRefObject } from 'react';

import { Node, Edge, ReactFlowInstance, ReactFlowProps, BackgroundProps } from '@xyflow/react';

export enum SelectType {
  Selected = 'selected',
  Unselected = 'unselected',
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
  flowDataAdapter?: (params: FlowDataAdapterParams) => void;
  mapping?: NodeMapping;
  useProvider?: boolean;
  reactFlowInstance?: ReactFlowInstance;
  miniMapPosition?: MiniMapPosition;
  flowViewRef?: MutableRefObject<ReactNode>;
  setMiniMapPosition?: React.Dispatch<React.SetStateAction<MiniMapPosition>>;
  updateSelectNode?: (nodeId: string, selectType: SelectType) => void;
  updateSelectEdge?: (edgeId: string, selectType: SelectType) => void;
  updateSelectNodes?: (nodeIds: string[], selectType: SelectType) => void;
  updateSelectEdges?: (edgeIds: string[], selectType: SelectType) => void;
  flowProps?: ReactFlowProps;
  flowBackgroundProps?: BackgroundProps;
}
