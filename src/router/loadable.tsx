import React from 'react';

import { Loader } from '@mantine/core';

export const SuspenseFallback = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Loader color='blue' type='dots' />
    </div>
  );
  // <LoadingOverlay
  //   visible
  //   overlayProps={{ blur: 2, opacity: 0.05 }}
  //   loaderProps={{ type: 'dots' }}
  // />
};

export const loadComp = (Com: React.LazyExoticComponent<any>) => {
  return class LoadComp extends React.Component<any, any> {
    override render() {
      return (
        <React.Suspense fallback={<SuspenseFallback />}>
          <Com {...this.props} />
        </React.Suspense>
      );
    }
  };
};
