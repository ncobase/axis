import React, { forwardRef, useId, useRef, useEffect } from 'react';

import { cn } from '@ncobase/utils';
import { init } from 'echarts';
import { ResponsiveContainer } from 'recharts';

import { ChartProvider } from './context';
import { ChartStyle } from './style';
import { ChartConfig, ChartLibrary, EChartsProps } from './types';

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig;
  library?: ChartLibrary;
  children: React.ReactElement;
  responsiveProps?: React.ComponentProps<typeof ResponsiveContainer>;
  echartsProps?: EChartsProps;
};

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    {
      id,
      className,
      children,
      config,
      library = 'recharts',
      responsiveProps,
      echartsProps,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const chartId = `ncse-chart-${id || uniqueId.replace(/:/g, '')}`;
    const echartsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (library === 'echarts' && echartsRef.current) {
        const chart = init(echartsRef.current, null, echartsProps?.settings);
        chart.setOption(echartsProps?.option || {});

        return () => {
          chart.dispose();
        };
      }
    }, [library, echartsProps]);

    const renderChart = () => {
      switch (library) {
        case 'recharts':
          return <ResponsiveContainer {...responsiveProps}>{children}</ResponsiveContainer>;
        case 'apexcharts':
          return children;
        case 'echarts':
          return (
            <div
              ref={echartsRef}
              style={{ width: '100%', height: '100%', ...echartsProps?.style }}
            />
          );
        default:
          console.warn(`Unsupported chart library: ${library}`);
          return children;
      }
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
