import { z } from "zod";

export const ComponentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  description: z.string().default(""),
});

export const CustomFieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1, "Label is required"),
  value: z.string().default(""),
});

export const StatsSchema = z.object({
  scalability: z.string().default(""),
  reliability: z.string().default(""),
  cost: z.string().default(""),
  cloudIndependence: z.string().default(""),
  security: z.string().default(""),
  monitoring: z.string().default(""),
  backupStrategy: z.string().default(""),
  deployment: z.string().default(""),
});

export const HomelabSheetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Homelab name is required"),
  description: z.string().default(""),
  stats: StatsSchema.default({}),
  hardware: z.array(ComponentSchema).default([]),
  services: z.array(ComponentSchema).default([]),
  customFields: z.array(CustomFieldSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Component = z.infer<typeof ComponentSchema>;
export type CustomField = z.infer<typeof CustomFieldSchema>;
export type Stats = z.infer<typeof StatsSchema>;
export type StatKey = keyof Stats;
export type HomelabSheet = z.infer<typeof HomelabSheetSchema>;
