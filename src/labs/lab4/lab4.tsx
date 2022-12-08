import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Input, ISection, Output } from '../../components';
import { useInterval } from './hooks';
import styles from './lab4.module.scss';
import { F } from './utils/F(t)';
import { factorial } from './utils/factorial';
import { hAndR } from './utils/hAndR';
import { Lsyst } from './utils/Lsyst';
import { PO } from './utils/P0';
import { PiArray } from './utils/Pi';

import carImg from './car.svg';

interface ILab4State {
  n: number;
  parking: number;
  intensive: number;
  deliveryTime: number;
}

// const timeout = 500;
const timeoutre = 0.1;

export const Lab4 = (): ReactElement => {
  const [state, setState] = useState<ILab4State>({
    n: 2,
    parking: 4,
    intensive: 1,
    deliveryTime: 2,
  });
  const [timeout, setTimeouT] = useState<number>(500);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'n' || e.target.name === 'parking') {
      setState((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) }));
      return;
    }
    setState((prev) => ({ ...prev, [e.target.name]: Number(e.target.value) / 10 }));
  };

  const output = useMemo(() => {
    const { h, R } = hAndR(state.intensive, state.deliveryTime);

    const hi = R / state.n;
    const P0 = PO(state.n, R, state.parking, hi);

    const Pi = PiArray(state.n, P0, R, state.parking);

    let P, Q;

    if (hi === 1) {
      Q = Pi[0];
      P = 1 - Q;
    } else {
      Q =
        (Math.pow(R, state.n + state.parking) * P0) /
        (Math.pow(state.n, state.parking) * factorial(state.n));
      P = 1 - Q;
    }

    const A = P * state.intensive;
    const Lsystem = Lsyst(state.n, R, P, P0, state.parking, hi);
    const Ls = Lsystem + A / h;
    const Wq = Lsystem / state.intensive;
    const Ws = Wq + 1 / h;
    return {
      h,
      R,
      P0,
      Pi,
      P,
      Q,
      A,
      Lsystem,
      Ls,
      Wq,
      Ws,
    };
  }, [state]);

  const [simulation, setSimulation] = useState<boolean>(false);
  const [car, setCar] = useState<number>(0);
  const [tt, setTT] = useState<number>(0);
  const [res, setRes] = useState<Record<'in' | 'out', Record<number, number>> & { otkaz: number }>({
    in: {},
    out: {},
    otkaz: 0,
  });
  const [total, setTotal] = useState<number>(0);
  const refTimeout1 = useRef<ReturnType<typeof setInterval>>();
  const refTimeout2 = useRef<ReturnType<typeof setInterval>>();

  const process1 = useCallback(() => {
    // let t = 0;
    // const res: Record<number, number> = {};
    // let state = car;
    let t1 = 0;
    return () => {
      // if (car > 1) {
      let random = Math.random() + state.deliveryTime;

      // console.log(random)

      // random = random > 1 ? 1 : random;
      // console.log(F(t1, output.h) > random, t1);
      if (F(t1, output.h) > F(random, output.h)) {
        // setCar((prev) => prev - 1);
        setRes((prev) => ({
          ...prev,
          out: { ...prev.out, [t1]: prev.out[t1] ? prev.out[t1] + 1 : 1 },
        }));
        // setT11(true);
        // setT1(0);
        clearInterval(refTimeout1.current);
        refTimeout1.current = undefined;
      } else {
        // setT1((prev) => prev + 0.5);
        // setT1((prev) => prev + 0.5);
        t1 += timeoutre;
      }
    };
    // const keys = Object.keys(res);

    // const count =
    //   keys.reduce((acc, key) => acc + res[Number(key)] * Number(key), 0) /
    //   keys.reduce((acc, key) => acc + res[Number(key)], 0);
    // console.log(res, count);
    // }
    // };
  }, [output.h, res, setRes, refTimeout1.current]);

  const process2 = useCallback(() => {
    let t2 = 0;
    // const res: Record<number, number> = {};
    // let state = car;
    return () => {
      // if (car > 0 && car !== 1) {
      let random = Math.random() + state.deliveryTime; //+ 2;

      // random = random > 1 ? 1 : random;
      // console.log(F(t1, output.h) > random, t2);
      if (F(t2, output.h) > F(random, output.h)) {
        // setCar((prev) => prev - 1);
        // res['out'][t2] = res['out'][t2] ? res['out'][t2] + 1 : 1;
        setRes((prev) => ({
          ...prev,
          out: { ...prev.out, [t2]: prev.out[t2] ? prev.out[t2] + 1 : 1 },
        }));
        // setT22(true);

        // setT2(0);
        clearInterval(refTimeout2.current);
        refTimeout2.current = undefined;
      } else {
        // setT2((prev) => prev + 0.5);
        // setT2((prev) => prev + 0.5);
        t2 += timeoutre;
      }
    };
    // const keys = Object.keys(res);

    // const count =
    //   keys.reduce((acc, key) => acc + res[Number(key)] * Number(key), 0) /
    //   keys.reduce((acc, key) => acc + res[Number(key)], 0);
    // console.log(res, count);
    // }
    // };
  }, [output.h, res, setRes, refTimeout2.current]);

  const intensive = useCallback(() => {
    // const random = Math.random(); // + 0.4;
    let random = Math.random() + 1 / state.intensive / 2;

    if (!simulation) return false;

    if (F(tt, state.intensive) > F(random, state.intensive)) {
      setTotal((prev) => prev + 1);
      if (car >= state.parking) {
        setRes((prev) => ({ ...prev, otkaz: prev.otkaz + 1 }));
        setTT(0);
      } else {
        setRes((prev) => ({
          ...prev,
          in: { ...prev.in, [tt]: prev.in[tt] ? prev.in[tt] + 1 : 1 },
        }));

        setCar((prev) => prev + 1);
        setTT(0);
      }
    } else {
      // setTT((prev) => prev + 0.5);
      setTT((prev) => prev + timeoutre);
    }

    // const keys = Object.keys(res);
    // //
    // const count =
    //   keys.reduce((acc, key) => acc + res[Number(key)] * Number(key), 0) /
    //   keys.reduce((acc, key) => acc + res[Number(key)], 0);
    // console.log(res, count);
  }, [car, state.intensive, tt, state.parking, state.n, res, setRes, simulation]);

  // useInterval({ callback: process1, timeout: 10 });
  // useInterval({ callback: process2, timeout: 10 });
  useInterval({ callback: intensive, timeout });

  useEffect(() => {
    // console.log(car, t11, t22);
    if (car > 0 && simulation) {
      console.log(car);
      if (!refTimeout1.current) {
        setCar((prev) => prev - 1);
        // setT11(false);
        refTimeout1.current = setInterval(process1(), timeout);
      } else if (!refTimeout2.current) {
        setCar((prev) => prev - 1);

        // setT22(false);
        refTimeout2.current = setInterval(process2(), timeout);
      } else {
        // clearInterval(refTimeout2.current);
      }
    }
  }, [car, refTimeout1.current, refTimeout2.current, simulation]);

  useEffect(() => {
    const res_in = res['in'];
    const res_out = res['out'];
    const otkaz = res['otkaz'];

    const keys_in = Object.keys(res_in);
    const keys_out = Object.keys(res_out);

    const count_in =
      keys_in.reduce((acc, key) => acc + res_in[Number(key)] * Number(key), 0) /
      keys_in.reduce((acc, key) => acc + res_in[Number(key)], 0);

    const count_out =
      keys_out.reduce((acc, key) => acc + res_out[Number(key)] * Number(key), 0) /
      keys_out.reduce((acc, key) => acc + res_out[Number(key)], 0);

    console.log('out: ', count_out, res_out);
    console.log('in: ', count_in, res_in);
    console.log('otkaz: ', otkaz, total, otkaz / total);
  }, [res]);

  const resultOutput = useMemo<Array<ISection>>(() => {
    return [
      {
        labelValues: [
          {
            label: 'chance for service',
            value: (output.P * 100).toFixed(2),
            procent: true,
          },
          {
            label: 'chance of rejection',
            value: (output.Q * 100).toFixed(2),
            procent: true,
          },
          {
            label: 'throughput',
            value: output.A.toFixed(2) + ' auto/min',
          },
          {
            label: 'average in line',
            value: output.Lsystem.toFixed(2) + ' auto',
          },
          {
            label: 'average number of auto in QS',
            value: output.Ls.toFixed(2) + ' auto',
          },
          {
            label: 'average stay in line',
            value: output.Wq.toFixed(2) + ' min',
          },
          {
            label: 'average delivery time',
            value: output.Ws.toFixed(2) + ' min',
          },
          {
            label: 'car',
            value: car,
          },
        ],
      },
    ];
  }, [output, car]);

  return (
    <div className={styles.lab4}>
      <div className={styles.lab4__wrapper}>
        <label htmlFor="n">n ({state.n})</label>
        <input
          disabled={simulation}
          type={'range'}
          onChange={onChange}
          name={'n'}
          min={1}
          max={10}
          value={state.n}
        />
        <label htmlFor="intensive">intensive ({state.intensive})</label>
        <input
          type={'range'}
          disabled={simulation}
          onChange={onChange}
          name={'intensive'}
          min={1}
          max={100}
          value={state.intensive * 10}
        />
        <label htmlFor="parking">parking ({state.parking})</label>
        <input
          type={'range'}
          disabled={simulation}
          onChange={onChange}
          name={'parking'}
          min={0}
          max={10}
          value={state.parking}
        />
        <label htmlFor="deliveryTime">deliveryTime ({state.deliveryTime})</label>
        <input
          type={'range'}
          disabled={simulation}
          onChange={onChange}
          name={'deliveryTime'}
          min={1}
          max={50}
          value={state.deliveryTime * 10}
        />
        <Output sections={resultOutput} />
      </div>
      <div className={styles.lab4__wrapper}>
        <Button
          onClick={() => {
            setState({
              n: 2,
              parking: 4,
              intensive: 1,
              deliveryTime: 2,
            });
            setSimulation(true);
          }}
        >
          simulate
        </Button>
      </div>
      <div className={styles.wrapper}>
        <Input label={`rejections: ${res.otkaz} total: ${total}`} disabled value={`speed: ${timeout} ms`} />
        <div className={styles.azs}>
          <div className={styles.azs__block}>
            <div className={styles.azs__station}>
              <img src={carImg} className={styles.azs__car} data-visible={!!refTimeout1.current} />
            </div>
            <div className={styles.azs__station}>
              <img src={carImg} className={styles.azs__car} data-visible={!!refTimeout2.current} />
            </div>
          </div>
          <img src={carImg} className={styles.azs__car} data-visible={car >= 1}></img>
          <img src={carImg} className={styles.azs__car} data-visible={car >= 2}></img>
          <img src={carImg} className={styles.azs__car} data-visible={car >= 3}></img>
          <img src={carImg} className={styles.azs__car} data-visible={car >= 4}></img>
        </div>
        {simulation && (
          <input
            onChange={(e) => setTimeouT(Number(e.target.value))}
            type={'range'}
            min={100}
            max={500}
            value={timeout}
            style={{
              width: '100%'
            }}
          />
        )}
      </div>
    </div>
  );
};
