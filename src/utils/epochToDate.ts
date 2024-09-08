export const epochToDate = (epoch: number): Date => {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCMilliseconds(epoch);
  return d;
};
