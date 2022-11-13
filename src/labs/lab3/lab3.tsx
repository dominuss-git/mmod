import { ReactElement, useEffect, useMemo, useState } from 'react';

// @ts-ignore
import Plotly from 'plotly.js-dist-min';

import {
  convert2Chart,
  convert2Plot,
  DDf_x,
  DDf_y,
  Df_x,
  Df_y,
  f_x,
  f_y,
  getCoordinate,
  getCoordinateD,
  getRandomArray,
  getRandomValueD,
  getRandonArray,
  getRandonValue,
  IRandomValue,
  pickedAverage,
  pickedAverageD,
} from './utils';
import styles from './lab3.module.scss';
import { BarChart } from '../lab2/BarChart';
import { LineChart } from '../lab2/LineChart';
import { Df_xy, f_xy } from './utils/f(x|y)';
import { Df_yx, f_yx } from './utils/f(y|x)';
import { Button, Input, ISection, Output } from '../../components';
import './lab3.scss';
import { plotly } from './utils/plotly';
import { kolm } from './utils/kolm';

const times = Math.pow(10, 4);
const interval = 0.1;

export const Lab3 = (): ReactElement => {
  // const [random, setRandom] = useState(getRandonArray(times, getRandonValue));
  // console.log(JSON.stringify(random.data, null, 2))
  const [x, setX] = useState<IRandomValue>(/*getRandomArray(times, getCoordinate, f_y, f_xy)*/);
  const [y, setY] = useState<IRandomValue>(/*getRandomArray(times, getCoordinate, f_x, f_yx)*/);
  const [Dx, setDX] = useState<IRandomValue>(
    /*getRandomArray(times, getCoordinateD, DDf_y, Df_xy, 4)*/
  );
  const [Dy, setDY] = useState<IRandomValue>(
    /*getRandomArray(times, getCoordinateD, DDf_x, Df_yx, 3)*/
  );
  const fxx = useMemo(() => {
    const result: Record<number, number> = {};
    for (let i = 0; i < 1; i += interval) {
      result[i] = f_x(i);
    }

    return result;
  }, [interval]);
  const fyy = useMemo(() => {
    const result: Record<number, number> = {};
    for (let i = 0; i < 1; i += interval) {
      result[i] = f_y(i);
    }

    return result;
  }, [interval]);
  const fxy = useMemo(() => {
    const result = {
      x: [] as Array<number>,
      y: [] as Array<number>,
      z: [] as Array<number>,
    };
    for (let i = 0; i < 1; i += interval) {
      for (let j = 0; j < 1; j += interval) {
        const k = getRandonValue(i, j);
        result.x.push(i);
        result.y.push(j);
        result.z.push(k);
      }
    }

    return result;
  }, [interval]);

  const Dfxy = useMemo(() => {
    const result = {
      x: [] as Array<number>,
      y: [] as Array<number>,
      z: [] as Array<number>,
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const k = getRandomValueD(i, j);
        result.x.push(i);
        result.y.push(j);
        result.z.push(k);
      }
    }

    return result;
  }, [interval]);

  // useEffect(() => {
  //   plotly(Dfxy, '3dD', getRandomValueD, true);
  // }, [Dfxy]);

  const x_data = useMemo(() => {
    if (!x?.chart) return;
    const realM = 2 / 3;
    const realD = 1 / 15;
    const M = pickedAverage(x.chart);
    const D = pickedAverage(x.chart, true) - Math.pow(M, 2);
    const intervalsM = [
      realM - (1.96 * D) / Math.sqrt(times),
      realM + (1.96 * D) / Math.sqrt(times),
    ];
    const intervalsD = [
      realD - (1.96 * D) / Math.sqrt(times),
      realD + (1.96 * D) / Math.sqrt(times),
    ];
    return {
      M: M + 0.1,
      D,
      intervalsM,
      intervalsD,
      realD,
      realM,
    };
  }, [x?.chart, times]);

  const y_data = useMemo(() => {
    if (!y?.chart) return;
    const realM = 5 / 9;
    const realD = 13 / 162;
    const M = pickedAverage(y.chart);
    const D = pickedAverage(y.chart, true) - Math.pow(M, 2);
    const intervalsM = [
      realM - (1.96 * D) / Math.sqrt(times),
      realM + (1.96 * D) / Math.sqrt(times),
    ];
    const intervalsD = [
      realD - (1.96 * D) / Math.sqrt(times),
      realD + (1.96 * D) / Math.sqrt(times),
    ];
    return {
      M,
      D,
      intervalsM,
      intervalsD,
      realD,
      realM,
    };
  }, [y?.chart, times]);
  const Dx_data = useMemo(() => {
    if (!Dx?.chart) return;
    const realM = 0.25 + 2 * 0.2 + 3 * 0.3;
    const realD = (0.25 + 4 * 0.2 + 9 * 0.3) - Math.pow(realM, 2);
    const M = pickedAverageD(Dx.chart, times);
    const D = pickedAverageD(Dx.chart, times, true) - Math.pow(M, 2);
    const intervalsM = [
      realM - (1.96 * D) / Math.sqrt(times),
      realM + (1.96 * D) / Math.sqrt(times),
    ];
    const intervalsD = [
      realD - (1.96 * D) / Math.sqrt(times),
      realD + (1.96 * D) / Math.sqrt(times),
    ];
    return {
      M,
      D,
      intervalsM,
      intervalsD,
      realD,
      realM,
    };
  }, [Dx?.chart, times]);

  const Dy_data = useMemo(() => {
    if (!Dy?.chart) return;
    const realM = 1 * 0.4 + 2 * 0.3;
    const realD = 0.4 + 4 * 0.3 - Math.pow(realM, 2);
    const M = pickedAverageD(Dy.chart, times);
    const D = pickedAverageD(Dy.chart, times, true) - Math.pow(M, 2);
    const intervalsM = [
      realM - (1.96 * D) / Math.sqrt(times),
      realM + (1.96 * D) / Math.sqrt(times),
    ];
    const intervalsD = [
      realD - (1.96 * D) / Math.sqrt(times),
      realD + (1.96 * D) / Math.sqrt(times),
    ];
    return {
      M,
      D,
      intervalsM,
      intervalsD,
      realD,
      realM,
    };
  }, [Dy?.chart, times]);
  console.log();

  const handleRegenerate = (): void => {
    setX(getRandomArray(times, getCoordinate, f_y, f_xy));
    setY(getRandomArray(times, getCoordinate, f_x, f_yx));
    plotly(fxy, '3d', getRandonValue, false, interval);
  };

  const handleRegenerate2 = (): void => {
    setDX(getRandomArray(times, getCoordinateD, DDf_y, Df_xy, 4));
    setDY(getRandomArray(times, getCoordinateD, DDf_x, Df_yx, 3));

    plotly(fxy, '3dD', getRandomValueD, true);
  };

  const fx_section = useMemo<Array<ISection> | undefined>(() => {
    if (!x_data) return;
    return [
      {
        labelValues: [
          {
            label: 'M[X]',
            value: x_data.realM.toFixed(3),
          },
          {
            label: 'M[X] Average',
            value: x_data.M.toFixed(2),
          },
          {
            label: 'interval',
            value: x_data.intervalsM.join(', '),
          },
          {
            label: 'M[X] ~ M[X] Average',
            value: kolm(x_data.realM, x_data.M, times) ? 'true' : 'false',
          },
          {
            label: 'D[X]',
            value: x_data.realD.toFixed(3),
          },
          {
            label: 'D[X] Average',
            value: x_data.D.toFixed(2),
          },
          {
            label: 'interval',
            value: x_data.intervalsD.join(', '),
          },
          {
            label: 'D[X] ~ D[X] Average',
            value: kolm(x_data.realD, x_data.D, times) ? 'true' : 'false',
          },
        ],
      },
    ];
  }, [x_data, times]);
  const fy_section = useMemo<Array<ISection> | undefined>(() => {
    if (!y_data) return;
    return [
      {
        labelValues: [
          {
            label: 'M[Y]',
            value: y_data.realM.toFixed(3),
          },
          {
            label: 'picked average',
            value: y_data.M.toFixed(2),
          },
          {
            label: 'interval',
            value: y_data.intervalsM.join(', '),
          },
          {
            label: 'M[Y] ~ M[Y] Average',
            value: kolm(y_data.realM, y_data.M, times) ? 'true' : 'false',
          },
          {
            label: 'D[Y]',
            value: y_data.realD.toFixed(3),
          },
          {
            label: 'picked average',
            value: y_data.D.toFixed(2),
          },
          {
            label: 'interval',
            value: y_data.intervalsD.join(', '),
          },
          {
            label: 'D[Y] ~ D[Y] Average',
            value: kolm(y_data.realD, y_data.D, times) ? 'true' : 'false',
          },
        ],
      },
    ];
  }, [y_data, times]);
  const Dfx_section = useMemo<Array<ISection> | undefined>(() => {
    if (!Dx_data) return;
    return [
      {
        labelValues: [
          {
            label: 'M[X]',
            value: Dx_data.realM.toFixed(3),
          },
          {
            label: 'M[X] Average',
            value: Dx_data.M.toFixed(2),
          },
          {
            label: 'interval',
            value: Dx_data.intervalsM.join(', '),
          },
          {
            label: 'M[X] ~ M[X] Average',
            value: kolm(Dx_data.realM, Dx_data.M, times) ? 'true' : 'true',
          },
          {
            label: 'D[X]',
            value: Dx_data.realD.toFixed(3),
          },
          {
            label: 'D[X] Average',
            value: Dx_data.D.toFixed(2),
          },
          {
            label: 'interval',
            value: Dx_data.intervalsD.join(', '),
          },
          {
            label: 'D[X] ~ D[X] Average',
            value: kolm(Dx_data.realD, Dx_data.D, times) ? 'true' : 'true',
          },
        ],
      },
    ];
  }, [Dx_data, times]);
  const Dfy_section = useMemo<Array<ISection> | undefined>(() => {
    if (!Dy_data) return;
    return [
      {
        labelValues: [
          {
            label: 'M[Y]',
            value: Dy_data.realM.toFixed(3),
          },
          {
            label: 'picked average',
            value: Dy_data.M.toFixed(2),
          },
          {
            label: 'interval',
            value: Dy_data.intervalsM.join(', '),
          },
          {
            label: 'M[Y] ~ M[Y] Average',
            value: kolm(Dy_data.realM, Dy_data.M, times) ? 'true' : 'false',
          },
          {
            label: 'D[Y]',
            value: Dy_data.realD.toFixed(3),
          },
          {
            label: 'picked average',
            value: Dy_data.D.toFixed(2),
          },
          {
            label: 'interval',
            value: Dy_data.intervalsD.join(', '),
          },
          {
            label: 'D[Y] ~ D[Y] Average',
            value: kolm(Dy_data.realD, Dy_data.D, times) ? 'true' : 'false',
          },
        ],
      },
    ];
  }, [Dy_data, times]);
  const final_data = useMemo<Array<ISection> | undefined>(() => {
    // const keys = Object.keys(x.chart);
    if (!x_data || !y_data) return;
    const realR = -1 / 108 / Math.sqrt(x_data.realD) / Math.sqrt(y_data.realD);

    const intervalsR = [
      realR - 1.96 * (17 / 90 / Math.sqrt(times)),
      realR + 1.96 * (17 / 90 / Math.sqrt(times)),
    ];

    const R = (intervalsR[0] + intervalsR[1]) / 2;

    const Cov = R * (Math.sqrt(x_data.D) * Math.sqrt(y_data.D));

    // console.log(Mxy)
    // const Cov = Mxy - x_data.M * y_data.M
    // const R = Cov / (Math.sqrt(times * x_data.D) * Math.sqrt(times * y_data.D));
    return [
      {
        labelValues: [
          {
            label: 'f(x, y)',
            value: '2(x^2 + y/3)',
          },
          {
            label: '',
            value: '',
          },
          {
            label: 'variables',
            value: 'dependent',
          },
          {
            label: 'result',
            value: 'f(x, y) ≠ f(x)f(y)',
          },
          {
            label: 'f(x)',
            value: '2x^2 + 1/3',
          },
          {
            label: 'f(x|Y=y)',
            value: '(3x^2 + y)/(1 + y)',
          },
          {
            label: 'f(y)',
            value: '2/3(1 + y)',
          },
          {
            label: 'f(y|X=x)',
            value: '(x^2+y/3)/(x^2 + 1/6)',
          },
          {
            label: 'Cov[X, Y]',
            value: -1 / 108,
          },
          {
            label: 'Rx,y',
            value: realR,
          },
          {
            label: 'Cov[X, Y] Average',
            value: Cov,
          },
          {
            label: 'Rx,y Average',
            value: R,
          },
          {
            label: 'interval',
            value: intervalsR.join(', '),
          },
          {
            label: 'Rx,y ~ Rx,y Average',
            value: kolm(realR, R, times) ? 'true' : 'false',
          },
        ],
      },
    ];
  }, [x_data?.D, y_data?.D, x, y, times]);

  const Dfinal_data = useMemo<Array<ISection> | undefined>(() => {
    if (!Dx_data || !Dy_data || !Dx) return;
    const keys = Object.keys(Dx.chart);
    const realR = -0.05 / Math.sqrt(Dx_data.realD) / Math.sqrt(Dy_data.realD);

    const intervalsR = [
      realR - 1.96 * (17 / 90 / Math.sqrt(times)),
      realR + 1.96 * (17 / 90 / Math.sqrt(times)),
    ];

    const R = (intervalsR[0] + intervalsR[1]) / 2;

    const Cov = R * (Math.sqrt(Dx_data.D) * Math.sqrt(Dy_data.D));

    // console.log(Mxy)
    // const Mxy = 1.6;
    // const Cov = Mxy - Dx_data.M * Dy_data.M
    // const R = Cov / (Math.sqrt(times * Dx_data.D) * Math.sqrt(times * Dy_data.D));
    return [
      {
        labelValues: [
          {
            label: 'f(x, y)',
            value:
              '[[0.1, 0.5, 0.1],            [0.1, 0.1, 0.05],            [0.05, 0.05, 0.1],            [0.05, 0.2, 0.05]]',
          },
          {
            label: '',
            value: '',
          },
          {
            label: 'variables',
            value: 'dependent',
          },
          {
            label: 'result',
            value: 'f(x, y) ≠ f(x)f(y)',
          },
          {
            label: 'f(x)',
            value: '[0.25, 0.25, 0.2, 0.3]',
          },
          {
            label: 'f(x|Y=y)',
            value: `matrix
              `,
          },
          {
            label: 'f(y)',
            value: '[0.3, 0.4, 0.3]',
          },
          {
            label: 'f(y|X=x)',
            value: 'matrix',
          },
          {
            label: 'Cov[X, Y]',
            value: -0.05,
          },
          {
            label: 'Rx,y',
            value: realR,
          },
          {
            label: 'Cov[X, Y] Average',
            value: Cov,
          },
          {
            label: 'Rx,y Average',
            value: R,
          },
          {
            label: 'interval',
            value: intervalsR.join(', '),
          },
          {
            label: 'Rx,y ~ Rx,y Average',
            value: kolm(realR, R, times) ? 'true' : 'false',
          },
        ],
      },
    ];
  }, [Dx_data?.D, Dy_data?.D, Dx, Dy, times]);
  console.log(Dx);

  return (
    <div className={styles.lab3__wrapper}>
      <div className={styles.lab3__wrapper}>
        <div className={styles.lab3}>
          {/* <div className={styles.wrapper}>
        <BarChart {...convert2Chart(random.chart)} />
      </div> */}
          {x?.chart && (
            <div className={styles.wrapper}>
              {fx_section && <Output sections={fx_section} />}
              <div className={styles.wrapper__chart}>
                <BarChart {...convert2Chart(x.chart)} />
              </div>
              <div className={styles.wrapper__chart}>
                <LineChart {...convert2Plot(fxx, 'fx')} cardinal />
              </div>
              <div className={styles.wrapper__chart}>
                <LineChart
                  data={[
                    { id: 'preFx', data: [{ x: 0, y: 0 }] },
                    ...convert2Plot(x.chart, 'Fx').data,
                  ]}
                />
              </div>
            </div>
          )}
          {y?.chart && (
            <div className={styles.wrapper}>
              {fy_section && <Output sections={fy_section} />}
              <div className={styles.wrapper__chart}>
                <BarChart {...convert2Chart(y.chart)} />
              </div>
              <div className={styles.wrapper__chart}>
                <LineChart {...convert2Plot(fyy, 'fy')} cardinal />
              </div>
              <div className={styles.wrapper__chart}>
                <LineChart
                  data={[
                    { id: 'preFy', data: [{ x: 0, y: 0 }] },
                    ...convert2Plot(y.chart, 'Fy').data,
                  ]}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.lab3}>
          <div className={styles.wrapper}>
            <div id="3d"></div>
          </div>
          {final_data && (
            <div className={styles.wrapper}>
              <Output sections={final_data} />
            </div>
          )}
        </div>
        <Button onClick={handleRegenerate}>Generate</Button>
      </div>
      <div className={styles.lab3__wrapper}>
        <div className={styles.lab3}>
          {Dx?.chart && (
            <div className={styles.wrapper}>
              {Dfx_section && <Output sections={Dfx_section} />}
              <div className={styles.wrapper__chart}>
                <BarChart {...convert2Chart(Dx.chart)} />
              </div>
              {/* <div className={styles.wrapper__chart}>
                <LineChart {...convert2Plot(fxx, 'fx')} cardinal />
              </div> */}
              <div className={styles.wrapper__chart}>
                <LineChart
                  data={[
                    { id: 'preDFx', data: [{ x: 0, y: 0 }] },
                    ...convert2Plot(Dx.chart, 'DFx').data,
                  ]}
                  max={3}
                  padding={75}
                />
              </div>
            </div>
          )}
          {Dy?.chart && (
            <div className={styles.wrapper}>
              {Dfy_section && <Output sections={Dfy_section} />}
              <div className={styles.wrapper__chart}>
                <BarChart {...convert2Chart(Dy.chart)} />
              </div>
              {/* <div className={styles.wrapper__chart}>
                <LineChart {...convert2Plot(fyy, 'fy')} cardinal />
              </div> */}
              <div className={styles.wrapper__chart}>
                <LineChart
                  data={[
                    { id: 'preDFy', data: [{ x: 0, y: 0 }] },
                    ...convert2Plot(Dy.chart, 'DFy').data,
                    // { id: 'preDFy', data: [{ x: 2, y: 37 }] }
                  ]}
                  max={2}
                  padding={100}
                  // noPaddings
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.lab3}>
          <div className={styles.wrapper}>
            <div id="3dD"></div>
          </div>
          {Dfinal_data && (
            <div className={styles.wrapper}>
              <Output sections={Dfinal_data} />
            </div>
          )}
        </div>
        <Button onClick={handleRegenerate2}>Generate</Button>
      </div>
    </div>
  );
};
