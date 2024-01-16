import { client, getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { Octokit } from "octokit";

import { NextResponse, type NextRequest } from "next/server";

type Repo = {
  name: string;
  created_at: string;
};

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
  const octokit = new Octokit({
    auth: token.value,
  });
  //   get list of repos
  const { data } = await octokit.request("POST /GET /users/{username}/repos", {
    username: "octocat",
  });
  const repos = data.map((repo: Repo) => {
    return {
      name: repo.name,
      created_at: repo.created_at,
    };
  }) as Repo[];
  //   check if a repo as been created in the last 24 hours
  const new_repo = repos.find((repo) => {
    const repo_date = new Date(repo.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - repo_date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  });
  if (!new_repo) {
    console.log("no new repo");
    return redirect("/api/actions/github/new_repo");
  }

  return NextResponse.json({
    message: "You have created a new repo in the last 24 hours",
  });
};
