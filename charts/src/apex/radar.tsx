import React from 'react';

import { ApexChart, type ApexChartProps } from './chart';

export type RadarChartProps = Omit<ApexChartProps, 'type'> & {
  type?: Extract<ApexChartProps['type'], 'radar'>;
};

/**
 * Radar chart component
 * Specialized wrapper for radar charts
 */
export const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  ({ type = 'radar', ...props }, ref) => {
    return <ApexChart ref={ref} type={type} {...props} />;
  }
);

RadarChart.displayName = 'RadarChart';
