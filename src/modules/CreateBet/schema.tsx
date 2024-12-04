import { z } from 'zod';

export const createBetSchema = (startTime: number, endTime: number) =>
  z.object({
    image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image is required',
      })
      .min(1, 'Image is required')
      .refine((val) => val !== null, {
        message: 'Image is required',
      }),
    name: z
      .string({
        required_error: 'Market title is required',
      })
      .min(1, 'Market title is required'),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description is required')
      .max(800, 'Exceeds max length 800 letters'),
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
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  });

export type CreateBetSchemaType = z.infer<ReturnType<typeof createBetSchema>>;
