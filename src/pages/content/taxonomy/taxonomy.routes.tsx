import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Taxonomy } from '@/pages/content/taxonomy/taxonomy';

export const TaxonomyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Taxonomy />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
