import { z } from 'zod';

export const createRequestDepositSchema = (balance: number) => {
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
  });
};
export type RequestDepositSchemaType = z.infer<
  ReturnType<typeof createRequestDepositSchema>
>;
