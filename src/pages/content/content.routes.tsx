import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { CommentRoutes } from '@/pages/content/comment/comment.routes';
import { TaxonomyRoutes } from '@/pages/content/taxonomy/taxonomy.routes';
import { TopicRoutes } from '@/pages/content/topic/topic.routes';

export const ContentRoutes = () => {
  return (
    <Routes>
      <Route path='/topic/*' element={<TopicRoutes />} />
      <Route path='/taxonomy/*' element={<TaxonomyRoutes />} />
      <Route path='/comment/*' element={<CommentRoutes />} />
      <Route path='/trash/*' element={<TopicRoutes />} />
      <Route path='/approval/*' element={<TopicRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
