import type { ChartConfig, ChartItemConfig } from './types';

/**
 * Get configuration from payload
 * @param config Chart configuration
 * @param payload Payload object from chart components
 * @param key Key to look for in the payload
 * @returns The chart item configuration or undefined
 */
export function getConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
): ChartItemConfig | undefined {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  // Extract payload from nested payload object if it exists
  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  // Determine the configuration key
  let configLabelKey: string = key;

  // Try to get the key from the payload
  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  }
  // Try to get the key from the nested payload
  else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  // Return the configuration
  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

/**
 * Get theme color based on the current theme
 * @param config Chart item configuration
 * @param currentTheme Current theme ('light' or 'dark')
 * @returns The color for the current theme
 */
export function getThemeColor(
  config: ChartItemConfig | undefined,
  currentTheme: 'light' | 'dark' = 'light'
): string | undefined {
  if (!config) {
    return undefined;
  }

  if ('color' in config && config.color) {
    return config.color;
  }

  if ('theme' in config && config.theme) {
    return config.theme[currentTheme];
  }

  return undefined;
}

/**
 * Generate CSS variables for chart colors
 * @param config Chart configuration
 * @param theme Current theme ('light' or 'dark')
 * @returns CSS string with variables
 */
export function generateChartColorVariables(
  config: ChartConfig,
  theme: 'light' | 'dark' = 'light'
): string {
  return Object.entries(config)
    .map(([key, itemConfig]) => {
      const color = getThemeColor(itemConfig, theme);
      return color ? `--color-${key}: ${color};` : '';
    })
    .filter(Boolean)
    .join('\n');
}
