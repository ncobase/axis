import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Comment } from '@/features/content/comment/comment';

export const CommentRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Comment />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
