export const F = (t: number, h: number) => {
  return 1 - Math.pow(Math.E, -1 * (h * t))
}