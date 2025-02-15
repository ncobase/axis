import { createContext, useContext } from 'react';

import type { ChartContextProps } from './types';

const ChartContext = createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}

export const ChartProvider = ChartContext.Provider;
