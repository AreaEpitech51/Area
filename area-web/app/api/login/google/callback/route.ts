import { getSession } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/auth/lucia";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getSession(request);
  if (!session) return redirect("/");
  const storedState = cookies().get("google_oauth_state")?.value;
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
      name: "google",
      value: code,
      user_id,
    },
  });
  return redirect("/");
};
