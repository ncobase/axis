import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Topic } from '@/pages/content/topic/topic';

export const TopicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='topic' />} />
      <Route path='/topic' element={<Topic />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
