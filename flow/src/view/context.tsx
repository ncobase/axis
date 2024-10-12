import React, { createContext, useContext, ReactNode } from 'react';

import { FlowViewContextProps } from './types';

export const FlowViewContext = createContext<FlowViewContextProps | null>(null);

interface FlowViewProviderProps {
  children: ReactNode;
  value: FlowViewContextProps;
}

export const FlowViewProvider: React.FC<FlowViewProviderProps> = ({ children, value }) => {
  return <FlowViewContext.Provider value={value}>{children}</FlowViewContext.Provider>;
};

export const useFlowView = () => {
  const context = useContext(FlowViewContext);
  if (context === null) {
    throw new Error('useFlowView must be used within a FlowViewProvider');
  }
  return context;
};
