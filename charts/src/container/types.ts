import { ComponentType, ReactNode } from 'react';

import { EChartsOption } from 'echarts';

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<'light' | 'dark', string> }
  );
};

export type ChartContextProps = {
  config: ChartConfig;
};

export type ChartLibrary = 'recharts' | 'echarts' | 'apexcharts';

export type EChartsProps = {
  option: EChartsOption;
  style?: React.CSSProperties;
  settings?: {
    locale?: string;
    renderer?: 'canvas' | 'svg';
    useDirtyRect?: boolean;
    pointerOnHover?: boolean;
    notMerge?: boolean;
    lazyUpdate?: boolean;
  };
};
