export const pickedAverage = (record: Record<number, number>, mode?: boolean, convert?: boolean): number => {
  const keys = Object.keys(record);

  const temp = keys.reduce((acc, key) => {
    return {
      xn: acc.xn + (mode ? Math.pow(Number(key), 2) : Number(key)) * record[Number(key)],
      n: acc.n + record[Number(key)]
    }
  }, { xn: 0, n: 0 })
  // console.log(
  //   .reduce((acc, key) => {
  //     return acc + Number(key) * (x.chart[Number(key)] / times);
  //   }, 0) /
  //     Object.keys(x.chart).reduce((acc, key) => {
  //       return acc + x.chart[Number(key)] / times;
  //     }, 0),
  //   x.data
  // );

  // TODO: remove 0.1
  return temp.xn / temp.n;
}

export const pickedAverageD = (record: Record<number, number>, times: number, mode?: boolean): number => {
  const keys = Object.keys(record);

  const temp = keys.reduce((acc, key) => {
    return acc + (mode ? Math.pow(Number(key), 2) : Number(key)) * record[Number(key)] / times;
  }, 0)
  // console.log(
  //   .reduce((acc, key) => {
  //     return acc + Number(key) * (x.chart[Number(key)] / times);
  //   }, 0) /
  //     Object.keys(x.chart).reduce((acc, key) => {
  //       return acc + x.chart[Number(key)] / times;
  //     }, 0),
  //   x.data
  // );

  // TODO: remove 0.1
  return temp;
}