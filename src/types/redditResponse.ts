export type RedditResponse = {
  postData: PostData;
  analysis: AnalysisData;
};
export type PostData = {
  score: number;
  comments: number;
  username: string;
  title: string;
  link: string;
};
export type AnalysisData = {
  Summary: string;
  Emotions: string[];
};
