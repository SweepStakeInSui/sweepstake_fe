import { z } from 'zod';

export const createBetSchema = (startTime: number, endTime: number) =>
  z.object({
    image: z.string().optional().nullable(),
    name: z
      .string({
        required_error: 'Market title is required',
      })
      .min(1, 'Market title is required'),
    description: z.string().optional(),
    colaterralToken: z.string(),
    conditions: z
      .string({
        required_error: 'Conditions is required',
      })
      .min(1, 'Conditions is required'),
    startDate: z.date().optional().nullable(),
    startClock: z.date().optional().nullable(),
    startTime: z
      .number({
        required_error: 'Start time is required',
      })
      .refine(
        (value) => {
          return value < endTime;
        },
        {
          message: 'Start time must be less than end time',
        },
      ),
    endDate: z.date().optional().nullable(),
    endClock: z.date().optional().nullable(),
    endTime: z
      .number({
        required_error: 'End time is required',
      })
      .refine((value) => value > startTime, {
        message: 'End time must be greater than start time',
      }),
    category: z.array(z.unknown()).optional(),
    betType: z.string().optional(),
    outcomes: z
      .array(
        z.object({
          outcome: z.string().optional(),
          subOutcome: z.string().optional(),
          picture: z.instanceof(File).optional(),
        }),
      )
      .optional(),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  });

export type CreateBetSchemaType = z.infer<ReturnType<typeof createBetSchema>>;
