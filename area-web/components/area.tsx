import React, { useEffect } from "react";
import { getSession } from "@/auth/lucia";
import { client } from "@/auth/lucia";
import type { NextRequest } from "next/server";

type Application = {
  names: string[];
  descriptions: string[];
};

const callReaction = async ({
  description,
  content,
}: {
  description: string;
  content: string;
}) => {
  if (description === "send_mail") {
    await fetch("https://localhost:3000/api/reactions/send_mail", {
      method: "POST",
      body: content,
    });
  }
};

const LaunchActions = ({ applications }: { applications: Application[] }) => {
  applications.forEach(async (app, _appIndex) => {
    if (app.names[0] === "emoji-github") {
      const emoji = await fetch(
        "https:localhost:3000/api/actions/github/emoji"
      );
      const text = await emoji.text();
      callReaction({ description: app.descriptions[1], content: text });
    }
    if (app.names[0] === "repo") {
      const res = await fetch(
        "https:localhost:3000/api/actions/github/new_repo"
      );
      const json = await res.json();
      const { message } = json;
      callReaction({ description: app.descriptions[1], content: message });
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
