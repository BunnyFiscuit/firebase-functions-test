import { z } from "zod";

export const scanModelSchema = z.object({
  part: z.string().min(1),
  color: z.string().min(7).max(7),
  timestamp: z.string().optional(),
});
export type ScanModel = z.infer<typeof scanModelSchema>;
