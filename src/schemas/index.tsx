import { z } from 'zod';

export const createBetSchemas = z.object({
  thumbnail: z.instanceof(File),
  title: z.string(),
  startDate: z.number(),
  startClock: z.number(),
  endDate: z.number(),
  endClock: z.number(),
  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  betType: z.string(),
  outcomes: z.array(
    z.object({
      outcome: z.string(),
      subOutcome: z.string(),
      picture: z.instanceof(File),
    }),
  ),
  rule: z.string(),
  about: z.string(),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
    }),
  ),
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
