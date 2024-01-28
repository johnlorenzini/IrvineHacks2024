import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
export const dynamic = "force-dynamic";

export const runtime = "edge";

export async function POST(request: Request) {
  console.log("in the thing");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let prompt = await request.text();
  let prompt1 =
    "What are some common medications taken for " +
    prompt +
    " and side effects in very easy to understand language and simplify the medical terms?";
  let prompt2 =
    "What are three top symptoms of " +
    prompt +
    " and their description in very easy to understand language?";
  let prompt3 =
    "What are the most common treatments for " +
    prompt +
    " and their description in very easy to understand language?";
  let prompt4 =
    "Based on the terms Favorable, Guarded, Unfavorable, what is the prognosis for " +
    prompt +
    " and their description in very easy to understand language?";
  let prompt5 =
    "Can you provide me 10 links to online resources on " +
    prompt +
    " and provide a one sentence summary and the title of the website?";

  const response1 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt1 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response2 = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant tasked to simplify complex medical terminology for patients who have received a life-changing diagnosis. In your responses, you will use a high-school level of vocabulary, use examples and metaphors to explain complex terms, and overall allow a patient with no medical background to easily understand a complex medical situation.",
      },
      { role: "user", content: prompt2 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response3 = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant tasked to simplify complex medical terminology for patients who have received a life-changing diagnosis. In your responses, you will use a high-school level of vocabulary, use examples and metaphors to explain complex terms, and overall allow a patient with no medical background to easily understand a complex medical situation.",
      },
      { role: "user", content: prompt3 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response4 = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant tasked to simplify complex medical terminology for patients who have received a life-changing diagnosis. In your responses, you will use a high-school level of vocabulary, use examples and metaphors to explain complex terms, and overall allow a patient with no medical background to easily understand a complex medical situation.",
      },
      { role: "user", content: prompt4 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response5 = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant tasked to simplify complex medical terminology for patients who have received a life-changing diagnosis. In your responses, you will use a high-school level of vocabulary, use examples and metaphors to explain complex terms, and overall allow a patient with no medical background to easily understand a complex medical situation.",
      },
      { role: "user", content: prompt5 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const queryParams = new URLSearchParams(request.url.split("?")[1]);
  const targetResponse = queryParams.get("targetResponse");
  // const parsedResponses = JSON.parse(await request.text());

  const stream1 = OpenAIStream(response1);
  const stream2 = OpenAIStream(response2);
  const stream3 = OpenAIStream(response3);
  const stream4 = OpenAIStream(response4);
  const stream5 = OpenAIStream(response5);
  const streamResponse1 = new StreamingTextResponse(stream1);
  const streamResponse2 = new StreamingTextResponse(stream2);
  const streamResponse3 = new StreamingTextResponse(stream3);
  const streamResponse4 = new StreamingTextResponse(stream4);
  const streamResponse5 = new StreamingTextResponse(stream5);

  if (targetResponse == "medications") {
    return streamResponse1;
  } else if (targetResponse == "symptoms") {
    return streamResponse2;
  } else if (targetResponse == "treatments") {
    return streamResponse3;
  } else if (targetResponse == "prognosis") {
    return streamResponse4;
  } else if (targetResponse == "resources") {
    return streamResponse5;
  }
}
