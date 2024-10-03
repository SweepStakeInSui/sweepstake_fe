import { z } from 'zod';

export const createBetSchemas = z.object({
  thumbnail: z.instanceof(File).optional(),
  name: z.string(),
  description: z.string().optional(),
  colaterralToken: z.string(),
  conditions: z.string().optional(),
  startDate: z.number(),
  startClock: z.number().optional(),
  endDate: z.number(),
  endClock: z.number().optional(),
  categories: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  betType: z.string().optional(),
  outcomes: z
    .array(
      z.object({
        outcome: z.string(),
        subOutcome: z.string(),
        picture: z.instanceof(File),
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

// {
//   thumbnail: string(),
//   title: string(),
//   startDate: number(),
//   startClock: number(),
//   endDate: number(),
//   endClock: number(),
//   categories: array(string()),
//   betType: string(),
//   outcomes: array(
//     object({
//       outcome: string(),
//       subOutcome: string(),
//       picture: string(),
//     }),
//   ),
//   rule: string(),
//   about: string(),
//   sources: string(),
// }
