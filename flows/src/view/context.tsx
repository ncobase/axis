import React, { createContext, useContext, type ReactNode } from 'react';

import type { FlowViewProps } from './types';

export const FlowViewContext = createContext<Partial<FlowViewProps> | null>(null);

interface FlowViewProviderProps extends Partial<FlowViewProps> {
  children: ReactNode;
  value?: Partial<FlowViewProps>;
}

export const FlowViewProvider: React.FC<FlowViewProviderProps> = ({ children, ...value }) => {
  return <FlowViewContext.Provider value={value}>{children}</FlowViewContext.Provider>;
};

export const useFlowView = () => {
  const context = useContext(FlowViewContext);
  if (context === null) {
    throw new Error('useFlowView must be used within a FlowViewProvider');
  }
  return context;
};
