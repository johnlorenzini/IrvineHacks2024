"use client";
import app from "../../utils/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(app);
import { useState, useEffect } from "react";

console.log(db);
const text: string =
  "/m1. Hydrocortisone: Hydrocortisone is a medication that replaces the cortisol hormone, which is lacking in people with Addison's disease. It helps to regulate the body's response to stress, maintain blood pressure, and control inflammation. Side effects may include weight gain, mood changes, increased appetite, and difficulty sleeping. /m2. Fludrocortisone: Fludrocortisone is a medication that replaces the aldosterone hormone, which is also deficient in Addison's disease. It helps to regulate salt and water balance in the body, maintain blood pressure, and prevent dehydration. Side effects may include fluid retention, high blood pressure, low potassium levels, and muscle weakness. /m3. Prednisone: Prednisone is a corticosteroid medication that can be used in combination with hydrocortisone to manage Addison's disease. It helps to reduce inflammation and suppress the immune system. Side effects may include weight gain, increased appetite, mood changes, and increased risk of infections. /m4. DHEA (Dehydroepiandrosterone): DHEA is a hormone supplement that can be used to improve overall well-being and energy levels in people with Addison's disease. It is not a replacement for hydrocortisone or fludrocortisone. Side effects may include acne, hair loss, oily skin, and changes in menstrual cycle for women. /m5. Medic-Alert Bracelet: Although not a medication, wearing a Medic-Alert bracelet is highly recommended for people with Addison's disease. It helps to inform healthcare professionals about the condition in case of emergencies, ensuring appropriate treatment is provided promptly. Please note that this is a general overview, and it is important to consult with a healthcare professional for personalized advice and information about specific medications and their potential side effects.";

const meds = new Map();
// Split the text into individual medication entries
var entries: string[] = text.split("/m").slice(0, text.length - 1);
//console.log(entries.slice(1, entries.length-1));
entries = entries.slice(0, entries.length - 1);
// Parse each medication entry

for (const entry of entries) {
  // Split the entry into lines
  const lines: string[] = entry.split(": ");

  // Store medication information in the object
  meds.set(lines[0], lines[1]);
}

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/responses_6.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("hello!");
        setData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (data == null) return <p>No profile data</p>;
  console.log(data[0]);
  return (
    <div className="grid aspect-video w-screen h-screen bg-gray-300 grid-cols-12 grid-rows-5 gap-[20px] p-[25px] 2xl:p-[50px]"></div>
  );
}
