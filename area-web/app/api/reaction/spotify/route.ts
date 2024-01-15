import { client, getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { Octokit } from "octokit";

import { NextRequest } from "next/server";

export const GET = async (_request: NextRequest) => {
  const session = await getPageSession();
  if (!session) {
    console.log("no session");
    return redirect("/");
  }
  const user_id = session.user.userId;
  const token = await client.token.findFirst({
    where: {
      user_id,
      name: "spotify",
    },
  });
  if (!token) {
    console.log("no token");
    return redirect("/api/login/spotify");
  }
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return new Response(null, {
    status: 200,
  });
};
