import React from 'react';

import { Carousel } from '@mantine/carousel';
import { Box, Container, Grid, Skeleton } from '@mantine/core';

import { Page } from '@/components/layout';

// const BoxContent = ({ children }: any) => (
//   <Box bg='white' className='rounded-md shadow-lg shadow-slate-200/10' p={16} mb={16}>
//     {children}
//   </Box>
// );

export const Sales = () => {
  const card = Array.from({ length: 4 }).map((_, index) => (
    <Grid.Col key={index} span={3}>
      <Skeleton height={288} radius='md' animate={false} />
    </Grid.Col>
  ));

  return (
    <Page title='Sales' p={0}>
      <Box className='bg-white h-80 shadow-lg shadow-slate-200/20'>
        <Container fluid py={16}>
          <Grid gutter={16}>
            <Carousel align='start' w='100%' withControls={false} draggable={card.length > 4} loop>
              {card}
            </Carousel>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container fluid py={16}>
          <Grid gutter={16} columns={12}>
            <Grid.Col span={6}>
              <Skeleton height={780} radius='md' animate={false} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton height={780} radius='md' animate={false} />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};
