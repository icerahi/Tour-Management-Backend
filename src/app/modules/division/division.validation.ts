import z from "zod";
export const createDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 2 charecters" }),
  thumbnail: z
    .string({ invalid_type_error: "Thumbnail must be string" })
    .min(2, { message: "Thumbnail must be at least 2 charecters" })
    .max(50, { message: "Thumbnail can not exceed 50 charecters" })
    .optional(),
  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(2, { message: "Description must be at least 2 charecters" })
    .max(50, { message: "Description can not exceed 50 charecters" })
    .optional(),
});

export const updateDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(1, { message: "Name must be at least 2 charecters" })
    .optional(),

  thumbnail: z
    .string({ invalid_type_error: "Thumbnail must be string" })
    .min(1, { message: "Thumbnail must be at least 2 charecters" })
    .optional(),
  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(1, { message: "Description must be at least 2 charecters" })
    .optional(),
});
