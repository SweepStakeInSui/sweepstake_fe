export const timeToMilliseconds = (time: Date) => {
  const h = time.getHours();
  const m = time.getMinutes();

  return (h * 60 + m) * 60 * 1000;
};