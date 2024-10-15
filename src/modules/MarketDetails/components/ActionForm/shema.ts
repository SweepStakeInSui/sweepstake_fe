import { z } from 'zod';

export const postOrder = (balance: number) =>
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
          return parsed <= balance;
        },
        {
          message: `Amount must be less than or equal to your balance (${balance})`,
        },
      ),
    price: z.coerce.string({
      required_error: 'Limit price is required',
    }),
    // .refine(
    //   (value) => {
    //     const parsed = Number(value);
    //     return !Number.isNaN(parsed) && parsed > 0;
    //   },
    //   {
    //     message: 'Limit price must be a valid number greater than 0',
    //   },
    // ),
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
