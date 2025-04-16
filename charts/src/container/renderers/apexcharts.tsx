import React from 'react';

type ApexChartsRendererProps = {
  children: React.ReactElement;
};

/**
 * Simple wrapper for ApexCharts
 * ApexCharts doesn't require special container handling unlike other libraries
 */
const ApexChartsRenderer: React.FC<ApexChartsRendererProps> = ({ children }) => {
  return children;
};

export default ApexChartsRenderer;
