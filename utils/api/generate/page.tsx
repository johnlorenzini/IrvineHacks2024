import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req : any, res : any) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 100,
      });

      res.status(200).json(response.choices[0].message);
    } catch (error) {
      console.log("Error calling OpenAI:", error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
