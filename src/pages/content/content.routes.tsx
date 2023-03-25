import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
const TopicRoutes = React.lazy(() => import('@/pages/content/topic/topic.routes'));

const ContentRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='topic' />} />
      <Route path='/topic/*' element={<TopicRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};

export default ContentRoutes;
