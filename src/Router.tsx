import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Lab1, Lab1dop, Lab2, Lab3, Lab4, Lab5, Lab5_1, Lab5_2, Lab5_dop } from './labs';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path={'/lab1'} element={<Lab1 />} />
      <Route path={'/lab1/dop'} element={<Lab1dop />} />
      <Route path={'/lab2'} element={<Lab2 />} />
      <Route path={'/lab3'} element={<Lab3 />} />
      <Route path={'/lab4'} element={<Lab4 />} />
      <Route path={'/lab5'} element={<Lab5 />} />
      <Route path={'/lab5/1'} element={<Lab5_1 />} />
      <Route path={'/lab5/2'} element={<Lab5_2 />} />
      <Route path={'/lab5/dop'} element={<Lab5_dop />} />
    </Routes>
  );
};
