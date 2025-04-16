import { forwardRef } from 'react';

import { cn } from '@ncobase/utils';
import Charts, { type Props } from 'react-apexcharts';

import { ChartContainer } from '..';
import type { ChartConfig } from '../types';

export type ApexChartType = Props['type'];

export type ApexChartProps = {
  config?: ChartConfig;
  type: ApexChartType;
  series: Props['series'];
  options?: Props['options'];
  height?: number | string;
  width?: number | string;
  className?: string;
};

/**
 * Base ApexCharts component
 * Provides a consistent wrapper for all ApexCharts chart types
 */
export const ApexChart = forwardRef<HTMLDivElement, ApexChartProps>(
  ({ config = {}, type, series, options, height = 380, width, className, ...props }, ref) => {
    return (
      <ChartContainer
        ref={ref}
        config={config}
        library='apexcharts'
        className={cn('!h-full !w-full', className)}
        {...props}
      >
        <Charts options={options} series={series} type={type} height={height} width={width} />
      </ChartContainer>
    );
  }
);

ApexChart.displayName = 'ApexChart';
