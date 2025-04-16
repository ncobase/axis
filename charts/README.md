# @ncobase/charts

A flexible, theme-aware charting library for React applications that provides a unified interface for multiple charting libraries including ECharts, ApexCharts, and Recharts.

## Features

- **Multiple Charting Engines**: Choose between ECharts, ApexCharts, or Recharts based on your needs
- **Unified API**: Consistent interface regardless of the underlying charting library
- **Theming Support**: Built-in light and dark theme support
- **Responsive Design**: Charts automatically resize to fit their containers
- **TypeScript Support**: Fully typed API for enhanced developer experience
- **Customizable Components**: Styled components for tooltips, legends, and other chart elements
- **Lazy Loading**: Only loads the required charting library to minimize bundle size

## Installation

```bash
npm install @ncobase/charts
```

## Basic Usage

### Chart Container

The `ChartContainer` is the core component that provides the foundation for all charts:

```jsx
import { ChartContainer } from '@ncobase/charts';

// Define chart configuration
const config = {
  data1: { label: 'Revenue', color: '#ff4d4f' },
  data2: { label: 'Expenses', color: '#52c41a' }
};

// Use with Recharts (default)
const SimpleChart = () => (
  <ChartContainer config={config}>{/* Your chart component goes here */}</ChartContainer>
);

// Use with ECharts
const EChartsExample = () => (
  <ChartContainer
    config={config}
    library='echarts'
    echartsProps={{
      option: {
        /* ECharts options */
      }
    }}
  />
);

// Use with ApexCharts
const ApexChartsExample = () => (
  <ChartContainer config={config} library='apexcharts'>
    {/* ApexCharts component goes here */}
  </ChartContainer>
);
```

## Chart Types

### Line Chart (ApexCharts)

```jsx
import { ChartContainer, LineChart } from '@ncobase/charts';

const LineChartExample = () => {
  const config = {
    data1: { label: 'Sales', color: '#1677ff' },
    data2: { label: 'Revenue', color: '#52c41a' }
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
      name: 'Revenue',
      data: [20, 35, 40, 45, 55, 65, 75, 80, 100]
    }
  ];

  const options = {
    chart: {
      toolbar: { show: false }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    stroke: {
      curve: 'smooth',
      width: 2
    }
  };

  return (
    <ChartContainer config={config} library='apexcharts'>
      <LineChart series={series} options={options} />
    </ChartContainer>
  );
};
```

### Bar Chart (ApexCharts)

```jsx
import { ChartContainer, BarChart } from '@ncobase/charts';

const BarChartExample = () => {
  const config = {
    data1: { label: 'Product A', color: '#1677ff' },
    data2: { label: 'Product B', color: '#52c41a' }
  };

  const series = [
    {
      name: 'Product A',
      data: [44, 55, 41, 67, 22, 43]
    },
    {
      name: 'Product B',
      data: [13, 23, 20, 8, 13, 27]
    }
  ];

  const options = {
    chart: {
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']
    }
  };

  return (
    <ChartContainer config={config} library='apexcharts'>
      <BarChart series={series} options={options} />
    </ChartContainer>
  );
};
```

### Pie Chart (ApexCharts)

```jsx
import { ChartContainer, PieChart } from '@ncobase/charts';

const PieChartExample = () => {
  const config = {
    slice1: { label: 'Team A', color: '#1677ff' },
    slice2: { label: 'Team B', color: '#52c41a' },
    slice3: { label: 'Team C', color: '#faad14' },
    slice4: { label: 'Team D', color: '#ff4d4f' }
  };

  const series = [44, 55, 13, 33];

  const options = {
    chart: {
      toolbar: { show: false }
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <ChartContainer config={config} library='apexcharts'>
      <PieChart series={series} options={options} />
    </ChartContainer>
  );
};
```

### Donut Chart (ApexCharts)

```jsx
import { ChartContainer, PieChart } from '@ncobase/charts';

const DonutChartExample = () => {
  const config = {
    slice1: { label: 'Desktop', color: '#1677ff' },
    slice2: { label: 'Mobile', color: '#52c41a' },
    slice3: { label: 'Tablet', color: '#faad14' }
  };

  const series = [65, 25, 10];

  const options = {
    chart: {
      toolbar: { show: false }
    },
    labels: ['Desktop', 'Mobile', 'Tablet'],
    plotOptions: {
      pie: {
        donut: {
          size: '55%'
        }
      }
    }
  };

  return (
    <ChartContainer config={config} library='apexcharts'>
      <PieChart type='donut' series={series} options={options} />
    </ChartContainer>
  );
};
```

