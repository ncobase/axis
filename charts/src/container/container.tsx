import React, { forwardRef, useId, lazy, Suspense } from 'react';

import { cn } from '@ncobase/utils';

import { ChartProvider } from './context';
import { ChartStyle } from './style';
import type { ChartConfig, ChartLibrary, EChartsProps } from './types';

// Lazy load chart libraries to reduce initial bundle size
const EChartsRenderer = lazy(() => import('./renderers/echarts'));
const RechartsRenderer = lazy(() => import('./renderers/recharts'));
const ApexChartsRenderer = lazy(() => import('./renderers/apexcharts'));

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig;
  library?: ChartLibrary;
  children?: React.ReactElement;
  responsiveProps?: any;
  echartsProps?: EChartsProps;
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
    const uniqueId = useId();
    const chartId = `ncse-chart-${id || uniqueId.replace(/:/g, '')}`;

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

          {library === 'apexcharts' && <ApexChartsRenderer>{children}</ApexChartsRenderer>}
        </Suspense>
      );
    };

    return (
      <ChartProvider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            'flex aspect-video justify-center text-xs',
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
