export function calculateAvgPrice(data: any[], contracts: number): number {
  // Remove the first item in the array and reverse the remaining items
  const filteredData = data.slice(1).reverse();

  let liquidityTotal = 0;
  let priceTotal = 0;

  for (const item of filteredData) {
    const liquidity = parseInt(item.liquidity, 10);
    const price = item.price ? parseFloat(item.price) : 0;

    // Check if the total liquidity reaches or exceeds the required contracts
    if (liquidityTotal + liquidity >= contracts) {
      const remainingLiquidity = contracts - liquidityTotal;
      priceTotal += remainingLiquidity * price;
      liquidityTotal += remainingLiquidity;
      break; // Exit loop once we have enough contracts
    } else {
      // Accumulate liquidity and add liquidity * price to the price total
      priceTotal += liquidity * price;
      liquidityTotal += liquidity;
    }
  }

  // Calculate the average price (avgPrice)
  const avgPrice = liquidityTotal > 0 ? priceTotal / liquidityTotal : 0;
  return avgPrice;
}
