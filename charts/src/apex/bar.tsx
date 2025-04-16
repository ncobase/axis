import React from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type BarChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'bar'>;
};

/**
 * Bar chart component
 * Specialized wrapper for bar charts
 */
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ type = 'bar', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

BarChart.displayName = 'BarChart';
