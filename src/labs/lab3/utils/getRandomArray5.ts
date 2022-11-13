export interface IRandomValue {
  data: Array<number>;
  chart: Record<number, number>;
}

export const getRandonArray = (
  times: number,
  func: (x: number, y: number) => number
) => {
  const data = [];
  const chart = {
    x: [] as Array<number>,
    y: [] as Array<number>,
    z: [] as Array<number>,
  };
  const m: Record<number, number> = {};

  for (let i = 0; i < times; i++) {
    const x = Math.random();
    const y = Math.random();
    const value = func(x, y);

    // data.push([0, x, y, value]);
    chart.x.push(x)
    chart.y.push(y)
    chart.z.push(value)

    m[value] = !!m[value] ? m[value]+=1 : 1;

    // data.push(value);
  }

  return {
    m,
    chart
  };
};

export const getRandomArray = (
  times: number,
  random: (func: (z: number) => number, funcNext: (z1: number, z2: number) => number, max?: number) => number,
  func: (z: number) => number, funcNext: (z1: number, z2: number) => number,
  max?: number,
): IRandomValue => {
  const data = [];
  const chart: Record<number, number> = {};

  for (let i = 0; i < times; i++) {
    const value = Number(random(func, funcNext, max).toFixed(1));

    chart[value] = !!chart[value] ? chart[value] + 1 : 1;
    data.push(value);
  }

  return {
    data,
    chart,
  };
};
