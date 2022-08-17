// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

export const prisma: PrismaClient =
    // @ts-ignore
    global.prisma ||
    new PrismaClient({
        log: ["query"],
    });
    
if (env.NODE_ENV !== "production") {
    // @ts-ignore
    global.prisma = prisma;
}
