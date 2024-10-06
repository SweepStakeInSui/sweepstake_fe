import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { z } from 'zod';

export const createWithdrawSchema = (balance: number) => {
  return z.object({
    amount: z.coerce
      .string({
        required_error: 'Amount is required',
      })
      .refine(
        (value) => {
          const parsed = Number(value);
          return !Number.isNaN(parsed) && parsed > 0;
        },
        {
          message: 'Amount must be a valid number greater than 0',
        },
      )
      .refine(
        (value) => {
          const parsed = Number(value);
          return parsed <= balance;
        },
        {
          message: `Amount must be less than or equal to your balance (${balance})`,
        },
      ),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .refine((address) => isValidSuiAddress(address.toString()), {
        message: 'Invalid Sui address',
      }),
  });
};

export type WithdrawSchemaType = z.infer<
  ReturnType<typeof createWithdrawSchema>
>;
