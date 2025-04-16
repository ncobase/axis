import { forwardRef } from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type LineChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'line'>;
};

/**
 * Line chart component
 * Specialized wrapper for line charts
 */
export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(
  ({ type = 'line', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

LineChart.displayName = 'LineChart';
