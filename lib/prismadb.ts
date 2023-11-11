import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

declare global {
  // sourcery skip: avoid-using-var
  var prisma: PrismaClient | undefined;
}

const prismadb: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> =
  globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "development") {
  globalThis.prisma = prismadb;
}

export default prismadb;
