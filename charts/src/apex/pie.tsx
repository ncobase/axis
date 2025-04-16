import { forwardRef } from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type PieChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'pie' | 'donut'>;
};

/**
 * Pie chart component
 * Specialized wrapper for pie and donut charts
 */
export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  ({ type = 'pie', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

PieChart.displayName = 'PieChart';
