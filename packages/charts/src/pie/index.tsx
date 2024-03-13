import React from 'react';

import { Pie } from '@ant-design/plots';

const data = {
  type: 'fetch',
  value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/pie-doughnut.json'
};

type Props = {};

const PieChart: React.FC<Props> = () => {
  const config = {
    data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d: any, i: number, data: []) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12
        }
      }
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t: number) => t * 0.8 + 0.1
      }
    }
  };
  return <Pie {...config} />;
};

export { PieChart };
