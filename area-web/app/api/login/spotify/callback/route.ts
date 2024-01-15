import { client, getPageSession, getSession } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getPageSession();
  if (!session) {
    console.log("no spotify session");
    return redirect("/");
  }
  const storedState = cookies().get("spotify_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  const user_id = session.user.userId;
  await client.token.create({
    data: {
      name: "spotify",
      value: code,
      user_id,
    },
  });
  redirect("/");
};
