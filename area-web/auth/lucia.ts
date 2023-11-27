import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
  env: "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: prisma(client),
  getUserAttributes(user) {
    return {
      username: user.username,
    };
  },
});

export type Auth = typeof auth;
