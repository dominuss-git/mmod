import { ReactElement, useMemo } from 'react';

import { Arrow, Circle, Rect } from './components';
import { IState, PetriProvider } from './context/usePetriContext';

import styles from './lab5_dop.module.scss';

export const Lab5_dop = (): ReactElement => {
  const state = useMemo<IState>(
    () => ({
      conditions: {
        P1: {
          count: 2,
          out: {
            S1: 1,
            S2: 1
          },
        },
        P2: {
          count: 1,
          out: {
            S1: 1,
          },
        },
        P3: {
          count: 0,
          out: {
            S3: 1,
          },
        },
        P4: {
          count: 0,
          out: {
            S2: 1,
          },
        },
        P5: {
          count: 0,
          out: {
            S3: 1
          },
        },
        P6: {
          count: 0,
          out: {
            S4: 1
          }
        },
        P7: {
          count: 0,
          out: {
            S5: 1
          }
        }
      },
      state: {
        S1: {
          in: {
            P1: 1,
            P2: 1
          },
          out: {
            P3: 1,
            P4: 1,
          },
        },
        S2: {
          in: {
            P1: 1,
            P4: 1
          },
          out: {
            P2: 1,
            P5: 1
          },
        },
        S3: {
          in: {
            P3: 1,
            P5: 1
          },
          out: {
            P6: 1,
            P7: 1
          },
        },
        S4: {
          in: {
            P6: 1,
          },
          out: {
            P1: 1,
          },
        },
        S5: {
          in: {
            P7: 1,
          },
          out: {
            P1: 1,
          },
        },
      },
    }),
    []
  );

  return (
    <PetriProvider state={state}>
      <div
        style={{
          position: 'relative',
          width: '1500px',
          height: '1000px'
        }}
      >
        <Arrow className={styles.rotate2} data-d={'S4P1'} from={'S4'} to={'P1'}/>
        <Arrow className={styles.rotate2} data-d={'S5P1'} from={'S5'} to={'P1'}/>
        <Circle className={styles.rotate2} data-d={1} title={'P1'}/>
        <Arrow className={styles.rotate2} data-d={'P1S1'} from={'P1'} to={'S1'}/>
        <Arrow className={styles.rotate2} data-d={'P1S2'} from={'P1'} to={'S2'}/>
        <Arrow className={styles.rotate2} data-d={'P2S1'} from={'P2'} to={'S1'}/>
        <Circle className={styles.rotate2} data-d={2} title={'P2'}/>
        <Arrow className={styles.rotate2} data-d={'S2P2'} from={'S2'} to={'P2'}/>
        <Rect className={styles.rotate2} data-d={'S1'} title={'S1'} />
        <Rect className={styles.rotate2} data-d={'S2'} title={'S2'} />
        <Arrow className={styles.rotate2} data-d={'S1P3'} from={'S1'} to={'P3'}/>
        <Arrow className={styles.rotate2} data-d={'S1P4'} from={'S1'} to={'P4'}/>
        <Arrow className={styles.rotate2} data-d={'S2P5'} from={'S2'} to={'P5'}/>
        <Arrow className={styles.rotate2} data-d={'P4S2'} from={'P4'} to={'S2'}/>
        <Circle className={styles.rotate2} data-d={4} title={'P4'}/>
        <Circle className={styles.rotate2} data-d={3} title={'P3'}/>
        <Circle className={styles.rotate2} data-d={5} title={'P5'}/>
        <Arrow className={styles.rotate2} data-d={'P3S3'} from={'P3'} to={'S3'}/>
        <Arrow className={styles.rotate2} data-d={'P5S3'} from={'P5'} to={'S3'}/>
        <Rect className={styles.rotate2} data-d={'S3'} title={'S3'} />
        <Arrow className={styles.rotate2} data-d={'S3P6'} from={'S3'} to={'P6'}/>
        <Arrow className={styles.rotate2} data-d={'S5P7'} from={'S3'} to={'P7'}/>
        <Circle className={styles.rotate2} data-d={6} title={'P6'}/>
        <Circle className={styles.rotate2} data-d={7} title={'P7'}/>
        <Arrow className={styles.rotate2} data-d={'P6S4'} from={'P6'} to={'S4'}/>
        <Arrow className={styles.rotate2} data-d={'P7S5'} from={'P7'} to={'S5'}/>
        <Rect className={styles.rotate2} data-d={'S4'} title={'S4'} />
        <Rect className={styles.rotate2} data-d={'S5'} title={'S5'} />
        <Arrow className={styles.rotate2} data-d={'S4P12'} from={'S4'} to={'P1'}/>
        <Arrow className={styles.rotate2} data-d={'S5P12'} from={'S5'} to={'P1'}/>
        {/* <Arrow className={styles.rotate2} data-d={'S4P12'} from={'S4'} to={'P1'}/>
        <Circle className={styles.rotate2} data-d={1} title={'P1'} />
        <Arrow className={styles.rotate2} data-d={'P1S1'} from={'P1'} to={'S1'} />
        <Rect className={styles.rotate2} data-d={'s1'} title={'S1'} />
        <Arrow className={styles.rotate2} data-d={'S1P2'} from={'S1'} to={'P2'} /> 
        <Arrow className={styles.rotate2} data-d={'S1P6'} from={'S1'} to={'P6'} />
        <Arrow className={styles.rotate2} data-d={'S1P3'} from={'S1'} to={'P3'} />
        <Circle className={styles.rotate2} data-d={2} title={'P2'} />
        <Circle className={styles.rotate2} data-d={3} title={'P3'} />
        <Circle className={styles.rotate2} data-d={6} title={'P6'} />
        <Arrow className={styles.rotate2} data-d={'P2S2'} from={'P2'} to={'S2'} />
        <Arrow className={styles.rotate2} data-d={'P3S3'} from={'P3'} to={'S3'} />
        <Rect className={styles.rotate2} data-d={'s3'} title={'S3'} />
        <Rect className={styles.rotate2} data-d={'s2'} title={'S2'} />
        <Arrow className={styles.rotate2} data-d={'S2P4'} from={'S2'} to={'P4'}/>
        <Arrow className={styles.rotate2} data-d={'S3P5'} from={'S3'} to={'P5'}/>
        <Circle className={styles.rotate2} data-d={4} title={'P4'} />
        <Circle className={styles.rotate2} data-d={5} title={'P5'} />
        <Arrow className={styles.rotate2} data-d={'P4S4'} from={'P4'} to={'S4'}/>
        <Arrow className={styles.rotate2} data-d={'P6S4'} from={'P6'} to={'S4'} />
        <Arrow className={styles.rotate2} data-d={'P5S4'} from={'P5'} to={'S4'}  />
        <Rect className={styles.rotate2} data-d={'s4'} title={'S4'} />
        <Arrow className={styles.rotate2} data-d={'S4P1'} from={'S4'} to={'P1'}/> */}
      </div>
    </PetriProvider>
  );
};
