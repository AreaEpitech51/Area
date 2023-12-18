import { googleAuth } from "@/auth/lucia";
import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";

export const GET = async (_request: NextRequest) => {
  try {
    const [url, state] = await googleAuth.getAuthorizationUrl();
    cookies().set("google_oauth_state", state, {
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
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
};
