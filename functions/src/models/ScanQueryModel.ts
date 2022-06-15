import { z } from "zod";

export const scanQuerySchema = z
  .object({
    field: z.string().min(1),
    op: z.string(),
    value: z.string(),
  })
  .array();

export type ScanQuery = z.infer<typeof scanQuerySchema>;
