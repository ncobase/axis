import React from 'react';

import { Column } from '@ant-design/plots';

const data = {
  type: 'fetch',
  value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json'
};

type Props = {};

const BarChart: React.FC<Props> = () => {
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
    }
  };
  return <Column {...config} />;
};

export { BarChart };
