import React, { forwardRef, useId, lazy, Suspense } from 'react';

import { cn } from '@ncobase/utils';

import type { ChartConfig, ChartLibrary, EChartsProps } from '../types';

import { ChartProvider } from './context';
import { ChartStyle } from './style';

// Lazy load chart renderers to reduce initial bundle size
// This improves performance by only loading what's needed
const EChartsRenderer = lazy(() => import('./renderers/echarts'));
const RechartsRenderer = lazy(() => import('./renderers/recharts'));

export type ChartContainerProps = React.ComponentProps<'div'> & {
  // Chart configuration
  config: ChartConfig;
  // The charting library to use
  library?: ChartLibrary;
  // Chart content
  children?: React.ReactElement;
  // Responsive props for Recharts
  responsiveProps?: any;
  // ECharts specific props
  echartsProps?: EChartsProps;
  // Chart dimensions
  height?: string | number;
  width?: string | number;
};

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      id,
      className,
      children = <></>,
      config,
      library = 'recharts',
      responsiveProps,
      echartsProps,
      height = '100%',
      width = '100%',
      ...props
    },
    ref
  ) => {
    // Generate unique ID for chart if none provided
    const uniqueId = useId();
    const chartId = `ncse-chart-${id || uniqueId.replace(/:/g, '')}`;

    // Select and render appropriate chart renderer based on library
    const renderChart = () => {
      return (
        <Suspense
          fallback={
            <div className='flex items-center justify-center w-full h-full'>Loading chart...</div>
          }
        >
          {library === 'recharts' && (
            <RechartsRenderer responsiveProps={responsiveProps}>{children}</RechartsRenderer>
          )}

          {library === 'echarts' && (
            <EChartsRenderer
              options={echartsProps?.option || {}}
              settings={echartsProps?.settings}
              style={echartsProps?.style}
            />
          )}
        </Suspense>
      );
    };

    return (
      <ChartProvider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            'w-full h-full justify-center text-xs',
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          style={{ height, width }}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          {renderChart()}
        </div>
      </ChartProvider>
    );
  }
);

ChartContainer.displayName = 'Chart';
