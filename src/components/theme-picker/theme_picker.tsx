import React, { useState } from 'react';

import { ColorSwatch, MantineTheme, Popover, SimpleGrid } from '@mantine/core';

import classes from '@/components/theme-picker/theme_picker.module.css';
import { useTheme } from '@/themes';

interface IProps {
  colorTheme: MantineTheme;
  setColorTheme: React.Dispatch<React.SetStateAction<MantineTheme>>;
}

// Render a component which allows the user to change global state regarding the colorTheme
export const ThemePicker: React.FC<IProps> = ({ colorTheme, setColorTheme }) => {
  const { colors } = useTheme();
  const [opened, setOpened] = useState(false);
  const colorPalletes = Object.keys(colors).map((color: string) => (
    <ColorSwatch
      className={classes.radioGroup}
      size={36}
      key={color}
      component='button'
      color={colors[color][6]}
      onClick={() => {
        setColorTheme((prevState: MantineTheme) => {
          return { ...prevState, primaryColor: color };
        });
      }}
      style={{ color: '#fff', cursor: 'pointer' }}
    >
      {colorTheme.primaryColor === color && null}
    </ColorSwatch>
  ));

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      // target={<Button onClick={() => setOpened(o => !o)}>Change Color Scheme</Button>}
      width={260}
      position='top'
      withArrow
    >
      <SimpleGrid cols={5}>{colorPalletes}</SimpleGrid>
    </Popover>
  );
};
