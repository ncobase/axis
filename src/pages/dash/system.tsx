import { Box, Container, Grid, Skeleton } from '@mantine/core';
import React from 'react';

import { Page } from '@/layouts/main';
import { useTheme } from '@/themes';

const child = <Skeleton height={140} radius='md' animate={false} />;

export const System = () => {
  const theme = useTheme();
  return (
    <Page title='System' header={<></>} withLayout noWithContainer>
      <Box style={{ backgroundColor: theme.white, height: 320 }}>
        <Container>
          <Grid columns={2}>
            <Grid.Col>{child}</Grid.Col>
            <Grid.Col>{child}</Grid.Col>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container>
          <Grid>
            <Grid.Col>{child}</Grid.Col>
            <Grid.Col>{child}</Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};
