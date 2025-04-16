import { forwardRef } from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type AreaChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'area'>;
};

/**
 * Area chart component
 * Specialized wrapper for area charts
 */
export const AreaChart = forwardRef<HTMLDivElement, AreaChartProps>(
  ({ type = 'area', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

AreaChart.displayName = 'AreaChart';
