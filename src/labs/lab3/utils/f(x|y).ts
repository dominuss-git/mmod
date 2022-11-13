export const f_xy = (y: number, x: number): number => {
  return (3 * Math.pow(x, 2) + y) / (1 + y);
};

export const Df_xy = (y: number, x: number): number => {
  const matrix = [
    [1 / 3, 1 / 3, 1 / 6, 1 / 6],
    [1 / 8, 1 / 4, 1 / 8, 1 / 2],
    [1 / 3, 1 / 6, 1 / 3, 1 / 6],
  ];

  const current = matrix[y];

  const values = current.map((val, index) => {
    // if(index === 0) return val;

    let temp = 0;
    for (let i = index; i >= 0; i--) {
      temp += current[i]
    }

    return temp;
  })
  // console.log(values)

  return values.findIndex((val) => val >= x)
};
