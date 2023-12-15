import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Topic } from '@/features/content/topic/topic';

export const TopicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Topic />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
