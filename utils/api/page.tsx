"use client";
import { useState } from "react";

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
  const [responses, setResponses] = useState<any[]>([]);

  async function callGPT(
    condition: string,
    targetResponse: string
  ): Promise<string> {
    const response = await fetch(
      `http://localhost:3000/api/route?targetResponse=${targetResponse}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: condition }),
      }
    );
    const responseData = await response.text();
    return responseData;
  }

  async function processCondition(condition: string) {
    const responses = await Promise.all([
      callGPT(condition, "medications"),
      callGPT(condition, "symptoms"),
      callGPT(condition, "treatments"),
      callGPT(condition, "prognosis"),
      callGPT(condition, "resources"),
    ]);

    return {
      condition,
      answers: responses,
    };
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const allResponses = [];
    for (const condition of conditions) {
      const conditionResponses = await processCondition(condition);
      allResponses.push(conditionResponses);
      console.log("conditionResponses:", conditionResponses);
    }
    console.log("allResponses:", allResponses);

    setResponses(allResponses);
    const jsonData = JSON.stringify(allResponses);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "responses.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      {responses.map((responseGroup, index) => (
        <div key={index}>
          <h3>{responseGroup.condition}</h3>
          {responseGroup.answers.map((answer, answerIndex) => (
            <p key={answerIndex}>
              Response {answerIndex + 1}: {answer}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
