import { getAppSession, getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse, userAgent } from "next/server";

const nasakey = process.env.NASA_API_KEY;
const thumbs = true;

export const GET = async (request: NextRequest) => {
  const session =
    userAgent(request).device.type === "mobile"
      ? await getPageSession()
      : await getAppSession();
  if (!session) redirect("/login");
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${nasakey}&thumbs=${thumbs}`
  );
  const json = await response.json();
  const { media_type } = json;

  const responseData = {
    url: media_type === "video" ? json.thumbnail_url : json.url,
  };

  return NextResponse.json(responseData, { status: 200 });
};
