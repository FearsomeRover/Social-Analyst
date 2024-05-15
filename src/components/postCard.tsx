import { PostData } from "@/types/redditResponse";

export default function PostCard({ postData }: { postData: PostData }) {
  return (
    <a
      className="flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white"
      href={postData.link}
      target="_blank"
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-lg font-medium">{postData.title}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            @{postData.username}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <HeartIcon />
          <span className="text-gray-500 dark:text-gray-400">
            {postData.score}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircleIcon />
          <span className="text-gray-500 dark:text-gray-400">
            {postData.comments}
          </span>
        </div>
      </div>
    </a>
  );
}

function HeartIcon() {
  return (
    <svg
      className="h-5 w-5 text-red-500"
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
