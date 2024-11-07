export const toEST = (date: Date): Date => {
  const estOffset = -5; // EST UTC offset
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * estOffset);
};
