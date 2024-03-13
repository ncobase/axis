import React from 'react';

import Line, { LineConfig } from '@ant-design/plots/es/components/line';

type Props = LineConfig & {};

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 }
];

export const LineChart: React.FC<Props> = ({ ...rest }) => {
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square'
    },
    interaction: {
      tooltip: {
        marker: false
      }
    },
    style: {
      lineWidth: 2
    },
    ...rest
  };
  return <Line {...config} />;
};
