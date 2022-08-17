import { z } from "zod";

export const TODO_VALIDATORS = {
    user: {
        id: z.string()
    },
    todo: {
        update: z.object({
            id: z.string(),
            name: z.string().min(1),
            order: z.number().optional(),
            description: z.string().optional(),
            isCompleted: z.boolean().optional(),
        }),
        create: z.object({
            name: z.string().min(1),
            // order: z.number(),
            description: z.string().nullable().optional(),
            // isCompleted: z.boolean(),
        }),
    }
} as const