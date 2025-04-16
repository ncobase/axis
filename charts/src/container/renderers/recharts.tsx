import React from 'react';

import { ResponsiveContainer } from 'recharts';

type RechartsRendererProps = {
  children: React.ReactElement;
  responsiveProps?: React.ComponentProps<typeof ResponsiveContainer>;
};

/**
 * Recharts renderer component
 * Wraps charts in a responsive container for proper sizing
 */
const RechartsRenderer: React.FC<RechartsRendererProps> = ({ children, responsiveProps }) => {
  const defaultProps = {
    width: '100%',
    height: '100%',
    ...responsiveProps
  };

  return <ResponsiveContainer {...defaultProps}>{children}</ResponsiveContainer>;
};

export default RechartsRenderer;
