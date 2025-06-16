import { z } from 'zod';

export const createColumnSchema = z.object({
  title: z.string().min(1),
});

export const updateColumnSchema = z.object({
  title: z.string().optional(),
  position: z.number().int().nonnegative().optional(),
});