### Recharts Example (LineChart)

```jsx
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@ncobase/charts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RechartsExample = () => {
  const config = {
    uv: { label: 'UV', color: '#1677ff' },
    pv: { label: 'PV', color: '#52c41a' }
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 }
  ];

  return (
    <ChartContainer config={config}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Line type='monotone' dataKey='uv' stroke='var(--color-uv)' />
        <Line type='monotone' dataKey='pv' stroke='var(--color-pv)' />
      </LineChart>
    </ChartContainer>
  );
};
```

### ECharts Example

```jsx
import { ChartContainer } from '@ncobase/charts';

const EChartsExample = () => {
  const config = {
    series1: { label: 'Sales', color: '#1677ff' },
    series2: { label: 'Revenue', color: '#52c41a' }
  };

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Sales', 'Revenue']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        lineStyle: {
          color: 'var(--color-series1)'
        },
        itemStyle: {
          color: 'var(--color-series1)'
        }
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310],
        lineStyle: {
          color: 'var(--color-series2)'
        },
        itemStyle: {
          color: 'var(--color-series2)'
        }
      }
    ]
  };

  return (
    <ChartContainer
      config={config}
      library='echarts'
      echartsProps={{
        option,
        settings: { renderer: 'canvas' }
      }}
    />
  );
};
```

## Theming

The library supports both light and dark themes:

```jsx
// Define theme-aware configuration
const config = {
  data1: {
    theme: {
      light: '#1677ff',
      dark: '#177ddc'
    }
  },
  data2: {
    theme: {
      light: '#52c41a',
      dark: '#49aa19'
    }
  }
};
```

## Advanced Configuration

### Custom Chart Components

You can create custom chart components based on the provided renderers:

```jsx
import React from 'react';
import { ChartContainer } from '@ncobase/charts';
import ApexCharts from 'react-apexcharts';

const CustomAreaChart = React.forwardRef(({ series, options, ...props }, ref) => {
  return (
    <ChartContainer ref={ref} library='apexcharts' config={props.config || {}} {...props}>
      <ApexCharts options={options} series={series} type='area' height={props.height || 380} />
    </ChartContainer>
  );
});

CustomAreaChart.displayName = 'CustomAreaChart';
```

### Custom Tooltip and Legend

```jsx
import { ChartTooltipContent, ChartLegendContent } from '@ncobase/charts';
import { Tooltip, Legend } from 'recharts';

// Custom tooltip with modified styling
const CustomTooltip = props => (
  <Tooltip
    content={<ChartTooltipContent {...props} className='custom-tooltip-class' indicator='line' />}
  />
);

// Custom legend with no icon
const CustomLegend = props => (
  <Legend content={<ChartLegendContent {...props} hideIcon className='custom-legend-class' />} />
);
```

## API Reference

### `ChartContainer`

The main container component for all charts.

| Prop              | Type                                      | Default      | Description                                            |
| ----------------- | ----------------------------------------- | ------------ | ------------------------------------------------------ |
| `config`          | `ChartConfig`                             | Required     | Chart configuration object                             |
| `library`         | `'recharts' \| 'echarts' \| 'apexcharts'` | `'recharts'` | The charting library to use                            |
| `height`          | `number \| string`                        | `'100%'`     | Chart height                                           |
| `width`           | `number \| string`                        | `'100%'`     | Chart width                                            |
| `responsiveProps` | `Object`                                  | -            | Props for Recharts responsive container                |
| `echartsProps`    | `Object`                                  | -            | Props for ECharts renderer                             |
| `children`        | `ReactElement`                            | -            | Chart component (required for Recharts and ApexCharts) |

### Configuration Types

```typescript
// Theme configuration
type ChartTheme = {
  light: string;
  dark: string;
};

// Item configuration
type ChartItemConfig = {
  label?: ReactNode;
  icon?: ComponentType;
} & ({ color?: string; theme?: never } | { color?: never; theme: ChartTheme });

// Chart configuration
type ChartConfig = Record<string, ChartItemConfig>;
```

## Best Practices

1. **Use Consistent Naming**: Keep data keys consistent across your application
2. **Theme Support**: Use theme objects for color definitions to support both light and dark modes
3. **Responsiveness**: Set container width and height as percentages for responsive layouts
4. **Lazy Loading**: Let the library handle lazy loading of chart libraries
5. **Custom Components**: Create reusable chart components for your specific use cases
