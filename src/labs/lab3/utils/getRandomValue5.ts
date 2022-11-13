export const getRandonValue = (x: number, y: number): number => {
  return Number((2 * (Math.pow(x, 2) + y / 3)).toFixed(1));
};

export const getRandomValueD = (y: number, x: number): number => {
  const matrix = [
    [0.1, 0.5, 0.1],
    [0.1, 0.1, 0.05],
    [0.05, 0.05, 0.1],
    [0.05, 0.2, 0.05],
  ]

  // console.log(x, y, matrix[x])

  return matrix[y][x];
}

export const getCoordinate = (func: (z: number) => number, funcNext: (z1: number, z2: number) => number): number => {
  const z1 = (Math.random());
  const z2 = (Math.random());

  let c1 = (func(z1));

  // console.log('z1', z1, z2, c1)

  if (c1 >= z2) {
    c1 = z1;
  }

  // console.log(c1)


  const z3 = (Math.random());
  const z4 = (Math.random());

  let c2 = (funcNext(c1, z3));

  // console.log('z3', z3, z4, c2)


  // TODO: probably z4 instead of 1
  if (c2 >= z4) {
    c2 = z3;
  }

  // console.log(c2)

  return c2;
};

export const getCoordinateD = (func: (z: number) => number, funcNext: (z1: number, z2: number) => number, max?: number): number => {
  const z1 = Math.random();
  // const z2 = (Math.random() * max);

  let c1 = (func(z1));

  // console.log('z1', z1, c1)

  // if (c1 >= z2) {
  //   c1 = z1;
  // }

  // console.log(c1)


  const z3 = (Math.random());
  // const z4 = (Math.random());

  let c2 = (funcNext(c1, z3));

  // console.log('z3',c1,  z3, c2)


  // TODO: probably z4 instead of 1
  // if (c2 >= z4) {
  //   c2 = z3;
  // }

  // console.log(c2)

  return c2;
};
