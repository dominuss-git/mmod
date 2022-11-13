export const f_y = (y: number): number => {
  return Number(((2 / 3) * (1 + y)))
}

export const Df_y = (y: number): number => {
  const result = [0.3, 0.4, 0.3];
  
  return result[y]
}

export const DDf_y = (y: number): number => {
  if (y <= 0.3) return 0
  if (y <= 0.7) return 1
  return 2;
}

// export const f_y = (y: number): number => {
//   const a = Number(Math.sqrt(Math.abs(y - 1 / 3) / 2))

//   // console.log(a, (y - 1 / 3), (y - 1 / 3) / 2, Math.sqrt((y - 1 / 3) / 2));
//   return a;
// };
