import React, { useRef, useEffect } from 'react';

import { init } from 'echarts';
import type { EChartsOption } from 'echarts';

type EChartsRendererProps = {
  options: EChartsOption;
  settings?: {
    locale?: string;
    renderer?: 'canvas' | 'svg';
    useDirtyRect?: boolean;
    pointerOnHover?: boolean;
    notMerge?: boolean;
    lazyUpdate?: boolean;
  };
  style?: React.CSSProperties;
};

/**
 * ECharts renderer component
 * Handles initialization, resizing, and cleanup of ECharts instances
 */
const EChartsRenderer: React.FC<EChartsRendererProps> = ({ options, settings, style }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // @ts-expect-error
  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    try {
      const chart = init(chartRef.current, null, settings);

      // Set chart options
      chart.setOption(options, {
        notMerge: settings?.notMerge,
        lazyUpdate: settings?.lazyUpdate
      });

      // Handle resize events
      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    } catch (error) {
      console.error('Failed to initialize ECharts:', error);
    }
  }, [options, settings]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />;
};

export default EChartsRenderer;
