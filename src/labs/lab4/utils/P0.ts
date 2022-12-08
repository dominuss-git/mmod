import { factorial } from './factorial';

// TODO: shit
export const PO = (n: number, R: number, parking: number, hi: number) => {
  let sum = 0;

  for (let i = 0; i <= n; i++) {
    sum += Math.pow(R, i) / factorial(i);
  }

  if (hi === 1) {
    return Math.pow(sum + (parking * Math.pow(R, n)) / factorial(n), -1);
  }

  sum +=
    (Math.pow(R, n + 1) / factorial(n) / (n - R)) *
    (1 - Math.pow(R / n, parking));

  return Math.pow(sum, -1);
};
