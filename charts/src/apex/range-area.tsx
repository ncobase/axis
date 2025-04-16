import React from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type RangeAreaChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'rangeArea'>;
};

/**
 * Range area chart component
 * Specialized wrapper for range area charts
 */
export const RangeAreaChart = React.forwardRef<HTMLDivElement, RangeAreaChartProps>(
  ({ type = 'rangeArea', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

RangeAreaChart.displayName = 'RangeAreaChart';
