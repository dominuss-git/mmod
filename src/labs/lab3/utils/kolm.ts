export const kolm = (x_ter: number, x_a: number, times: number) => {
  return Math.abs(x_ter - x_a) < 1.36 / Math.sqrt(times);
}
