import { IBarChartElement, IBarChartProps } from '../../lab2/BarChart';
import { IDot, ILineChartProps } from '../../lab2/LineChart';

export const convert2Chart = (record: Record<number, number>): IBarChartProps => {
  const data: Array<IBarChartElement> = [];

  Object.keys(record).forEach((key) => {
    const temp: IBarChartElement = {
      distribution: record[Number(key)],
      value: Number(key),
    };

    data.push(temp);
  });

  return { data: data.sort((a, b) => (a.value > b.value ? 1 : -1)) };
};

export const convert2Plot = (record: Record<number, number>, id: string): ILineChartProps => {
  const data: Array<IDot> = [];

  Object.keys(record).forEach((key) => {
    const temp: IDot = {
      y: record[Number(key)],
      x: Number(key),
    };

    data.push(temp);
  });

  // console.log(data)

  return {
    data: [
      {
        id,
        data: [{ x: 0, y: 0 }, ...data.sort((a, b) => (a.x > b.x ? 1 : -1))],
      },
    ],
    // noPaddings: true
  };
};
