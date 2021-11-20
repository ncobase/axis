import React from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error }: FallbackProps) => {
  return <>{error.message}</>;
};

export const ErrorBoundary: React.FC<React.PropsWithChildren<unknown>> = props => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
};
