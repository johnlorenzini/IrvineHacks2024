"use client";
import { useState } from "react";
import app from "../../utils/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [responses, setParsedResponses] = useState<any[]>([]);

  const handleInputChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const data = JSON.stringify({ question });

  async function callGPT(targetResponse: string): Promise<string> {
    const response = await fetch(
      `http://localhost:3000/api/route?targetResponse=${targetResponse}`, // replace with proper api route
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
    const responseData = await response.text();
    console.log("response:", response);
    console.log("targetResponse:", targetResponse);
    console.log("responseData:", responseData);
    return responseData;
  }

  // async function simplifyResponses (targetResponse: string, parsedResponses: Array<{ question: string; answer: string }>): Promise<string>{
  //   const response = await fetch(`http://localhost:3000/api/hello?targetResponse=${targetResponse}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ parsedResponses, targetResponse })
  //     });
  //     const responseData = await response.text();
  //     console.log('simplified response:', response);
  //     console.log('targetResponse:', targetResponse);
  //     console.log('responseData:', responseData);
  //     return responseData;
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const responses = await Promise.all([
        callGPT("response1"),
        callGPT("response2"),
        callGPT("response3"),
        callGPT("response4"),
      ]);

      const parsedResponses = responses.map((response, index) => {
        return {
          question: `Question ${index + 1}`,
          answer: response,
        };
      });
      setParsedResponses(parsedResponses);
      console.log("parsedResponses:", parsedResponses);
      setAnswer(Object.values(responses));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // interface Responses {
  //   question: string;
  //   answer: string;
  // }

  // //key value mapping -------  IMPLEMENT LATER //

  // const aiResponses: Map<string, Responses> = new Map();

  // function addResponse(id: string, question: string, answer: string) {
  //   aiResponses.set(id, { question, answer });
  // }

  // function getResponse(id: string) {
  //   return aiResponses.get(id);
  // }

  // little test thing //

  // return (
  //   <div>
  //     <input type="text" value={question} onChange={handleInputChange} />
  //     <button onClick={handleSubmit}>submit</button>
  //     {answer.map((answer, index) => (
  //       <p key={index}>Response {index+1}: {answer}</p>
  //     ))}
  //   </div>
  // );
}
