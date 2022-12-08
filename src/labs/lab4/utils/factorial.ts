export const factorial = (n: number): number => {
  return n ? n * factorial(n - 1) : 1;
};