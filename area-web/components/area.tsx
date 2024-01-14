import React, { useEffect } from "react";
import { getSession } from "@/auth/lucia";
import { client } from "@/auth/lucia";
import type { NextRequest } from "next/server";

type Application = {
  names: string[];
  descriptions: string[];
};

const LaunchActions = ({ applications }: { applications: Application[] }) => {
  applications.forEach(async (app, _appIndex) => {
    if (app.names[0] === "emoji-github") {
      const emoji = await fetch(
        "https:localhost:3000/api/actions/github/emoji"
      );
      const text = await emoji.text();
      await fetch("https://localhost:3000/api/reactions/send_mail", {
        method: "POST",
        body: text,
      });
    }
  });
};

const CallActions = ({ applications }: { applications: Application[] }) => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      LaunchActions({ applications });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div></div>;
};

export default CallActions;
