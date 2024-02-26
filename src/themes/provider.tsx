import React from 'react';

import { MantineProvider, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import { theme } from './default';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...rest }) => (
  <MantineProvider theme={theme} {...rest}>
    {children}
  </MantineProvider>
);

export const useTheme = useMantineTheme;
export const useColorScheme = useMantineColorScheme;
