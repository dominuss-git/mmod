import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Lab1, Lab1dop } from './labs';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path={'/lab1'} element={<Lab1 />} />
      <Route path={'/lab1/dop'} element={<Lab1dop />} />
    </Routes>
  );
};
