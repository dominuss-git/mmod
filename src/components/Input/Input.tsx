import { ChangeEvent, ReactElement } from 'react';

import styles from './Input.module.scss';

interface IInputProps {
  onChange?: (input: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined;
  type?: string;
  min?: number;
  max?: number;
  label?: string;
  name?: string;
  disabled?: boolean;
}

export const Input = ({
  value,
  onChange,
  type,
  max,
  min,
  label,
  name,
  disabled,
}: IInputProps): ReactElement => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.input__label}>
          {label}
        </label>
      )}
      <div className={styles.input__wrapper}>
        <input
          name={name}
          className={styles.input}
          value={value}
          onChange={onChange}
          type={type}
          max={max}
          min={min}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
