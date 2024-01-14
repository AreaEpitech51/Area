import { client, getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getPageSession();
  if (!session) redirect("/");
  const google_token = await client.token.findFirst({
    where: {
      user_id: session.user.userId,
      name: "google",
    },
  });
  if (!google_token) redirect("/api/login/google");
  const body = await request.text();
  await fetch(
    "https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${google_token.value}`,
      },
      body: JSON.stringify({
        raw: body,
      }),
    }
  );
  return new Response("ok");
};
