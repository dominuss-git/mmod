import { ReactElement, useMemo } from 'react';

import { Arrow, Circle, Rect } from './components';
import { IState, PetriProvider } from './context/usePetriContext';

import styles from './lab5_1.module.scss';
import graph from './docs/graph1.svg';

export const Lab5_1 = (): ReactElement => {
  const state = useMemo<IState>(
    () => ({
      conditions: {
        P1: {
          count: 0,
          out: {
            S3: 1,
          },
        },
        P2: {
          count: 0,
          out: {
            S3: 1,
          },
        },
        P3: {
          count: 1,
          out: {
            S2: 1,
          },
        },
        P4: {
          count: 1,
          out: {
            S4: 1,
            S1: 1,
          },
        },
        P5: {
          count: 0,
          out: null,
        },
      },
      state: {
        S1: {
          in: {
            P4: 1,
          },
          out: {
            P1: 1,
          },
        },
        S2: {
          in: {
            P3: 1,
          },
          out: {
            P2: 1,
          },
        },
        S3: {
          in: {
            P1: 1,
            P2: 1,
          },
          out: {
            P3: 1,
            P4: 1,
          },
        },
        S4: {
          in: {
            P4: 1,
          },
          out: {
            P5: 1,
          },
        },
      },
    }),
    []
  );

  return (
    <PetriProvider state={state}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: '950px',
            height: '800px',
          }}
        >
          <Circle className={styles.rotate2} data-d={1} title={'P1'} />
          <Circle className={styles.rotate2} data-d={2} title={'P2'} />
          <Arrow className={styles.rotate2} data-d={'S1P1'} from={'S1'} to={'P1'} />
          <Arrow className={styles.rotate2} data-d={'P1S3'} from={'P1'} to={'S3'} />
          <Arrow className={styles.rotate2} data-d={'P2S3'} from={'P2'} to={'S3'} />
          <Arrow className={styles.rotate2} data-d={'S2P2'} from={'S2'} to={'P2'} />
          <Rect className={styles.rotate2} data-d={'s1'} title={'S1'} />
          <Rect className={styles.rotate2} data-d={'s3'} title={'S3'} />
          <Rect className={styles.rotate2} data-d={'s2'} title={'S2'} />
          <Arrow className={styles.rotate2} data-d={'P4S1'} from={'P4'} to={'S1'} />
          <Arrow className={styles.rotate2} data-d={'S3P4'} from={'S3'} to={'P4'} />
          <Arrow className={styles.rotate2} data-d={'S3P3'} from={'S3'} to={'P3'} />
          <Arrow className={styles.rotate2} data-d={'P3S2'} from={'P3'} to={'S2'} />
          <Circle className={styles.rotate2} data-d={3} title={'P3'} />
          <Circle className={styles.rotate2} data-d={4} title={'P4'} />
          <Arrow className={styles.rotate2} data-d={'P4S4'} from={'P4'} to={'S4'} />
          <Rect className={styles.rotate2} data-d={'s4'} title={'S4'} />
          <Arrow className={styles.rotate2} data-d={'S4P5'} from={'S4'} to={'P5'} />
          <Circle className={styles.rotate2} data-d={5} title={'P5'} />
        </div>
        {/* <img src={graph} /> */}
      </div>
    </PetriProvider>
  );
};
