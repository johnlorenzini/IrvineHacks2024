"use client";
import Image from "next/image";
import React from "react";
import data from "../../utils/responses.json";
import app from "../../utils/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Skeleton,
  Card
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { background } from "@chakra-ui/react";

 
const conditionsArray = [
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

const categoryData = {
  endocrine: {
    color: "blue",
    icon: "/endocrine.svg",
  },
  resp: {
    color: "green",
    icon: "/resp.svg",
  },
  neuro: {
    color: "purple",
    icon: "/neuro.svg",
  },
  cardio: {
    color: "red",
    icon: "/cardiac.svg",
  },
  gastro:{
    color: "orange",
    icon: "/gastro.svg"
  },
  rheuma:{
    color: "orange",
    icon: "/rheuma.svg"
  },
  psych:{
    color: "purple",
    icon: "/psych.svg"
  },
  optha:{
    color: "orange",
    icon: "/optha.svg"
  },
  haemo:{
    color: "orange",
    icon: "/haemo.svg"
  },
};

const conditionColors = {
  "Addisons disease": {
    category: "endocrine",
    desc: "It's like your body doesn't have enough energy, so you always feel tired and weak.",
  },
  Asthma: {
    category: "resp",
    desc: "Imagine your airways are like straws that sometimes get narrow, making it hard to breathe.",
  },
  "Bipolar mood disorder": {
    category: "psych",
    desc: "It's like your emotions are on a rollercoaster, going from super high to super low, and it's tough to control.",
  },
  Bronchiectasis: {
    category: "resp",
    desc: "Think of your lungs' tubes as floppy, which makes it tough to clear mucus, causing breathing issues.",
  },
  "Cardiac dysrhythmias": {
    category: "cardio",
    desc: "It's like your heart's rhythm is a wild dance, sometimes too fast or too slow.",
  },
  "Cardiac failure": {
    category: "cardio",
    desc: "Your heart gets tired and can't pump blood properly, so you feel weak.",
  },
  Cardiomyopathy: {
    category: "cardio",
    desc: "Picture your heart muscle getting weak and floppy, like a worn-out rubber band.",
  },
  "Chronic obstructive pulmonary disease": {
    category: "resp",
    desc: "Imagine breathing through a narrow straw because your lungs are damaged, making it hard to get enough air.",
  },
  "Chronic renal disease": {
    category: "endocrine",
    desc: "Your kidneys are like filters that get clogged, causing waste and toxins to build up in your body.",
  },
  "Coronary artery disease": {
    category: "cardio",
    desc: "Think of your heart's blood vessels as blocked highways, limiting blood and oxygen flow to your heart.",
  },
  "Crohns disease": {
    category: "gastro",
    desc: "It's like your digestive system is always upset, causing tummy pain, diarrhea, and inflammation.",
  },
  "Diabetes insipidus": {
    category: "endocrine",
    desc: "Imagine your body as a leaky faucet, making you really thirsty and pee a lot.",
  },
  "Diabetes mellitus Type 1": {
    category: "endocrine",
    desc: "Your body can't unlock the cells for sugar, so your blood sugar levels get too high.",
  },
  "Diabetes mellitus Type 2": {
    category: "endocrine",
    desc: "It's like your cell's key to unlock sugar gets rusty, causing high blood sugar.",
  },
  Epilepsy: {
    category: "neuro",
    desc: "Picture your brain's electricity going haywire, leading to seizures and confusion.",
  },
  Glaucoma: {
    category: "optha",
    desc: "It's like your eye's plumbing gets clogged, leading to high eye pressure and potential vision loss.",
  },
  Haemophilia: {
    category: "haemo",
    desc: "Think of your blood's clotting as slow and inefficient, making you bleed a lot.",
  },
  Hyperlipidaemia: {
    category: "cardio",
    desc: "Imagine your bloodstream as a traffic jam filled with too much cholesterol and fat.",
  },
  Hypertension: {
    category: "cardio",
    desc: "It's like your blood vessels are always squeezed tight, causing high blood pressure.",
  },
  Hypothyroidism: {
    category: "endocrine",
    desc: "Picture your metabolism as a slow engine, making you tired and gain weight.",
  },
  "Multiple sclerosis": {
    category: "neuro",
    desc: "Think of your nervous system wires with damaged insulation, causing communication problems.",
  },
  "Parkinsons disease": {
    category: "neuro",
    desc: "It's like your body's movement control is fading, leading to shaky hands and stiffness.",
  },
  "Rheumatoid arthritis": {
    category: "rheuma",
    desc: "Imagine your joints as battlegrounds where your body fights itself, causing pain and swelling.",
  },
  Schizophrenia: {
    category: "psych",
    desc: "It's like having a radio that plays confusing and distorted signals, making it hard to tell what's real.",
  },
  "Systemic lupus erythematosus": {
    category: "rheuma",
    desc: "Think of your immune system as a confused soldier attacking healthy parts, causing inflammation and various problems.",
  },
  "Ulcerative colitis": {
    category: "rheuma",
    desc: "It's like having constant tummy trouble with inflammation and open sores in your gut.",
  },
};
const paletteBox = {
  red: {
    hero: "#F56060",
    accent: "#F56060",
    background: "#FBC0C0",
    card: "#FEF3F3",
    badge: "#FEF3F3",
  },
  blue: {
    hero: "#5475E5",
    accent: "#5475E5",
    background: "#ADBCF2",
    card: "#F5F3FF",
    badge: "#F5F3FF",
  },
  purple: {
    hero: "#8646F4",
    accent: "#8646F4",
    background: "#DDD6FE",
    card: "#F5F3FF",
    badge: "#F5F3FF",
  },
  green: {
    hero: "#1A8245",
    accent: "#1A8245",
    background: "#ACEFC8",
    card: "#DAF8E6",
    badge: "#DAF8E6",
  },
  orange: {
    hero: "#E1580E",
    accent: "#E1580E",
    background: "#FDE5D8",
    card: "#FFF0E9",
    badge: "#FFF0E9",
  },
};


export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [activeCondition, setActiveCondition] = useState(null);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    setActiveCondition(queryParameters.get("condition"));
    setLoading(false);
  }, []);
  
  if(isLoading){
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <div className="w-1/3 h-1/3">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#000000" stroke-width="10" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
        </div>
      </div>
    );
  }
  const activePalette =
    paletteBox[categoryData[conditionColors[activeCondition].category].color];
  const activeImage =
    categoryData[conditionColors[activeCondition].category].icon;
  const activeDescription = conditionColors[activeCondition].desc;
  const AccordianComponent = ({items}) => {
    // create list of keys and values
    return (
      
      <Accordion className="space-y-4">
        {items.map((val, index) => (
        <AccordionItem
          key={index}
          title={Object.keys(val)[0]}
          className="text-black border-black border-2 rounded-2xl space-y-4 px-10 py-4"
        >
         {Object.values(val)[0] as string}
        </AccordionItem>  
        ))}
      </Accordion>
    );
    
  }

  function Hero() {
    return (
      <Button
        className="row-span-3 bg-cover size-full h-full col-span-8 text-white rounded-2xl bg-[#F56060]  p-[2.0833vw] flex justify-start items-start whitespace-normal"
        style={{
          backgroundColor: activePalette.hero,
        }}
      >
        <div className="flex flex-col text-left">
          <div className="font-bold text-[3.125vw]">{activeCondition}</div>
          <div className="text-[1.4583vw] font-semibol w-5/6">
            {activeDescription}
          </div>
        </div>
        <img className="absolute bottom-10 right-10" src={activeImage} />
      </Button>
    );
  }
  function medicationArray(){
    var list = data[conditionsArray.indexOf(activeCondition)].answers[0];
    var newl = list.split('\n\n').slice(1,-1);
    const mediArr = [];
    for(let i = 0; i<newl.length; i++){
      const [key, value] = newl[i].split(': ');
      const keyValuePairs = {[key]: value};
      mediArr.push(keyValuePairs)

    }
    console.log(mediArr)
    return mediArr

  }
  
  function Medication() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    var testitems = [{"hi":"bye", "ey":"no", "go":"stop"}]
    return (
      <div className="col-span-4 row-span-1">
        <Button
          className={`flex-col size-full bg-cover h-full rounded-2xl border-2 border-[${activePalette.hero}] bg-[#FEF3F3] p-[1.0417vw] justify-start items-start flex text-black`}
          style={{
            borderColor: activePalette.accent,
            backgroundColor: activePalette.card,
          }}
          onPress={onOpen}
        >
          <div className="flex justify-center items-center gap-4">
            <svg
              width="48"
              height="38"
              viewBox="0 0 48 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.07565 22.0702C6.32936 17.8444 10.3231 13.347 15.629 9.50853L29.6516 30.1758C24.1241 33.6877 18.4692 35.7368 13.7097 36.2694C8.51191 36.8511 4.81156 35.6068 3.10738 33.0951C1.40321 30.5834 1.61443 26.6852 4.07565 22.0702ZM32.1341 28.4914L18.1116 7.82416C23.6391 4.31226 29.2939 2.26312 34.0535 1.73052C39.2513 1.14889 42.9516 2.39313 44.6558 4.90484C46.36 7.41655 46.1487 11.3148 43.6875 15.9297C41.4338 20.1555 37.44 24.6529 32.1341 28.4914Z"
                stroke={activePalette.accent}
                stroke-width="3"
              />
            </svg>
            <div className="flex flex-col justify-start place-items-start">
              <div className="text-[2.500vw]  font-bold">Treatment</div>
            </div>
          </div>
          <div className="pt-2 text-[1.042vw] font-semibold text-[#6B7280] w-5/6 whitespace-normal text-left">
            In-depth understanding of your wellness plan.
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-white border-full min-h-screen p-[4.1667vw]"
          hideCloseButton={true}
          scrollBehavior={"outside"}
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-4 pl-4">
                  <Button onClick={onClose}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        fill="white"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        stroke={activePalette.accent}
                        stroke-width="2"
                      />
                      <path
                        d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                        stroke={activePalette.accent}
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                    </svg>
                  </Button>
                  <div className="pt-16 text-[2.500vw] font-bold px-2 py-0 text-black">
                    Treatment{" "}
                  </div>
                  <div className="text-md px-2 py-0 text-black">
                    In-depth understanding of your wellness plan.
                  </div>
                </ModalHeader>

                <ModalBody className="h-5/6">
                  <AccordianComponent
                    items={medicationArray()}
                  ></AccordianComponent>
                  {/*<Accordion
                   variant="splitted"
                    disableIndicatorAnimation={false}
                    className="text-black space-y-4"
                  >
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Accordion 1"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    >
                      Hello
                    </AccordionItem>

                    <AccordionItem
                      key="2"
                      aria-label="Accordion 2"
                      title="Accordion 2"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    ></AccordionItem>

                    <AccordionItem
                      key="3"
                      aria-label="Accordion 3"
                      title="Accordion 3"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    ></AccordionItem>
            </Accordion>*/}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  function symptomArr(){
    var list = data[conditionsArray.indexOf(activeCondition)].answers[1];
    var newl = list.split('\n\n').slice(1,-1);
    const mediArr = [];
    for(let i = 0; i<newl.length; i++){
      const [key, value] = newl[i].split(': ');
      const keyValuePairs = {[key]: value};
      mediArr.push(keyValuePairs)

    }
    console.log(mediArr)
    return mediArr


  }
  function Symptoms() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
      <div className="col-span-4 row-span-2">
        <Button
          className="flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[1.0417vw] justify-start items-start flex text-black"
          style={{
            borderColor: activePalette.accent,
            backgroundColor: activePalette.card,
          }}
          onPress={onOpen}
        >
          <div className="flex justify-center items-center gap-4">
            <svg
              width="48"
              height="36"
              viewBox="0 0 48 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5781 4.32813H45.3437C46.2812 4.32813 47.1406 3.54688 47.1406 2.53125C47.1406 1.51563 46.3594 0.734375 45.3437 0.734375H10.5781C9.64063 0.734375 8.78125 1.51563 8.78125 2.53125C8.78125 3.54688 9.5625 4.32813 10.5781 4.32813Z"
                fill={activePalette.accent}
              />
              <path
                d="M45.2656 16.2812H10.5781C9.64063 16.2812 8.78125 17.0625 8.78125 18.0781C8.78125 19.0156 9.5625 19.875 10.5781 19.875H45.3437C46.2812 19.875 47.1406 19.0937 47.1406 18.0781C47.0625 17.0625 46.2812 16.2812 45.2656 16.2812Z"
                fill={activePalette.accent}
              />
              <path
                d="M45.2656 31.6719H10.5781C9.64063 31.6719 8.78125 32.4531 8.78125 33.4687C8.78125 34.4844 9.5625 35.2656 10.5781 35.2656H45.3437C46.2812 35.2656 47.1406 34.4844 47.1406 33.4687C47.1406 32.4531 46.2812 31.6719 45.2656 31.6719Z"
                fill={activePalette.accent}
              />
              <path
                d="M2.84375 4.64062C4.00873 4.64062 4.95312 3.69623 4.95312 2.53125C4.95312 1.36627 4.00873 0.421875 2.84375 0.421875C1.67877 0.421875 0.734375 1.36627 0.734375 2.53125C0.734375 3.69623 1.67877 4.64062 2.84375 4.64062Z"
                fill={activePalette.accent}
              />
              <path
                d="M2.84375 20.1094C4.00873 20.1094 4.95312 19.165 4.95312 18C4.95312 16.835 4.00873 15.8906 2.84375 15.8906C1.67877 15.8906 0.734375 16.835 0.734375 18C0.734375 19.165 1.67877 20.1094 2.84375 20.1094Z"
                fill={activePalette.accent}
              />
              <path
                d="M2.84375 35.5781C4.00873 35.5781 4.95312 34.6337 4.95312 33.4688C4.95312 32.3038 4.00873 31.3594 2.84375 31.3594C1.67877 31.3594 0.734375 32.3038 0.734375 33.4688C0.734375 34.6337 1.67877 35.5781 2.84375 35.5781Z"
                fill={activePalette.accent}
              />
            </svg>
            <div className="text-[2.500vw]  font-bold">Symptoms</div>
          </div>
          <div className="pl-[1.0417vw] pt-5 flex flex-col w-full h-4/5 justify-around">
            <div
              className=" border-l-3 border-l-[#E10E0E] pl-[1.0417vw] py-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left"
              style={{ borderLeftColor: activePalette.accent }}
            >
              Primary Symptoms
            </div>
            <div
              className=" border-l-3 border-l-[#E10E0E] pl-[1.0417vw] py-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left"
              style={{ borderLeftColor: activePalette.accent }}
            >
              Secondary Symptoms
            </div>
            <div
              className=" border-l-3 border-l-[#E10E0E] pl-[1.0417vw] py-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left"
              style={{ borderLeftColor: activePalette.accent }}
            >
              Physical Symptoms
            </div>
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-white border-full min-h-screen p-[4.1667vw]"
          hideCloseButton={true}
          scrollBehavior={"outside"}
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className=" flex flex-col gap-4 pl-4">
                  <Button onClick={onClose}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        fill="white"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        stroke={activePalette.accent}
                        stroke-width="2"
                      />
                      <path
                        d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                        stroke={activePalette.accent}
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                    </svg>
                  </Button>
                  <div className="pt-16 text-[2.500vw] font-bold px-2 py-0 text-black">
                    {" "}
                    Symptoms
                  </div>
                  <div className="text-md px-2 py-0 text-black">
                    Common symptoms associated with your diagnosis
                  </div>
                </ModalHeader>
                <ModalBody className="h-5/6">
                  <AccordianComponent items={symptomArr()}></AccordianComponent>
                  {/*
                  <Accordion
                    variant="splitted"
                    disableIndicatorAnimation={false}
                    className="text-black space-y-4"
                  >
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Accordion 1"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    >
                      Hello
                    </AccordionItem>

                    <AccordionItem
                      key="2"
                      aria-label="Accordion 2"
                      title="Accordion 2"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    ></AccordionItem>

                    <AccordionItem
                      key="3"
                      aria-label="Accordion 3"
                      title="Accordion 3"
                      className="border-black border-2 rounded-2xl px-10 py-4"
                    ></AccordionItem>
                  </Accordion>
            */}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  function Prognosis() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    if(data){
      var index = conditionsArray.indexOf(activeCondition);
      var text = data[index].answers[3];
    } else {
      text = "hi";
    }
    
   
    return (
      <div className="col-span-7 row-span-1">
        <Button
          onPress={onOpen}
          className="shadow-md flex-col size-full bg-cover h-full rounded-2xl border-2 p-[1.0417vw] justify-start items-start flex text-black"
          style={{
            borderColor: activePalette.accent,
            backgroundColor: activePalette.card,
          }}
        >
          <div className="flex justify-center items-center gap-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 21.25C25.9375 21.25 26.7969 20.4688 26.7969 19.4531V11.25C26.7969 10.3125 26.0156 9.45312 25 9.45312C24.0625 9.45312 23.2031 10.2344 23.2031 11.25V19.4531C23.2031 20.3906 24.0625 21.25 25 21.25Z"
                fill={activePalette.accent}
              />
              <path
                d="M38.6719 26.875C39.1406 26.875 39.6094 26.7188 39.9219 26.3281L42.6562 23.5938C43.3594 22.8906 43.3594 21.7969 42.6562 21.0938C41.9531 20.3906 40.8594 20.3906 40.1562 21.0938L37.4219 23.8281C36.7188 24.5313 36.7188 25.625 37.4219 26.3281C37.7344 26.7188 38.2031 26.875 38.6719 26.875Z"
                fill={activePalette.accent}
              />
              <path
                d="M46.875 36.9531H37.7344C36.875 30.7031 31.4844 25.8594 25 25.8594C18.5156 25.8594 13.125 30.7031 12.2656 36.9531H3.125C2.1875 36.9531 1.32812 37.7344 1.32812 38.75C1.32812 39.7656 2.10937 40.5469 3.125 40.5469H46.875C47.8125 40.5469 48.6719 39.7656 48.6719 38.75C48.6719 37.7344 47.8125 36.9531 46.875 36.9531ZM25 29.375C29.5312 29.375 33.3594 32.6563 34.2187 36.9531H15.7812C16.6406 32.6563 20.4687 29.375 25 29.375Z"
                fill={activePalette.accent}
              />
              <path
                d="M10.1563 26.3281C10.4688 26.6406 10.9375 26.875 11.4063 26.875C11.875 26.875 12.3438 26.7188 12.6563 26.3281C13.3594 25.625 13.3594 24.5313 12.6563 23.8281L9.84375 21.0938C9.14063 20.3906 8.04687 20.3906 7.34375 21.0938C6.64062 21.7969 6.64062 22.8906 7.34375 23.5938L10.1563 26.3281Z"
                fill={activePalette.accent}
              />
            </svg>
            <div className="flex flex-col justify-start place-items-start">
              <div className="text-[2.500vw]  font-bold">Prognosis</div>
            </div>
          </div>
          <div className="pt-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left">
            Understanding your life outlook.
          </div>
          <div className="flex items-center h-full gap-[.5833vw]">
            <div
              className={`text-base font-normal text-center w-[7.2917vw] h-[1.7708vw] outline flex items-center justify-center outline-2 bg-[#FFF5F5] rounded-full`}
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Favorable
            </div>
            <div
              className={`text-base font-normal text-center w-[7.2917vw] h-[1.7708vw] outline flex items-center justify-center outline-2 bg-[#FFF5F5] rounded-full`}
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Guarded
            </div>
            <div
              className={`text-base font-normal text-center w-[7.2917vw] h-[1.7708vw] outline flex items-center justify-center outline-2 bg-[#FFF5F5] rounded-full`}
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Unfavorable
            </div>
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-white text-black h-screen p-[4.1667vw]"
          hideCloseButton={true}
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className=" flex flex-col gap-4 pl-4">
                  <Button onClick={onClose}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        fill="white"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        stroke={activePalette.accent}
                        stroke-width="2"
                      />
                      <path
                        d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                        stroke={activePalette.accent}
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                    </svg>
                  </Button>
                  <div className="pt-16 text-[2.500vw] font-bold px-2 py-0 text-black">
                    Prognosis{" "}
                  </div>
                  <div className="text-md px-2 py-0 text-black">
                    Understanding your life outlook.
                  </div>
                </ModalHeader>
                <ModalBody className="h-5/6">{text}</ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  function researchArr(){
     var list = data[conditionsArray.indexOf(activeCondition)].answers[4];
    var newl = list.split('\n\n').slice(1,-1);
    const mediArr = [];
    for(let i = 0; i<newl.length; i++){
      const [key, value] = newl[i].split('\n', 1);
      const keyValuePairs = {[key]: value};
      mediArr.push(keyValuePairs)

    }
    console.log(mediArr)
    return mediArr
  }
  function Research() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
      <div className="col-span-5 row-span-2">
        <Button
          onPress={onOpen}
          className="shadow-md flex-col size-full bg-cover h-full rounded-2xl border-2 p-[1.0417vw] justify-start items-start flex text-black"
          style={{
            borderColor: activePalette.accent,
            backgroundColor: activePalette.card,
          }}
        >
          <div className="flex justify-center items-center gap-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45.7031 41.6406L39.0625 7.03125C38.8281 5.78125 38.125 4.60937 37.0313 3.90625C35.9375 3.20312 34.6875 2.89062 33.3594 3.125L27.9688 4.14062C27.1875 2.5 25.4688 1.32812 23.5938 1.32812H16.3281H9.0625C6.32813 1.40625 4.14062 3.59375 4.14062 6.25V43.75C4.14062 46.4062 6.32813 48.6719 9.0625 48.6719H16.3281H23.5938C26.25 48.6719 28.5156 46.4844 28.5156 43.75V21.3281L32.8125 44.1406C33.0469 45.3906 33.75 46.5625 34.8437 47.2656C35.625 47.8125 36.6406 48.125 37.5781 48.125C37.8906 48.125 38.2031 48.125 38.5156 48.0469L41.875 47.4219C44.5312 46.875 46.25 44.2969 45.7031 41.6406ZM24.9219 6.25V15.4687H18.0469V4.92188H23.5156C24.2969 4.92188 24.9219 5.46875 24.9219 6.25ZM14.5313 35.4687H7.65625V16.7187H14.5313V35.4687ZM18.0469 18.9844H24.9219V30.3125H18.0469V18.9844ZM9.0625 4.92188H14.5313V13.2812H7.65625V6.25C7.65625 5.46875 8.28125 4.92188 9.0625 4.92188ZM7.65625 43.75V38.9844H14.5313V45.0781H9.0625C8.28125 45.1562 7.65625 44.5312 7.65625 43.75ZM23.5938 45.1562H18.125V33.8281H25V43.75C24.9219 44.5312 24.2969 45.1562 23.5938 45.1562ZM41.1719 43.9062L37.8906 44.5312C37.5 44.6094 37.1875 44.5312 36.875 44.2969C36.5625 44.0625 36.4063 43.75 36.3281 43.4375L29.375 7.5L34.0625 6.64062C34.4531 6.5625 34.7656 6.64062 35.0781 6.875C35.3906 7.10937 35.5469 7.42187 35.625 7.73437L42.2656 42.3437C42.4219 43.0469 41.9531 43.75 41.1719 43.9062Z"
                fill={activePalette.accent}
              />
            </svg>
            <div className="flex flex-col justify-start place-items-start">
              <div className="text-[2.500vw]  font-bold">Research</div>
            </div>
          </div>
          <div className="pt-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left">
            Learn more from the latest sources.
          </div>
          <div className="flex flex-col justify-start pt-[1.0417vw] h-full w-full gap-[1.0417vw]">
            <div
              className={`font-normal px-[1.0417vw] py-[1.25vw] outline flex outline-2 rounded-2xl`}
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col items-start text-left whitespace-normal overflow-y-hidden w-4/5 text-ellipsis">
                  <div className="font-[.9375vw] text-[#374151]">
                    {Object.keys(researchArr()[0])[0].slice(0, 139) + "..."}
                  </div>
                  <div className="text-[.8333vw] text-[#6B7280]">
                    {Object.values(researchArr()[0])[0] as string}
                  </div>
                </div>
                <div>
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5998 8.89997L11.8373 1.02498C11.4998 0.687476 10.9748 0.687476 10.6373 1.02498C10.2998 1.36248 10.2998 1.88748 10.6373 2.22498L16.9373 8.63748H0.999805C0.549805 8.63748 0.174805 9.01248 0.174805 9.46247C0.174805 9.91248 0.549805 10.325 0.999805 10.325H17.0123L10.6373 16.8125C10.2998 17.15 10.2998 17.675 10.6373 18.0125C10.7873 18.1625 11.0123 18.2375 11.2373 18.2375C11.4623 18.2375 11.6873 18.1625 11.8373 17.975L19.5998 10.1C19.9373 9.76248 19.9373 9.23748 19.5998 8.89997Z"
                      fill="#111928"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-white min-h-screen p-[4.1667vw]"
          hideCloseButton={true}
          scrollBehavior={"outside"}
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className=" flex flex-col gap-4 pl-4">
                  <Button onClick={onClose}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        fill="white"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        stroke={activePalette.accent}
                        stroke-width="2"
                      />
                      <path
                        d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                        stroke={activePalette.accent}
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                    </svg>
                  </Button>
                  <div className="pt-16 text-[2.500vw] font-bold px-2 py-0 text-black">
                    Research{" "}
                  </div>
                  <div className="text-md px-2 py-0 text-black">
                    Learn more from the latest sources.
                  </div>
                </ModalHeader>
                <ModalBody className="h-5/6">
                  <AccordianComponent
                    items={researchArr()}
                  ></AccordianComponent>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  function commonqArr(){
    var list = data[conditionsArray.indexOf(activeCondition)].answers[5];
    var newl = list.split('/m');
    return newl
  }
  const AccordianComponentQuestions = ({items}) => {
    // create list of keys and values
    console.log(items)
    return (
      
      <Accordion
      isDisabled={true} className="space-y-4">
        {items.map((val, index) => (
        <AccordionItem
          key={index}
          title={val}
          className="text-black border-black border-2 rounded-2xl px-10 py-4"
        >
        
        </AccordionItem>  
        ))}
      </Accordion>
    );
    
  }
  function Commonquestions() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
      <div className="col-span-7 row-span-1">
        <Button
          onPress={onOpen}
          className="flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[1.0417vw] justify-start items-start flex text-black"
          style={{
            borderColor: activePalette.accent,
            backgroundColor: activePalette.card,
          }}
        >
          <div className="flex justify-center items-center gap-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 1.40625C11.9531 1.40625 1.40625 11.9531 1.40625 25C1.40625 38.0469 11.9531 48.6719 25 48.6719C38.0469 48.6719 48.6719 38.0469 48.6719 25C48.6719 11.9531 38.0469 1.40625 25 1.40625ZM25 45.1562C13.9063 45.1562 4.92188 36.0938 4.92188 25C4.92188 13.9063 13.9063 4.92188 25 4.92188C36.0938 4.92188 45.1562 13.9844 45.1562 25.0781C45.1562 36.0937 36.0938 45.1562 25 45.1562Z"
                fill={activePalette.accent}
              />
              <path
                d="M26.4062 9.45317C24.1406 9.06255 21.7969 9.68755 20.0781 11.1719C18.3594 12.6563 17.3438 14.7657 17.3438 17.1094C17.3438 17.9688 17.5 18.8282 17.8125 19.6875C18.125 20.625 19.1406 21.0938 20.0781 20.7813C21.0156 20.4688 21.4844 19.4532 21.1719 18.5157C21.0156 18.0469 20.9375 17.5782 20.9375 17.1094C20.9375 15.8594 21.4844 14.6875 22.4219 13.9063C23.3594 13.125 24.6094 12.7344 25.9375 12.9688C27.5781 13.2813 28.9844 14.6875 29.2969 16.3282C29.6094 18.2813 28.5937 20.2344 26.7969 21.0157C24.7656 21.875 23.4375 23.9063 23.4375 26.25V31.0938C23.4375 32.0313 24.2187 32.8907 25.2344 32.8907C26.1719 32.8907 27.0312 32.1094 27.0312 31.0938V26.25C27.0312 25.3907 27.5 24.6094 28.2031 24.2969C31.5625 22.8907 33.5156 19.375 32.8906 15.7813C32.0312 12.5782 29.5312 10 26.4062 9.45317Z"
                fill={activePalette.accent}
              />
              <path
                d="M25.0781 35.7812H24.8437C23.9062 35.7812 23.0469 36.5625 23.0469 37.5781C23.0469 38.5937 23.8281 39.375 24.8437 39.375H25.0781C26.0156 39.375 26.7969 38.5937 26.7969 37.5781C26.7969 36.5625 26.0937 35.7812 25.0781 35.7812Z"
                fill={activePalette.accent}
              />
            </svg>
            <div className="flex flex-col justify-start place-items-start">
              <div className="text-[2.500vw]  font-bold">Common Questions</div>
            </div>
          </div>
          <div className="pt-2 text-[1.250vw] font-semibold text-[#6B7280] whitespace-normal text-left">
            Questions asked by other patients.
          </div>
          <div className="flex items-center h-full gap-[.5833vw]">
            <div
              className="text-base font-normal text-center h-[1.7708vw] outline flex items-center justify-center outline-2 rounded-full px-5"
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Understanding
            </div>
            <div
              className="text-base font-normal text-center h-[1.7708vw] outline flex items-center justify-center outline-2 rounded-full px-5"
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Financial Concerns
            </div>
            <div
              className="text-base font-normal text-center h-[1.7708vw] outline flex items-center justify-center outline-2 rounded-full px-5"
              style={{
                color: activePalette.accent,
                backgroundColor: activePalette.badge,
                borderColor: activePalette.accent,
              }}
            >
              Future Planning
            </div>
          </div>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-white min-h-screen p-[4.1667vw] pt-60"
          hideCloseButton={true}
        >
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-4">
                  <Button onClick={onClose}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        fill="white"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="58"
                        height="58"
                        rx="29"
                        stroke={activePalette.accent}
                        stroke-width="2"
                      />
                      <path
                        d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                        stroke={activePalette.accent}
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                    </svg>
                  </Button>
                  <div className="pt-16 text-[2.500vw] font-bold px-2 py-0 text-black">
                    Common Questions{" "}
                  </div>
                  <div className="text-md px-2 py-0 text-black">
                    Questions asked by other patients.
                  </div>
                </ModalHeader>
                <ModalBody className="h-5/6"><AccordianComponentQuestions
                 items={commonqArr()}></AccordianComponentQuestions>
              </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }

  return (
    <div
      className="grid aspect-video w-screen h-screen grid-cols-12 grid-rows-5 gap-[1.0417vw] p-[1.3021vw] 2xl:p-[2.6042vw]"
      style={{ backgroundColor: activePalette.background }}
    >
      <Hero></Hero>
      <Medication></Medication>
      <Symptoms></Symptoms>
      <Prognosis></Prognosis>
      <Research></Research>
      <Commonquestions></Commonquestions>
    </div>
  );
}
