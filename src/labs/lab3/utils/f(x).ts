export const f_x = (x: number): number => {
  return Number(2 * Math.pow(x, 2) + 1 / 3);
};

export const Df_x = (x: number): number => {
  const result = [0.25, 0.25, 0.2, 0.3];
  return result[x];
};

export const DDf_x = (x: number): number => {
  if (x <= 0.25) {
    return 0;
  }
  if (x <= 0.5) return 1;
  if (x <= 0.7) return 2;

  return 3;
};

// export Df_x

// export const f_x = (x: number): number => {
//   return Number((3 / 2) * x - 1);
// };
