import { ReactElement } from 'react';

import rect from '../../assets/rect.svg';

import styles from './Rect.module.scss';

interface IRectProps {
  className?: string,
  title: string
}

export const Rect = ({ className, title, ...rest }: IRectProps): ReactElement => {
  return (
    <div className={[styles.rect, className].join(' ')} {...rest}>
      <span className={styles.rect__title}>{title}</span>
      <img height={100} src={rect} />
    </div>
  );
};
