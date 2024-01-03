import { discordAuth, getSession } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getSession(request);
  if (!session) redirect("/");
  const [url, state] = await discordAuth.getAuthorizationUrl();
  context.cookies().set("discord_oauth_state", state, {
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
