"use client";
import app from "../utils/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Home() {
  const conditions = [
    "Addisons disease",
    "Asthma",
    "Bipolar mood disorder",
    "Bronchiectasis",
    "Cardiac dysrhythmias",
    "Cardiac failure",
    "Cardiomyopathy",
    "Chronic obstructive pulmonary disease",
    "Chronic renal disease",
    "Coronary artery disease",
    "Crohns disease",
    "Diabetes insipidus",
    "Diabetes mellitus Type 1",
    "Diabetes mellitus Type 2",
    "Epilepsy",
    "Glaucoma",
    "Haemophilia",
    "Hyperlipidaemia",
    "Hypertension",
    "Hypothyroidism",
    "Multiple sclerosis",
    "Parkinsons disease",
    "Rheumatoid arthritis",
    "Schizophrenia",
    "Systemic lupus erythematosus",
    "Ulcerative colitis",
  ];
  const [searchResults, setSearchResults] = useState([]);

  const db = getFirestore(app);

  console.log(db);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [responses, setParsedResponses] = useState<any[]>([]);

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

  // create new collection and add dummy data
  async function addDummyData() {
    const docRef = await addDoc(collection(db, "conditions"), {
      condition: "Addisons disease",
    });
    console.log("Document written with ID: ", docRef.id);
  }

  // addDummyData();

  function filterResults(query: string) {
    // search for query in conditions (must be 1:1 ex query[0] must equal conditions[0)
    if (query.length === 0) return setSearchResults([]);
    const foundResults = conditions.filter((condition) => {
      return condition
        .substring(0, query.length)
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    // @ts-ignore
    setSearchResults(foundResults);
    console.log(foundResults);
  }
  return (
    <NextUIProvider>
      <main className="w-screen flex flex-col bg-gray-300 h-screen justify-start items-center pt-12 px-60">
        <div
          id="search"
          className="flex justify-center items-center border-slate-300 border-2 w-full bg-white bg-transparent text-zinc-500 rounded-full text-left py-3 px-10"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.025 20.8875L16.8375 15.8625C19.3875 12.375 19.125 7.3875 15.9375 4.2375C14.25 2.55 12 1.6125 9.59998 1.6125C7.19998 1.6125 4.94998 2.55 3.26248 4.2375C-0.225024 7.725 -0.225024 13.425 3.26248 16.9125C4.94998 18.6 7.19998 19.5375 9.59998 19.5375C11.8875 19.5375 14.025 18.675 15.7125 17.1375L21.975 22.2C22.125 22.3125 22.3125 22.3875 22.5 22.3875C22.7625 22.3875 22.9875 22.275 23.1375 22.0875C23.4375 21.7125 23.4 21.1875 23.025 20.8875ZM9.59998 17.85C7.64998 17.85 5.84998 17.1 4.46248 15.7125C1.61248 12.8625 1.61248 8.25 4.46248 5.4375C5.84998 4.05 7.64998 3.3 9.59998 3.3C11.55 3.3 13.35 4.05 14.7375 5.4375C17.5875 8.2875 17.5875 12.9 14.7375 15.7125C13.3875 17.1 11.55 17.85 9.59998 17.85Z"
              fill="#111928"
            />
          </svg>
          <input
            type="text"
            className=" w-full outline-none bg-white bg-transparent text-zinc-500 rounded-3xl text-left py-3 px-10"
            placeholder=""
            onChange={(e) => filterResults(e.target.value)}
            onFocus={(e) => console.log(e.target.value)}
            required
          ></input>
        </div>
        <div className="">
          {searchResults.map((result) => {
            return (
              <a
                href={`/grid?condition=${result}`}
                className="flex justify-left items-center border-slate-300 border-2 w-full bg-white bg-transparent text-zinc-500 rounded-full text-left py-3 px-10"
              >
                <p>{result}</p>
              </a>
            );
          })}
        </div>
      </main>
    </NextUIProvider>
  );
}
