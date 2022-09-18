import { ResponsivePie } from '@nivo/pie';
import { ReactElement } from 'react';
import { FortuneCursor } from '../FortuneCursor';

import styles from './FortuneRoulette.module.scss';

export interface IFortuneRouletteData {
  id: string;
  label: string;
  value: number;
}

export interface IFortuneRouletteProps {
  data?: Array<IFortuneRouletteData>;
  degree: number;
}

export const FortuneRoulette = ({ data, degree }: IFortuneRouletteProps): ReactElement => {
  return (
    <div className={styles.pie__wrapper}>
      <div className={styles.pie__cursor}>
        <FortuneCursor />
      </div>
      <div
        className={styles.pie}
        style={{
          transform: `rotate(${degree}deg)`,
        }}
      >
        <ResponsivePie
          data={data || [{ id: 'Waiting donations', label: 'Waiting donations', value: 1 }]}
          margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.95}
          cornerRadius={8}
          fit={false}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.45}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="black"
        />
      </div>
    </div>
  );
};
