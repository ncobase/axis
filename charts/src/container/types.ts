import type { ComponentType, ReactNode } from 'react';

import type { EChartsOption } from 'echarts';
import type { ResponsiveContainerProps } from 'recharts';

// Theme configuration type
export type ChartTheme = {
  light: string;
  dark: string;
};

// Item configuration type
export type ChartItemConfig = {
  label?: ReactNode;
  icon?: ComponentType;
} & ({ color?: string; theme?: never } | { color?: never; theme: ChartTheme });

// Chart configuration type
export type ChartConfig = Record<string, ChartItemConfig>;

// Chart context props
export type ChartContextProps = {
  config: ChartConfig;
};

// Supported chart libraries
export type ChartLibrary = 'recharts' | 'echarts' | 'apexcharts';

// ECharts specific props
export type EChartsSettings = {
  locale?: string;
  renderer?: 'canvas' | 'svg';
  useDirtyRect?: boolean;
  pointerOnHover?: boolean;
  notMerge?: boolean;
  lazyUpdate?: boolean;
};

export type EChartsProps = {
  option: EChartsOption;
  style?: React.CSSProperties;
  settings?: EChartsSettings;
};

// Recharts specific props
export type RechartsProps = {
  responsiveProps?: ResponsiveContainerProps;
};

// ApexCharts specific props
export type ApexChartsProps = {
  // Add ApexCharts specific props here when needed
};

// Combined chart props
export type ChartProps = {
  config: ChartConfig;
  library?: ChartLibrary;
} & (
  | { library: 'recharts'; recharts: RechartsProps; echarts?: never; apexcharts?: never }
  | { library: 'echarts'; recharts?: never; echarts: EChartsProps; apexcharts?: never }
  | { library: 'apexcharts'; recharts?: never; echarts?: never; apexcharts: ApexChartsProps }
  | { library?: 'recharts'; recharts?: RechartsProps; echarts?: never; apexcharts?: never }
);
