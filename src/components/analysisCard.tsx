import { generatePastelColor } from "@/utils/colorGenerator";

export default function AnalysisCard({
  analysis,
  emotions,
  opinions,
}: {
  analysis: string;
  emotions: string[];
  opinions: string[];
}) {
  return (
    <div className="flex flex-col items-start justify-between border border-gray-300 p-4 rounded-md bg-white">
      <h1 className="text-lg font-medium ">Summary</h1>
      <p className="text-gray-500">{analysis}</p>
      {opinions.length > 0 && (
        <>
          <h1 className="text-lg font-medium mt-4 mb-1">Opinions</h1>
          <ul className="flex items-start flex-col gap-1 list-disc list-inside">
            {opinions.map((opinion) => (
              <li key={opinion} className="text-gray-500 py-1 rounded-md">
                {opinion}
              </li>
            ))}
          </ul>
        </>
      )}
      {emotions.length > 0 && (
        <>
          <h1 className="text-lg font-medium mt-4 mb-1">Emotions</h1>
          <div className="flex items-center space-x-1 gap-3">
            {emotions.map((emotion) => (
              <div
                key={emotion}
                className="text-black py-1 px-2 rounded-md"
                style={{ background: generatePastelColor() }}
              >
                {emotion}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
