import z from "zod";

export const chatInputSchema = z.object({
  file: z.instanceof(File, { message: "El archivo es requerido" }),
  content: z.string().optional(),
});

export type chatInputType = z.infer<typeof chatInputSchema>;
