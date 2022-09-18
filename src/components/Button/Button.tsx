import { ReactElement, ReactNode } from 'react';

import styles from './Button.module.scss';

interface IButtonProps {
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
  name?: string;
  disabled?: boolean;
}

export const Button = ({ disabled, onClick, type, children, name }: IButtonProps): ReactElement => {
  return (
    <button name={name} onClick={onClick} disabled={disabled} className={styles.button} type={type}>
      {children}
    </button>
  );
};
