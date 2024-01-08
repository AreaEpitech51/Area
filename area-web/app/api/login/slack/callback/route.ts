import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("slack_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  return NextResponse.json({
    token: code,
  });
};
