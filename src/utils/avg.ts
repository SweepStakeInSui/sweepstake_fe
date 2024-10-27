export const avg = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0) / array.length;
};
