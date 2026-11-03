/**
 * Prisma database client singleton.
 *
 * In Next.js development mode, webpack/turbopack HMR re-evaluates modules on change,
 * which would spawn multiple PrismaClient instances and rapidly exhaust the PostgreSQL
 * connection pool. Caching the client on `globalThis` preserves the active pool across reloads.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

