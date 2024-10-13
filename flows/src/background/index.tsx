import React from 'react';

import {
  BackgroundVariant,
  Background as FlowBackground,
  BackgroundProps as FlowBackgroundProps
} from '@xyflow/react';

export type BackgroundVariantType = BackgroundVariant;
type BackgroundProps = FlowBackgroundProps;

export const Background: React.FC<BackgroundProps> = ({ gap = 10, color = '#cbd5e1', ...rest }) => {
  return <FlowBackground {...rest} gap={gap} color={color} />;
};
