export function extractRedditPart(fullUrl: string) {
  // This regular expression matches the pattern for the subreddit and the post identifier part of a Reddit URL
  const regex = /https?:\/\/www\.reddit\.com\/(r\/[^\/]+\/comments\/[^\/]+)\//;
  const match = fullUrl.match(regex);

  // Check if the URL matches the expected pattern
  if (match && match[1]) {
    return match[1]; // Return the matched group which is the required part
  } else {
    throw new Error("Invalid Reddit URL");
  }
}
