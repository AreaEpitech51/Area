import { getPageSession } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/auth/lucia";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getPageSession();
  if (!session) return redirect("/");
  const storedState = cookies().get("discord_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  const userid = session.user.userId;
  await client.token.create({
    data: {
      name: "discord",
      value: code,
      user_id: userid,
    },
  });
};
