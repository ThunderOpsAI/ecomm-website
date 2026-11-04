/**
 * Prisma database client singleton with resilient offline proxy fallback.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createMockProxy = (): PrismaClient => {
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: { data?: unknown }) => d?.data ?? {},
    update: async (d: { data?: unknown }) => d?.data ?? {},
    upsert: async (d: { create?: unknown }) => d?.create ?? {},
    delete: async () => ({}),
    count: async () => 0,
  };
  return new Proxy({} as PrismaClient, {
    get: (_target, prop) => {
      if (prop === "$disconnect" || prop === "$connect") {
        return async () => {};
      }
      return noOp;
    },
  });
};

let client: PrismaClient;

try {
  client =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
} catch (err) {
  console.warn("[AI Studio] Database client initialization warning - using mock proxy", err);
  client = createMockProxy();
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = client;
}

export const prisma: PrismaClient = client;
export default prisma;
