import { z } from 'zod';

export const createBetSchemas = z.object({
  thumbnail: z.string(),
  title: z.string(),
  startDate: z.number(),
  startClock: z.number(),
  endDate: z.number(),
  endClock: z.number(),
  categories: z.array(z.string()),
  betType: z.string(),
  outcomes: z.array(
    z.object({
      outcome: z.string(),
      subOutcome: z.string(),
      picture: z.string(),
    }),
  ),
  rule: z.string(),
  about: z.string(),
  sources: z.string(),
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
