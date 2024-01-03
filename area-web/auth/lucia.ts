import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import * as context from "next/headers";
import { userAgent } from "next/server";
import { azureAD, github, google } from "@lucia-auth/oauth/providers";

import type { NextRequest } from "next/server";

const client = new PrismaClient();

/**
 * The authentication object.
 */
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

/**
 * GitHub authentication configuration.
 * @param {Auth} auth - The authentication object.
 * @returns {Auth} - The configured authentication object.
 */
export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

/**
 * Microsoft authentication configuration.
 * @param {Auth} auth - The authentication object.
 * @returns {Auth} - The configured authentication object.
 */
export const microsoftAuth = azureAD(auth, {
  clientId: process.env.AZURE_CLIENT_ID ?? "",
  clientSecret: process.env.AZURE_CLIENT_SECRET ?? "",
  tenant: process.env.AZURE_TENANT_ID ?? "",
  redirectUri: process.env.AZURE_REDIRECT_URI ?? "",
});

/**
 * Google authentication configuration.
 * @param {Auth} auth - The authentication object.
 * @returns {Auth} The configured Google authentication object.
 */
export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
  accessType: "offline",
  scope: ["email", "profile"],
});

export type Auth = typeof auth;

/**
 * Retrieves the session for the current page.
 * @returns {Promise<Session | null>} A promise that resolves with the validated authentication request.
 */
export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

/**
 * Retrieves the application session by validating the bearer token.
 * @returns {Promise<Session | null>} A promise that resolves when the bearer token is validated.
 */
export const getAppSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validateBearerToken();
});

/**
 * Retrieves the session based on the request.
 * If the user agent is mobile, it returns the page session.
 * Otherwise, it returns the app session.
 * @param request - The NextRequest object.
 * @returns The session object.
 */
export const getSession = async (request: NextRequest) => {
  const isMobile = userAgent(request).device.type === "mobile";
  return isMobile ? await getPageSession() : await getAppSession();
};
