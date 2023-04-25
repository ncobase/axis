import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { TopicRoutes } from '@/pages/content/topic/topic.routes';

export const ContentRoutes = () => {
  return (
    <Routes>
      <Route path='/topic/*' element={<TopicRoutes />} />
      <Route path='/taxonomy/*' element={<TopicRoutes />} />
      <Route path='/comment/*' element={<TopicRoutes />} />
      <Route path='/trash/*' element={<TopicRoutes />} />
      <Route path='/approval/*' element={<TopicRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
