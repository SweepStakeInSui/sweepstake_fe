import { z } from 'zod';

const getPriceErrorMessage = (
  type: string,
  isBid: boolean,
  isYes: boolean,
  balance: number,
  askYesLimit: number,
  askNoLimit: number,
) => {
  if (type === 'FOK') {
    if (isBid) {
      return `Price must be greater than 0 and less than or equal to your balance (${balance})`;
    }
    if (isYes) {
      return !askYesLimit
        ? 'You must buy first'
        : `Price must be greater than 0 and less than ${askYesLimit}`;
    }
    return !askNoLimit
      ? 'You must buy first'
      : `Price must be greater than 0 and less than ${askNoLimit}`;
  }
  return 'Price must be a valid number greater than or equal to 0';
};

const getAmountErrorMessage = (
  isBid: boolean,
  isYes: boolean,
  balance: number,
  askYesLimit: number,
  askNoLimit: number,
) => {
  if (isBid) {
    return `Amount must be greater than 0 and less than or equal to your balance (${balance})`;
  }
  if (isYes) {
    return !askYesLimit
      ? 'You must buy first'
      : `Amount must be greater than 0 and less than ${askYesLimit}`;
  }
  return !askNoLimit
    ? 'You must buy first'
    : `Amount must be greater than 0 and less than ${askNoLimit}`;
};

export const postOrder = (
  balance: number,
  type: string,
  isBid: boolean,
  isYes: boolean,
  askYesLimit: number,
  askNoLimit: number,
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
            return parsed < askYesLimit && parsed > 0;
          }
          return parsed < askNoLimit && parsed > 0;
        },
        {
          message: getAmountErrorMessage(
            isBid,
            isYes,
            balance,
            askYesLimit,
            askNoLimit,
          ),
        },
      ),
    price: z.coerce
      .string({
        required_error: 'Limit price is required',
      })
      .refine(
        (value) => {
          const parsed = Number(value);
          if (type === 'FOK') {
            if (isBid) {
              return parsed > 0 && parsed <= Number(balance);
            }
            if (isYes) {
              return parsed > 0 && parsed < askYesLimit;
            }
            return parsed > 0 && parsed < askNoLimit;
          }
          return !Number.isNaN(parsed) && parsed >= 0;
        },
        {
          message: getPriceErrorMessage(
            type,
            isBid,
            isYes,
            balance,
            askYesLimit,
            askNoLimit,
          ),
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
