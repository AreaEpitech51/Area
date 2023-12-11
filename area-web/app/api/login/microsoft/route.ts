import { microsoftAuth } from "@/auth/lucia";
import * as context from "next/headers";

import type { NextRequest } from "next/server";
export const GET = async (_request: NextRequest) => {
  const [url, codeVerifier, state] = await microsoftAuth.getAuthorizationUrl();
  context.cookies().set("microsoft_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  context.cookies().set("microsoft_oauth_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
