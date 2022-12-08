import { ReactElement, useMemo } from 'react';

import { Arrow, Circle, Rect } from './components';
import { IState, PetriProvider } from './context/usePetriContext';

import styles from './lab5.module.scss';

export const Lab5 = (): ReactElement => {
  const state = useMemo<IState>(
    () => ({
      conditions: {
        P1: {
          count: 10,
          out: {
            S1: 1,
            S2: 1,
          },
        },
        P2: {
          count: 0,
          out: null,
        },
        P3: {
          count: 1,
          out: {
            S2: 1,
          },
        },
      },
      state: {
        S1: {
          in: {
            P1: 1,
          },
          out: {
            P2: 1,
            P3: 1,
          },
        },
        S2: {
          in: {
            P1: 1,
            P3: 1,
          },
          out: {
            P3: 1,
            P1: 1,
          },
        },
      },
    }),
    []
  );

  return (
    <PetriProvider state={state}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Circle title={'P1'} />
          <Arrow from={'P1'} to={'S1'} />
          <Rect title={'S1'} />
          <Arrow from={'S1'} to={'P2'} />
          <Circle title={'P2'} />
        </div>
        <div style={{ display: 'flex', position: 'relative' }}>
          {/* <div
            style={{
              display: 'flex',
              width: 'min-content',
              marginTop: '-20px',
              alignItems: 'start',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex' }}> */}
          <Arrow className={styles.rotate} data-deggre={270} from={'S2'} to={'P1'} />
          <Arrow className={styles.rotate} data-deggre={90} from={'P1'} to={'S2'} />
          {/* </div> */}
          <Rect className={styles.rotate} data-deggre={2} title={'S2'} />
          <Arrow className={styles.rotate} from={'S2'} data-deggre={902} to={'P3'} />
          <Arrow className={styles.rotate} data-deggre={2702} from={'P1'} to={'S2'} />
          <Circle title={'P3'} className={styles.rotate__other_circle} />
          {/* </div>
          <div
            style={{
              display: 'flex',
              width: 'min-content',
              marginTop: '-20px',
              alignItems: 'start',
              flexDirection: 'column',
            }}
          > */}
          {/* <Arrow className={styles.rotate} from={'P1'} to={'S2'} /> */}
          {/* <Rect className={styles.rotate__other} title={'S2'} /> */}
          <Arrow className={styles.rotate} data-deggre={45} from={'S1'} to={'P3'} />
          {/* <Circle title={'P3'} className={styles.rotate__other_circle}/> */}
          {/* </div> */}
        </div>
      </div>
    </PetriProvider>
  );
};
