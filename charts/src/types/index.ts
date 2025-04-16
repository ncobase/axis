import type { ComponentType, ReactNode } from 'react';

import type { EChartsOption } from 'echarts';
import type { ResponsiveContainerProps } from 'recharts';

/**
 * Theme configuration type
 * Defines colors for light and dark themes
 */
export type ChartTheme = {
  light: string;
  dark: string;
};

/**
 * Item configuration type
 * Defines appearance for individual chart items
 */
export type ChartItemConfig = {
  label?: ReactNode;
  icon?: ComponentType;
} & ({ color?: string; theme?: never } | { color?: never; theme: ChartTheme });

/**
 * Chart configuration type
 * Maps item keys to their configurations
 */
export type ChartConfig = Record<string, ChartItemConfig>;

/**
 * Chart context props
 * Data shared through the chart context
 */
export type ChartContextProps = {
  config: ChartConfig;
};

/**
 * Supported chart libraries
 */
export type ChartLibrary = 'recharts' | 'echarts';

/**
 * ECharts specific settings
 */
export type EChartsSettings = {
  locale?: string;
  renderer?: 'canvas' | 'svg';
  useDirtyRect?: boolean;
  pointerOnHover?: boolean;
  notMerge?: boolean;
  lazyUpdate?: boolean;
};

/**
 * ECharts specific props
 */
export type EChartsProps = {
  option: EChartsOption;
  style?: React.CSSProperties;
  settings?: EChartsSettings;
};

/**
 * Recharts specific props
 */
export type RechartsProps = {
  responsiveProps?: ResponsiveContainerProps;
};

/**
 * Combined chart props
 * Union type that includes library-specific props based on the selected library
 */
export type ChartProps = {
  config: ChartConfig;
  library?: ChartLibrary;
} & (
  | { library: 'recharts'; recharts: RechartsProps; echarts?: never }
  | { library: 'echarts'; recharts?: never; echarts: EChartsProps }
  | { library?: 'recharts'; recharts?: RechartsProps; echarts?: never }
);
