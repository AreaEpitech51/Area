import { client, getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { Octokit } from "octokit";

import type { NextRequest } from "next/server";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";

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
      name: "github",
    },
  });
  if (!token) {
    console.log("no token");
    return redirect("/api/login/github");
  }
  const auth = createUnauthenticatedAuth({
    reason: "testing",
  });
  const authentication = await auth();
  const octokit = new Octokit({
    auth: authentication,
  });
  const { data } = await octokit.rest.emojis.get();
  const emojis = Object.keys(data);
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return new Response(emoji, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
