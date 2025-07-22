import z from "zod";

export const createTourTypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 charecters" })
    .max(50, { message: "Name can not exceed 50 charecters" }),
});

export const updateTourTypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 charecters" })
    .max(50, { message: "Name can not exceed 50 charecters" })
    .optional(),
});

export const createTourZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 charecters" })
    .max(50, { message: "Title can not exceed 100 charecters" }),
  slug: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Slug must be at least 2 charecters" })
    .max(50, { message: "Slug can not exceed 100 charecters" }),
  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(2, { message: "Description must be at least 2 charecters" })
    .optional(),
  images: z
    .string({ invalid_type_error: "Image must be string" })
    .min(2, { message: "Image must be at least 2 charecters" })
    .optional(),
  location: z
    .string({ invalid_type_error: "Location must be string" })
    .min(2, { message: "Location must be at least 2 charecters" })
    .max(50, { message: "Location can not exceed 100 charecters" })
    .optional(),
  costFrom: z
    .number({ invalid_type_error: "Cost must be number" })
    .min(1, { message: "Cost must be at least 1" })
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  division: z.string(),
  tourType: z.string(),
});

export const updateTourZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 charecters" })
    .max(50, { message: "Title can not exceed 100 charecters" })
    .optional(),
  slug: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Slug must be at least 2 charecters" })
    .max(50, { message: "Slug can not exceed 100 charecters" })
    .optional(),
  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(2, { message: "Description must be at least 2 charecters" })
    .optional(),
  images: z
    .string({ invalid_type_error: "Image must be string" })
    .min(2, { message: "Image must be at least 2 charecters" })
    .optional(),
  location: z
    .string({ invalid_type_error: "Location must be string" })
    .min(2, { message: "Location must be at least 2 charecters" })
    .max(50, { message: "Location can not exceed 100 charecters" })
    .optional(),
  costFrom: z
    .number({ invalid_type_error: "Cost must be number" })
    .min(1, { message: "Cost must be at least 1" })
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  division: z.string().optional(),
  tourType: z.string().optional(),
});
