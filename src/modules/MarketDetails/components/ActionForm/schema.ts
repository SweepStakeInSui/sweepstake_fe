import { z } from 'zod';

const getAmountErrorMessage = (
  isBid: boolean,
  isYes: boolean,
  balance: number,
  askShareYes: number,
  askShareNo: number,
) => {
  if (isBid) {
    if (balance === 0) {
      return "You don't have enough balance";
    }
    return `Amount must be greater than 0 and less than or equal to your balance (${balance})`;
  }
  if (isYes) {
    return !askShareYes
      ? 'Not enough shares held'
      : `Amount must be greater than 0 and less than ${askShareYes}`;
  }
  return !askShareNo
    ? 'Not enough shares held'
    : `Amount must be greater than 0 and less than ${askShareNo}`;
};

export const postOrder = (
  balance: number,
  type: string,
  isBid: boolean,
  isYes: boolean,
  askShareYes: number,
  askShareNo: number,
) =>
  z.object({
    outcomeId: z.string({
      required_error: 'Outcome ID is required',
    }),
    amount: z.coerce
      .string({
        required_error: 'Amount is required',
      })
      .refine(
        (value) => {
          const parsed = Number(value);
          if (isBid) {
            return parsed <= Number(balance) && parsed > 0;
          }
          if (isYes) {
            return parsed < askShareYes && parsed > 0;
          }
          return parsed < askShareNo && parsed > 0;
        },
        {
          message: getAmountErrorMessage(
            isBid,
            isYes,
            balance,
            askShareYes,
            askShareNo,
          ),
        },
      ),
    // Update the price validation in postOrder schema
    price: z.coerce
      .string({
        required_error: 'Limit price is required',
      })
      .refine(
        (value) => {
          const parsed = Number(value);
          if (type === 'FOK') {
            // FOK orders can have optional price
            return true;
          }
          // For non-FOK orders, price must be between 0.1 and 99.9
          return !Number.isNaN(parsed) && parsed >= 0.1 && parsed <= 99.9;
        },
        {
          message:
            type === 'FOK'
              ? 'Price is optional for FOK orders'
              : 'Price must be between 0.1 and 99.9',
        },
      ),
    type: z.string({
      required_error: 'Type is required',
    }),
    side: z.string({
      required_error: 'Side is required',
    }),
    slippage: z.string({
      required_error: 'Slippage is required',
    }),
    signature: z.string({
      required_error: 'Signature is required',
    }),
  });

export type WithdrawSchemaType = z.infer<ReturnType<typeof postOrder>>;
