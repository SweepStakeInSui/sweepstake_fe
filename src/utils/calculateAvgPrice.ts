import { SLIPPAGE } from '@/constants';

export function calculateAvgPrice(
  data: any[],
  targetLiquidity: string,
): number {
  if (Number(targetLiquidity) === 0) {
    return 0;
  }
  const filteredData = data.slice(1);

  let totalWeight = 0;
  let remainingLiquidity = Number(targetLiquidity);

  for (const item of filteredData) {
    const price = Number(item.price);
    const liquidity = Number(item.liquidity);

    if (price && remainingLiquidity > 0) {
      const usedLiquidity = Math.min(liquidity, remainingLiquidity);
      totalWeight += usedLiquidity * price;
      remainingLiquidity -= usedLiquidity;
    }
  }

  if (remainingLiquidity > 0) {
    const lastPrice = filteredData[filteredData.length - 1]?.price || 0;
    const adjustedPrice = Number(lastPrice) * (1 + SLIPPAGE);
    totalWeight += remainingLiquidity * adjustedPrice;
    remainingLiquidity = 0;
  }

  return Math.floor(totalWeight / Number(targetLiquidity) / 10000);
}
