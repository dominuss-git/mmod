import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Lab1, Lab1dop, Lab2 } from './labs';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path={'/lab1'} element={<Lab1 />} />
      <Route path={'/lab1/dop'} element={<Lab1dop />} />
      <Route path={'/lab2'} element={<Lab2 />} />
    </Routes>
  );
};
