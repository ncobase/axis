import React from 'react';

type ApexChartsRendererProps = {
  children: React.ReactElement;
};

const ApexChartsRenderer: React.FC<ApexChartsRendererProps> = ({ children }) => {
  // ApexCharts typically doesn't need a wrapper like Recharts does,
  // so we simply return the children as they are
  return children;
};

export default ApexChartsRenderer;
