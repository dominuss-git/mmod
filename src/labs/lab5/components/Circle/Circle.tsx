import { ReactElement, useEffect, useRef, useState } from 'react';

import circle from '../../assets/circle.svg';
import { usePetriContext } from '../../context/usePetriContext';

import styles from './Circle.module.scss';

interface ICircleProps {
  className?: string;
  title: string;
  // count: number;
}

export const Circle = ({ title, className, ...rest }: ICircleProps): ReactElement => {
  const [count, setCount] = useState<number>(0);
  const {
    _state: { conditions, state },
    actions,
  } = usePetriContext();
  const ref1 = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setCount(conditions[title].count);
  }, []);

  useEffect(() => {
    if (actions.length === 0) return;
    const first = actions[0];
    const second = actions[1];

    // console.log(first, title)
    if (Object.keys(first).includes(title)) {
      // console.log(first[title].length, title)
      setCount((prev) => prev - first[title].length);
    }
    const keys = Object.keys(second).reduce((acc, key) => {
      return { ...acc, [key]: second[key] };
    }, {} as Record<string, Array<string>>);

    if (
      Object.values(keys)
        .reduce((acc: Array<string>, val) => [...acc, ...val], [])
        .includes(title)
    ) {
      if (ref1.current) clearTimeout(ref1.current);

      // console.log(keys)

      const temp = Object.keys(keys).reduce(
        (acc, key) => (keys[key].includes(title) ? state[key].out[title] + acc : acc),
        0
      ); //keys.reduce((acc, val) => val === title ? acc + second[] : acc ,0)

      // if (title === 'P4') {
      //   console.log(title, temp, keys, second);
      // }

      ref1.current = setTimeout(() => {
        setCount((prev) => prev + temp);
      }, 2000);
    }
  }, [actions]);

  return (
    <div className={[styles.circle, className].join(' ')} {...rest}>
      <span className={styles.circle__title}>{title}</span>
      <div className={styles.circle__counter}>
        <img src={circle} />
        <span className={styles.circle__count}>{count}</span>
      </div>
    </div>
  );
};
