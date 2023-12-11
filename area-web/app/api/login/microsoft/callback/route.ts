import { auth, microsoftAuth } from "@/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("microsoft_oauth_state")?.value;
  const storedCodeVerifier = cookies().get("microsoft_oauth_code_verifier");
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const codeVerifier = storedCodeVerifier?.value;
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  if (!codeVerifier) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, azureADUser, createUser } =
      await microsoftAuth.validateCallback(code, codeVerifier);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          username: azureADUser.name,
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
