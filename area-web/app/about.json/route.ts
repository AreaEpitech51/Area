import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const date = new Date();
  const res = {
    client: {
      host: "localhost:3000",
    },
    server: {
      current_time: date.getTime(),
      services: [
        {
          name: "google",
          actions: [
            {
              name: "new_mail",
              description: "Check for new mail",
            },
          ],
          reactions: [
            {
              name: "sned_mail",
              description: "Send a mail",
            },
          ],
        },
        {
          name: "github",
          actions: [
            {
              name: "emoji",
              description: "Get emoji list",
            },
            {
              name: "new_repo",
              description: "Check is a repository is created less than 24h ago",
            },
          ],
        },
        {
          name: "spotify",
          reactions: [
            {
              name: "spotify",
              description: "Play the next song",
            },
          ],
        },
      ],
    },
  };
  return new Response(JSON.stringify(res), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
};
