import { factorial } from './factorial';

const Pi = (index: number, C: number, P0: number, R: number) => {
  if (index <= C) {
    return (Math.pow(R, index) / factorial(index)) * P0;
  }
  // console.log(index, 
  //   (Math.pow(R, index) / (factorial(C) * Math.pow(C, index - C))) * P0,
  //   Math.pow(R, index),
  //   factorial(C) * Math.pow(C, index - C),
  //   P0
  // );
  return (Math.pow(R, index) / (factorial(C) * Math.pow(C, index - C))) * P0;
};

export const PiArray = (C: number, P0: number, R: number, parking: number): Array<number> => {
  const result = [];

  for (let i = 1; i <= C + parking; i++) {
    const pi = Pi(i, C, P0, R);

    result.push(pi);
  }

  return result;
};
