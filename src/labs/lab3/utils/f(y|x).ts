export const f_yx = (x: number, y: number): number => {
  return (Math.pow(x, 2) + y / 3) / (Math.pow(x, 2) + 1 / 6);
};

export const Df_yx = (x: number, y: number) => {
  const matrix = [
    [2 / 5, 1 / 5, 2 / 5],
    [2 / 5, 2 / 5, 1 / 5],
    [1 / 4, 1 / 4, 1 / 2],
    [1 / 6, 2 / 3, 1 / 6],
  ];

  const current = matrix[x];

  const values = current.map((val, index) => {
    if(index === 0) return val;

    let temp = 0;
    for (let i = index; i >= 0; i--) {
      temp += current[i]
    }

    return temp;
  })

  return values.findIndex((val) => val >= y)
};
