import { RedditResponse } from "@/types/redditResponse";
import { extractRedditPart } from "@/utils/extractReddit";
import OpenAI from "openai";
import getSummaryFromData from "./getSummaryFromData";
export async function POST(req: Request) {
  const reqbody = await req.json();
  const { link }: { link: string } = reqbody;
  try {
    const post = extractRedditPart(link);
    const res = await fetchSubredditPostAndComments(post);

    let final: RedditResponse = {
      postData: res.postData,
      analysis: await getSummaryFromData(res.text),
    };
    return new Response(JSON.stringify(final), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
  }

  return new Response(null, { status: 400 });
}
async function getOAuthToken() {
  const auth = btoa(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`
  );
  const data = `grant_type=password&username=${encodeURIComponent(
    process.env.REDDIT_USERNAME || ""
  )}&password=${encodeURIComponent(process.env.REDDIT_PASSWORD || "")}`;
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "MyAPI/0.0.1",
  };

  try {
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: headers,
      body: data,
    });
    const jsonData = await response.json();
    return jsonData.access_token;
  } catch (error) {
    console.error("Error fetching OAuth token:", error);
  }
}
async function fetchSubredditPostAndComments(post: string) {
  const token = await getOAuthToken();
  if (!token) {
    throw new Error("Failed to get OAuth token");
  }

  const url = `https://oauth.reddit.com/${post}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "MyAPI/0.0.1",
  };

  try {
    const response = await fetch(url, { headers: headers });
    const data = await response.json();
    const comments = data[0].data.children[0].data.num_comments;
    const score = data[0].data.children[0].data.ups;
    const username = data[0].data.children[0].data.author;
    const title = data[0].data.children[0].data.title;

    // Extract the original post's content
    const postContent = data[0].data.children[0].data.selftext || "";

    // Extract the text of each comment
    const commentsText: string[] = []; // Start with the original post's content
    data[1].data.children.forEach((child: any) => {
      if (child.data.body) {
        commentsText.push(child.data.body);
      }
    });

    // Join all comments and the original post's content into one paragraph
    const combinedText =
      "POST TEXT:\n" + postContent + "\nCOMMENTS:\n" + commentsText.join(" ");
    return {
      postData: {
        score: score,
        comments: comments,
        username: username,
        title: title,
        link: "",
      },
      text: combinedText,
    };
  } catch (error) {
    console.error("Error fetching subreddit post and comments:", error);
  }
  throw new Error("Failed to fetch subreddit post and comments");
}
