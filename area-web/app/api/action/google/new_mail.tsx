import React from "react";
import { getSession } from "@/auth/lucia";
import { client } from "@/auth/lucia";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await getSession(request);
  if (!session) return { redirect: "/login" };
  const userid = session.user.userId;

  const token = await client.token.findFirst({
    where: {
      user_id: userid,
      name: "google",
    },
  });
};
