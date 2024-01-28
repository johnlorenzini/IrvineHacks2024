import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // What are common medications taken for  diabetes and their description and side effects in easy to understand language? Respond with a list with "/n" before each entry
  let prompt = await request.text();
  let prompt1 =
    "What are common medications taken for " +
    prompt +
    " and their side effects in easy to understand language? Respond with a list with '/n' before each entry";
  let prompt2 =
    "What are three top symptoms of " +
    prompt +
    " and their description in easy to understand language? Respond with a list with '/n' before each entry";
  let prompt3 =
    "What are the most common treatments for " +
    prompt +
    " and their description in easy to understand language? Respond with a list with '/n' before each entry";
  let prompt4 =
    "Based on the terms Favorable, Guarded, Unfavorable, what is the prognosis for " +
    prompt +
    " and their description in easy to understand language? Respond with a list with '/n' before each entry";
  let prompt5 =
    "Can you look through the previous answers and simplify the language more to make it easier to understand?";

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
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt2 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response3 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt3 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 1024,
    stream: true,
  });

  const response4 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt4 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 300,
    stream: true,
  });

  const response5 = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt5 },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 300,
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

  if (targetResponse == "response1") {
    return streamResponse1;
  } else if (targetResponse == "response2") {
    return streamResponse2;
  } else if (targetResponse == "response3") {
    return streamResponse3;
  } else if (targetResponse == "response4") {
    return streamResponse4;
  } else if (targetResponse == "response5") {
    return streamResponse5;
  }
}
