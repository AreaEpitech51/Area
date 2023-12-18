import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import * as context from "next/headers";
import { azureAD, github } from "@lucia-auth/oauth/providers";

const client = new PrismaClient();

export const auth = lucia ({
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

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

export const microsoftAuth = azureAD(auth, {
  clientId: process.env.AZURE_CLIENT_ID ?? "",
  clientSecret: process.env.AZURE_CLIENT_SECRET ?? "",
  tenant: process.env.AZURE_TENANT_ID ?? "",
  redirectUri: process.env.AZURE_REDIRECT_URI ?? "",
});

export const googleAuth = azureAD(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  tenant: process.env.GOOGLE_TENANT_ID ?? "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export const getAppSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validateBearerToken();
});
