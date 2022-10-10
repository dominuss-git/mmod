import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';

import styles from './App.module.scss';
import './App.scss';

export const App = (): ReactElement => {
  console.log('a')
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Router />
      </div>
    </BrowserRouter>
  );
};
