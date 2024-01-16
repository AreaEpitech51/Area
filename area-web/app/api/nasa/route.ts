import { getSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

const nasakey = process.env.NASA_API_KEY;
const thumbs = true;

export const GET = async (request: NextRequest) => {
  noStore();
  const session = getSession(request);
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
