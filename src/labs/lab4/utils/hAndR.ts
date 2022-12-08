export const hAndR = (intensive: number, deliveryTime: number) => {
  const h = 1 / deliveryTime;
  return {
    h,
    R: intensive / h
  }
} 