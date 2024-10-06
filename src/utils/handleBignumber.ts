import BigNumber from 'bignumber.js';

const powDecimal = (price: number | string, decimals: number = 9): string => {
  return new BigNumber(Number(price))
    .times(new BigNumber(10).pow(Number(decimals)))
    .toFixed();
};
const divideDecimal = (number: string | number, decimals: number = 9) => {
  const bigNumber = new BigNumber(number);
  const divisor = new BigNumber(10).exponentiatedBy(decimals);
  const result = bigNumber.dividedBy(divisor);
  return result.toString();
};
export const handleBignumber = {
  powDecimal,
  divideDecimal,
};
