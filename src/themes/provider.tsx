import React from 'react';

import {
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import DefaultTheme from '@/themes/default';

const emotionCache = createEmotionCache({ key: 'sc', prepend: false });

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...rest }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'sc-color-scheme',
    defaultValue: 'light'
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ? value : colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        emotionCache={emotionCache}
        theme={{
          ...DefaultTheme,
          colorScheme
        }}
        withGlobalStyles
        withNormalizeCSS
        {...rest}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export const useTheme = useMantineTheme;
export const useColorScheme = useMantineColorScheme;
