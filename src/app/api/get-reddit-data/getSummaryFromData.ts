import OpenAI from "openai";
export default async function getSummaryFromData(data: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content:
          "Step into the shoes of a social media analyst and generate contenta short summary of the post and comments provided by the user. The summary should be concise and engaging, highlighting the most important points and insights.",
      },
      {
        role: "user",
        content: `Analyze the following post and comments, examining the key points and insights: ${data}. Your output should be formatted in a json object with the following structure:
        {
            Summary: "Your summary here"
            Emotions: ["emotion1", "emotion2", "emotion3"]
        }`,
      },
    ],
    temperature: 0.8,
    max_tokens: 400,
    frequency_penalty: 0.1,
    presence_penalty: 0.1,
    response_format: { type: "json_object" },
  });
  if (response.choices[0].message.content == null) {
    throw new Error("Couldn't generate summary");
  }
  return JSON.parse(response.choices[0].message.content);
}
