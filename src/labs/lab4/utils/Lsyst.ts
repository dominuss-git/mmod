import { factorial } from './factorial';

// TODO: shit
export const Lsyst = (C: number, R: number, P: number, P0: number, parking: number, hi: number) => {
  if (hi === 1) {
    return (Math.pow(R, C) / factorial(C)) * (((parking * (parking + 1)) / 2) * P0);
  }

  // return (C * R * P) / Math.pow(C - R, 2);
  return (
    (Math.pow(R, C + 1) *
      (1 - (parking + 1) * Math.pow(R / C, parking) + parking * Math.pow(R / C, parking + 1)) *
      P0) /
    (C * factorial(C) * Math.pow(1 - R / C, 2))
  );
};
