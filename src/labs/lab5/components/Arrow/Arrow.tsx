import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import arrow from '../../assets/arrow.svg';
import { usePetriContext } from '../../context/usePetriContext';

import styles from './Arrow.module.scss';
import dat from '../../assets/dat.svg';

interface IArrowProps {
  className?: string;
  'data-deggree'?: string;
  from: string;
  to: string;
}

export const Arrow = ({ className, from, to, ...rest }: IArrowProps): ReactElement => {
  const { actions } = usePetriContext();
  const [visible, setVisible] = useState<boolean>(false);
  const ref1 = useRef<ReturnType<typeof setTimeout>>();
  const ref2 = useRef<ReturnType<typeof setTimeout>>();
  const ref3 = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (actions.length === 0) return;

    const first = actions[0];
    const second = actions[1];

    if (Object.keys(first).includes(from)) {
      // if (first[from].length !== undefined) {
        if (!first[from].includes(to)) return;
      // }

      setVisible(true);
      if (ref1.current) clearTimeout(ref1.current);

      ref1.current = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }

    if (Object.keys(second).includes(from)) {
      // if (second[from].length !== undefined) {
        if (!second[from].includes(to)) return;
      // }

      if (ref2.current) clearTimeout(ref2.current);

      ref2.current = setTimeout(() => {
        setVisible(true);
      }, 1000);

      if (ref3.current) clearTimeout(ref3.current);

      ref3.current = setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }, [actions, from, to]);

  return (
    <div className={[styles.arrow, className].join(' ')} {...rest}>
      <img src={arrow} width={'100%'}/>
      <div style={{ backgroundImage: `url(${dat})` }} data-src={dat} data-visible={visible} className={styles.arrow__marker}></div>
    </div>
  );
};
