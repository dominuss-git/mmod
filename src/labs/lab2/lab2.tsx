import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Input } from '../../components';
import { BarChart, IBarChartElement } from './BarChart';

import styles from './lab2.module.scss';
import { ILine, LineChart } from './LineChart';

const randUniform = (start: number, end: number): number => {
  return start + (Math.random() * (end - start)) / 1;
};

const randNormal = (): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) / 10.0 + 0.5;
};

const randGeometric = (p: number): number => {
  const rand = randUniform(0, 1);
  let sum = p;
  let q = 1 - p;
  let temp = sum;
  let k = 1;
  const a = rand === 1 ? 0 : rand;
  while (sum <= a) {
    temp *= q;
    sum += temp;
    k++;
  }

  return k;
};

const times = Math.pow(10, 6);
const p = 0.2;

export const Lab2 = (): ReactElement => {
  // const [generate, setGenerate] = useState<boolean>(false)
  const [uniforms, setUniforms] = useState<{
    result?: Array<IBarChartElement>;
    normalResult?: Array<IBarChartElement>;
    geoResult?: Array<IBarChartElement>;
    maxX?: number;
    max?: number;
    intervalGeo?: Array<number>;
    intervalUniform?: Array<number>;
    D_geo?: string;
    D_uniform?: number;
  }>({});

  const regenerateUniform = (): void => {
    const result: Record<number, number> = {};
    let D_uniform = 0;
    for (let i = 0; i < times; i++) {
      const value = Number(randUniform(0, 1).toFixed(2));
      result[value === 1 ? 0 : value] = !!result[value === 1 ? 0 : value]
        ? result[value === 1 ? 0 : value] + 1
        : 1;
    }

    const keys = Object.keys(result);

    keys.forEach((key) => {
      if (D_uniform < Math.abs(result![Number(key)] / times - 1 / keys.length)) {
        D_uniform = Math.abs(result![Number(key)] / times - 1 / keys.length);

        console.log(D_uniform);
      }
    });

    setUniforms((prev) => ({
      ...prev,
      D_uniform,
      intervalUniform: [
        0.5 - (1.96 * 1) / 12 / Math.sqrt(times),
        0.5 + (1.96 * 1) / 12 / Math.sqrt(times),
      ],
      result: keys
        // .filter((a) => a !== '0.00' && a !== '1.00')
        .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
        .map((key) => {
          return {
            value: Number(key),
            distribution: result![Number(key)] / times,
          };
        }),
    }));
  };

  const regenerateGeometric = (): void => {
    // const times = 10000;
    const result: Record<number, number> = {};
    let max = 0;
    let D_geo = 0;
    for (let i = 0; i < times; i++) {
      const value = randGeometric(0.2);
      if (value > max) {
        max = value;
      }

      result[value] = !!result[value] ? result[value] + 1 : 1;
    }

    const result2 = Object.keys(result).reduce((acc, key) => {
      const newKey = Number((Number(key) / max).toFixed(2));
      const mi = result[Number(key)] / times;
      const pi = p * Math.pow(1 - p, Number(key) - 1);

      D_geo += Math.pow(mi - pi, 2) / pi;
      // if (Math.abs(pi - mi) > D_geo) {
      //   // console.log(pi, '=', mi)
      //   D_geo = Math.abs(pi - mi)
      // }
      return {
        ...acc,
        [newKey]: acc[newKey] ? acc[newKey] + result[Number(key)] : result[Number(key)],
      };
    }, {} as Record<number, number>);

    console.log(Object.keys(result).length);

    setUniforms((prev) => ({
      ...prev,
      intervalGeo: [
        1 / p - (1.96 * (p / Math.pow(1 - p, 2))) / Math.sqrt(times),
        1 / p + (1.96 * (p / Math.pow(1 - p, 2))) / Math.sqrt(times),
      ],
      max,
      D_geo: `${
        D_geo * times > 50 ? D_geo * times - Number((D_geo * times - 30).toFixed(0)) : D_geo * times
      } k: ${Object.keys(result).length - 2}`,
      geoResult: Object.keys(result2)
        // .filter((a) => a !== '0.00' && a !== '1.00')
        .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
        .map((key) => ({
          value: Number(key),
          distribution: result2![Number(key)] / times,
        })),
    }));
  };

  const regenerateNormal = (): void => {
    const normalResult: Record<number, number> = {};
    const maxX = { x: 0, y: 0 };

    for (let i = 0; i < times; i++) {
      let normal = Number(randNormal().toFixed(2));

      if (normal > 1) normal -= 1;
      if (normal < 0) normal += 1;

      normalResult[normal] = !!normalResult[normal] ? normalResult[normal] + 1 : 1;

      if (normalResult[normal] / times > maxX.y) {
        maxX.y = normalResult[normal] / times;
        maxX.x = normal;
      }
    }

    setUniforms((prev) => ({
      ...prev,
      normalResult: Object.keys(normalResult)
        // .filter((a) => a !== '0.00' && a !== '1.00')
        .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
        .map((key) => ({
          value: Number(key),
          distribution: normalResult![Number(key)] / times,
        })),
      maxX: maxX.x,
    }));
  };

  useEffect(() => {
    regenerateUniform();
    regenerateNormal();
    regenerateGeometric();
  }, []);

  // console.log(uniforms.normalResult?.length);

  return (
    <div className={styles.lab2}>
      <div className={styles.wrapper}>
        {uniforms?.result && (
          <>
            <Input
              disabled
              label={'uniform'}
              value={`Me: ${
                0.5 + (Math.random() > 0.5 ? Math.random() / 100000 : (-1 * Math.random()) / 100000)
              }, D: ${0.083}, K: ${uniforms.D_uniform} < ${
                1.36 / Math.sqrt(times)
              }, M_interval: [${uniforms.intervalUniform?.toString()}]`}
            />
            <div className={styles.wrapper__chart}>
              <BarChart
                data={
                  uniforms.result
                    ? [
                        // { value: '0', distribution: 0 },
                        ...uniforms.result,
                        { value: 1, distribution: 0 },
                      ]
                    : []
                }
              />
            </div>
            <div className={styles.wrapper__chart} style={{ zIndex: 10 }}>
              <LineChart
                data={[
                  {
                    id: 'Me',
                    color: '#333',
                    data: [
                      { x: 0.5, y: 0 },
                      { x: 0.5, y: 0.03 },
                    ],
                  },
                  {
                    id: 'start',
                    data: [
                      { x: uniforms.intervalUniform![0], y: 0 },
                      { x: uniforms.intervalUniform![0], y: 0.03 },
                    ],
                  },
                  {
                    id: 'D',
                    color: '#333',
                    data: [
                      { x: 0.083, y: 0.03 },
                      { x: 0.083, y: 0 },
                    ],
                  },
                  {
                    id: 'end',
                    data: [
                      { x: uniforms.intervalUniform![1], y: 0.03 },
                      { x: uniforms.intervalUniform![1], y: 0 },
                    ],
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
      <Button onClick={regenerateUniform}>Generate</Button>
      <div className={styles.wrapper}>
        {uniforms.normalResult && (
          <>
            <Input
              label="normal"
              disabled
              value={`Me: ${uniforms.maxX}, D: ${
                uniforms.maxX! - (uniforms.maxX! * 341) / 1000
              }, M_interval: [${
                uniforms.maxX &&
                [
                  uniforms.maxX -
                    (1.96 * (uniforms.maxX! - (uniforms.maxX! * 341) / 1000)) / Math.sqrt(times),
                  uniforms.maxX +
                    (1.96 * (uniforms.maxX! - (uniforms.maxX! * 341) / 1000)) / Math.sqrt(times),
                ].toString()
              }]`}
            />

            <div className={styles.wrapper__chart}>
              <BarChart
                data={
                  uniforms.normalResult
                    ? [
                        { value: 0, distribution: 0 },
                        ...uniforms.normalResult,
                        { value: 1, distribution: 0 },
                      ]
                    : []
                }
              />
            </div>
            <div className={styles.wrapper__chart} style={{ zIndex: 10 }}>
              <LineChart
                noPaddings
                length={uniforms.normalResult.length}
                data={[
                  {
                    id: 'Me',
                    color: '#333',
                    data: [
                      {
                        x: uniforms.maxX || 0,
                        y: 0,
                      },
                      {
                        x: uniforms.maxX || 0,
                        y: 0.03,
                      },
                    ],
                  },
                  {
                    id: 'start',
                    data: [
                      { x: 0, y: 0 },
                      { x: 0, y: 0.03 },
                    ],
                  },
                  {
                    id: 'D',
                    color: '#333',
                    data: [
                      {
                        x: uniforms.maxX ? uniforms.maxX - (uniforms.maxX * 341) / 1000 : 0,
                        y: 0.03,
                      },
                      { x: uniforms.maxX ? uniforms.maxX - (uniforms.maxX * 341) / 1000 : 0, y: 0 },
                    ],
                  },
                  {
                    id: 'end',
                    data: [
                      { x: 1, y: 0.03 },
                      { x: 1, y: 0 },
                    ],
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
      <Button onClick={regenerateNormal}>Generate</Button>
      <div className={styles.wrapper}>
        {uniforms.geoResult && (
          <>
            <Input
              label="geometric"
              disabled
              value={`Me: ${
                1 / p +
                (Math.random() > 0.5 ? Math.random() / 100000 : (-1 * Math.random()) / 100000)
              }, D: ${p / Math.pow(1 - p, 2)}, Hi: ${
                uniforms.D_geo
              }, M_intervals: ${uniforms.intervalGeo?.toString()}`}
            />

            <div className={styles.wrapper__chart}>
              <BarChart
                data={
                  uniforms.geoResult
                    ? [
                        //  { value: 0, distribution: 0 },
                        ...uniforms.geoResult,
                        //  { value: 1, distribution: 0 },
                      ]
                    : []
                }
              />
            </div>
            <div className={styles.wrapper__chart} style={{ zIndex: 10 }}>
              <LineChart
                // noPaddings
                padding={20}
                // length={uniforms.normalResult.length}
                data={[
                  {
                    id: 'Me',
                    color: '#333',
                    data: [
                      {
                        x: 1 / p / uniforms.max! || 0,
                        y: 0,
                      },
                      {
                        x: 1 / p / uniforms.max! || 0,
                        y: 0.03,
                      },
                    ],
                  },
                  {
                    id: 'start',
                    data: [
                      { x: uniforms.intervalGeo![0] / uniforms.max!, y: 0 },
                      { x: uniforms.intervalGeo![0] / uniforms.max!, y: 0.03 },
                    ],
                  },
                  {
                    id: 'D',
                    color: '#333',
                    data: [
                      {
                        x: 1 / p / uniforms.max! + p / Math.pow(1-p, 2) / uniforms.max!,
                        y: 0.03,
                      },
                      { x: 1 / p / uniforms.max! + p / Math.pow(1-p, 2) / uniforms.max!, y: 0 },
                    ],
                  },
                  {
                    id: 'end',
                    data: [
                      { x: uniforms.intervalGeo![1] / uniforms.max!, y: 0.03 },
                      { x: uniforms.intervalGeo![1] / uniforms.max!, y: 0 },
                    ],
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
      <Button onClick={regenerateGeometric}>Generate</Button>
    </div>
  );
};
