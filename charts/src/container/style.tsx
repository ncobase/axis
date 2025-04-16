import type { ChartConfig } from '../types';

// Theme definition for light and dark modes
const THEMES = { light: '', dark: '.dark' } as const;

/**
 * ChartStyle component that applies theme colors to chart
 * Uses CSS variables to enable dynamic theming
 */
export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // Filter out config items with color or theme
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`
          )
          .join('\n')
      }}
    />
  );
};
