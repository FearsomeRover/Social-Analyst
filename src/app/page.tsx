"use client";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { extractRedditPart } from "@/utils/extractReddit";
import { useState } from "react";
import PostCard from "@/components/postCard";
import { RedditResponse } from "@/types/redditResponse";
import AnalysisCard from "@/components/analysisCard";
import Lottie from "lottie-react";
import animation from "@/animation/wave-loader.json";

export default function Home() {
  const [result, setResult] = useState<RedditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string>("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;
    if (url) {
      const id = extractRedditPart(url);
      if (!id) {
        return;
      }
      setLoading(true);
      setLink(url);
      const res = await fetch("/api/get-reddit-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: url }),
      });
      const data = (await res.json()) as RedditResponse;
      setResult(data);
      setLoading(false);
    }
  }
  if (loading) {
    return <Lottie animationData={animation} />;
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 items-center">
      <div className="w-fit">
        {result ? (
          <>
            <button
              onClick={() => setResult(null)}
              className="absolute bottom-4 left-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-black text-white h-10 px-4 py-2 w-fit"
            >
              Go Back
            </button>
            <div className="flex flex-col gap-4 items-center justify-center">
              <PostCard postData={result.postData} link={link} />
              <AnalysisCard
                analysis={result.analysis.Summary}
                emotions={result.analysis.Emotions}
                opinions={result.analysis.Opinions}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                Social Media Analyst
              </h1>
              <p className="text-gray-500">
                Enter a social media link to get insights.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Enter a social media link" type="text" />
              </div>
              <Button>Get Insights</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
