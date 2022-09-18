import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';

import styles from './Output.module.scss';

export interface ILabelValue {
  label: string;
  value: ReactNode;
  procent?: boolean;
  sec?: boolean;
  dollar?: boolean;
}

export interface ISection {
  labelValues?: Array<ILabelValue>;
  title?: string;
}

export interface IOutputProps {
  sections?: Array<ISection>;
  classname?: string;
  wrapperClassname?: string;
}

export const Output = ({ sections, classname, wrapperClassname }: IOutputProps): ReactElement => {
  const [currentPage, setPage] = useState<number | undefined>(1);

  const pages = useMemo<Array<number> | undefined>(() => {
    if (!sections?.length) return;

    const result = [];
    for (let i = 1; i <= sections.length; i++) {
      result.push(i);
    }

    return result;
  }, [sections]);

  useEffect(() => {
    setPage(1);
  }, [sections]);

  return (
    <div className={[styles.output, wrapperClassname].join(' ')}>
      {sections && currentPage && sections[currentPage - 1] && sections[currentPage - 1].title && (
        <span className={styles.output__label}>{sections[currentPage - 1].title}</span>
      )}
      <div className={[styles.output__grid, classname].join(' ')}>
        {sections &&
          currentPage &&
          sections[currentPage - 1] &&
          sections[currentPage - 1].labelValues?.map((labelValue, index) => (
            <div key={labelValue.label + index}>
              <span className={styles.output__label}>{labelValue.label}: </span>
              <span className={styles.output__value}>{labelValue.value}</span>
              {labelValue.procent && (
                <span className={styles.output__procent}>
                  {' '}
                  {labelValue.sec ? 'sec' : labelValue.dollar ? '$' : '%'}
                </span>
              )}
            </div>
          ))}
      </div>
      {pages && pages.length > 1 && (
        <ul className={styles.output__pagination}>
          {pages.map((page) => (
            <li
              key={page}
              className={
                styles.output__page + ' ' + (currentPage === page ? styles.output__page_active : '')
              }
              onClick={() => setPage(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
