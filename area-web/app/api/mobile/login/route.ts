import { auth } from "@/auth/lucia";
import { usernameSchema } from "@/auth/schema";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia";
import * as context from "next/headers";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const result = usernameSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error.message,
      },
      {
        status: 400,
      }
    );
  }
  const { username, password } = result.data;
  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    const { sessionId } = session;
    return NextResponse.json(
      {
        sessionId,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      // user does not exist or invalid password
      return NextResponse.json(
        {
          error: "Incorrect username or password",
        },
        {
          status: 400,
        }
      );
    }
  }
};
