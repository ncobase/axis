import React from 'react';

import { Column, ColumnConfig } from '@ant-design/plots';

type Props = ColumnConfig & {};

const data = {
  type: 'fetch',
  value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json'
};

export const BarChart: React.FC<Props> = ({ ...rest }) => {
  const config = {
    data,
    xField: 'letter',
    yField: 'frequency',
    label: {
      text: (d: any) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: 'bottom'
    },
    axis: {
      y: {
        labelFormatter: '.0%'
      }
    },
    ...rest
  };
  return <Column {...config} />;
};
