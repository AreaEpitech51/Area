import { auth } from "@/auth/lucia";
import { usernameSchema } from "@/auth/schema";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const user_name = formData.get("username");
  const pass_word = formData.get("password");
  const result = usernameSchema.safeParse({
    username: user_name,
    password: pass_word,
  });
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid username or password",
      },
      {
        status: 400,
      }
    );
  }
  const { username, password } = result.data;
  try {
    // find user by key
    // and validate password
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
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
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
