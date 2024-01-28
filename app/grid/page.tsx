"use client";
import Image from "next/image";
import React from "react";

import { Grid, GridItem } from "@chakra-ui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Spacer } from "@nextui-org/react";

const queryParameters = new URLSearchParams(window.location.search);
const activeCondition = queryParameters.get("condition");

const conditionColors = {
  "Addisons disease": "blue",
  Asthma: "green",
  "Bipolar mood disorder": "purple",
  Bronchiectasis: "green",
  "Cardiac dysrhythmias": "red",
  "Cardiac failure": "red",
  Cardiomyopathy: "red",
  "Chronic obstructive pulmonary disease": "green",
  "Chronic renal disease": "",
  "Coronary artery disease": "red",
  "Crohns disease": "",
  "Diabetes insipidus": "blue",
  "Diabetes mellitus Type 1": "blue",
  "Diabetes mellitus Type 2": "blue",
  Epilepsy: "purple",
  Glaucoma: "",
  Haemophilia: "",
  Hyperlipidaemia: "red",
  Hypertension: "red",
  Hypothyroidism: "blue",
  "Multiple sclerosis": "purple",
  "Parkinsons disease": "purple",
  "Rheumatoid arthritis": "",
  Schizophrenia: "purple",
  "Systemic lupus erythematosus": "",
  "Ulcerative colitis": "",
};
const paletteBox = {
  red: {
    hero: "#F56060",
    accent: "#E10E0E",
    background: "#FBC0C0",
    card: "#FEF3F3",
    badge: "#FFF5F5",
  },
  blue: {
    hero: "#5475E5",
    accent: "#1C3FB7",
    background: "#ADBCF2",
    card: "#F5F3FF",
    badge: "#E1E8FF",
  },
  purple: {
    hero: "#8646F4",
    accent: "#5B21B6",
    background: "#DDD6FE",
    card: "#F5F3FF",
    badge: "#EDE9FE",
  },
  green: {
    hero: "#1A8245",
    accent: "#1A8245",
    background: "#ACEFC8",
    card: "#DAF8E6",
    badge: "#F0FFF4",
  },
};

// @ts-ignore
const activePalette = paletteBox[conditionColors[activeCondition]];
console.log(activePalette);

function Hero() {
  return (
    <Button className="row-span-3 bg-cover size-full h-full col-span-8 text-white rounded-2xl bg-[#F56060]  p-[40px] flex justify-start items-start">
      <div className="flex flex-col text-left">
        <div className="font-bold text-6xl">{activeCondition}</div>
        <div className="text-[1.75rem] font-semibol">hellos</div>
      </div>
      <img className="absolute bottom-10 right-10" src="/cardiac.svg" />
    </Button>
  );
}
function Medication() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="col-span-4 row-span-1">
      <Button
        className="flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[20px] justify-start items-start flex text-black"
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
              stroke="#E10E0E"
              stroke-width="3"
            />
          </svg>
          <div className="flex flex-col justify-start place-items-start">
            <div className="text-5xl  font-bold">Treatment</div>
          </div>
        </div>
        <div className="pt-2 text-2xl font-semibold text-[#6B7280] w-5/6 whitespace-normal text-left">
          In-depth understanding of your wellness plan.
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-white border-full h-screen"
        hideCloseButton={true}
        scrollBehavior={"outside"}
      >
        <ModalContent>
          {(onClose) => (
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
                      stroke="#1F2A37"
                      stroke-width="2"
                    />
                    <path
                      d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                      stroke="#1F2A37"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
                <div className="text-2xl px-2 py-0 text-black">Treatment </div>
                <div className="text-md px-2 py-0 text-black">
                  In-depth understanding of your wellness plan.
                </div>
              </ModalHeader>
              <ModalBody className="h-5/6">
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function Symptoms() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="col-span-4 row-span-2">
      <Button
        className="flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[20px] justify-start items-start flex text-black"
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
              fill="#E10E0E"
            />
            <path
              d="M45.2656 16.2812H10.5781C9.64063 16.2812 8.78125 17.0625 8.78125 18.0781C8.78125 19.0156 9.5625 19.875 10.5781 19.875H45.3437C46.2812 19.875 47.1406 19.0937 47.1406 18.0781C47.0625 17.0625 46.2812 16.2812 45.2656 16.2812Z"
              fill="#E10E0E"
            />
            <path
              d="M45.2656 31.6719H10.5781C9.64063 31.6719 8.78125 32.4531 8.78125 33.4687C8.78125 34.4844 9.5625 35.2656 10.5781 35.2656H45.3437C46.2812 35.2656 47.1406 34.4844 47.1406 33.4687C47.1406 32.4531 46.2812 31.6719 45.2656 31.6719Z"
              fill="#E10E0E"
            />
            <path
              d="M2.84375 4.64062C4.00873 4.64062 4.95312 3.69623 4.95312 2.53125C4.95312 1.36627 4.00873 0.421875 2.84375 0.421875C1.67877 0.421875 0.734375 1.36627 0.734375 2.53125C0.734375 3.69623 1.67877 4.64062 2.84375 4.64062Z"
              fill="#E10E0E"
            />
            <path
              d="M2.84375 20.1094C4.00873 20.1094 4.95312 19.165 4.95312 18C4.95312 16.835 4.00873 15.8906 2.84375 15.8906C1.67877 15.8906 0.734375 16.835 0.734375 18C0.734375 19.165 1.67877 20.1094 2.84375 20.1094Z"
              fill="#E10E0E"
            />
            <path
              d="M2.84375 35.5781C4.00873 35.5781 4.95312 34.6337 4.95312 33.4688C4.95312 32.3038 4.00873 31.3594 2.84375 31.3594C1.67877 31.3594 0.734375 32.3038 0.734375 33.4688C0.734375 34.6337 1.67877 35.5781 2.84375 35.5781Z"
              fill="#E10E0E"
            />
          </svg>
          <div className="text-5xl  font-bold">Symptoms</div>
        </div>
        <div className="pl-[20px] pt-5 flex flex-col w-full h-4/5 justify-around">
          <div className=" border-l-3 border-l-[#E10E0E] pl-[20px] py-2 text-2xl font-semibold text-[#6B7280] whitespace-normal text-left">
            Primary Symptoms
          </div>
          <div className=" border-l-3 border-l-[#E10E0E] pl-[20px] py-2 text-2xl font-semibold text-[#6B7280] whitespace-normal text-left">
            Secondary Symptoms
          </div>
          <div className=" border-l-3 border-l-[#E10E0E] pl-[20px] py-2 text-2xl font-semibold text-[#6B7280] whitespace-normal text-left">
            Physical Symptoms
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-white border-full min-h-screen"
        hideCloseButton={true}
        scrollBehavior={"outside"}
      >
        <ModalContent>
          {(onClose) => (
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
                      stroke="#1F2A37"
                      stroke-width="2"
                    />
                    <path
                      d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                      stroke="#1F2A37"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
                <div className="text-2xl px-2 py-0 text-black"> Symptoms</div>
                <div className="text-md px-2 py-0 text-black">
                  Common symptoms associated with your diagnosis
                </div>
              </ModalHeader>
              <ModalBody className="h-5/6">
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
  return (
    <div className="col-span-7 row-span-1">
      <Button className="shadow-md flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[20px] justify-start items-start flex text-black">
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
              fill="#E10E0E"
            />
            <path
              d="M38.6719 26.875C39.1406 26.875 39.6094 26.7188 39.9219 26.3281L42.6562 23.5938C43.3594 22.8906 43.3594 21.7969 42.6562 21.0938C41.9531 20.3906 40.8594 20.3906 40.1562 21.0938L37.4219 23.8281C36.7188 24.5313 36.7188 25.625 37.4219 26.3281C37.7344 26.7188 38.2031 26.875 38.6719 26.875Z"
              fill="#E10E0E"
            />
            <path
              d="M46.875 36.9531H37.7344C36.875 30.7031 31.4844 25.8594 25 25.8594C18.5156 25.8594 13.125 30.7031 12.2656 36.9531H3.125C2.1875 36.9531 1.32812 37.7344 1.32812 38.75C1.32812 39.7656 2.10937 40.5469 3.125 40.5469H46.875C47.8125 40.5469 48.6719 39.7656 48.6719 38.75C48.6719 37.7344 47.8125 36.9531 46.875 36.9531ZM25 29.375C29.5312 29.375 33.3594 32.6563 34.2187 36.9531H15.7812C16.6406 32.6563 20.4687 29.375 25 29.375Z"
              fill="#E10E0E"
            />
            <path
              d="M10.1563 26.3281C10.4688 26.6406 10.9375 26.875 11.4063 26.875C11.875 26.875 12.3438 26.7188 12.6563 26.3281C13.3594 25.625 13.3594 24.5313 12.6563 23.8281L9.84375 21.0938C9.14063 20.3906 8.04687 20.3906 7.34375 21.0938C6.64062 21.7969 6.64062 22.8906 7.34375 23.5938L10.1563 26.3281Z"
              fill="#E10E0E"
            />
          </svg>
          <div className="flex flex-col justify-start place-items-start">
            <div className="text-5xl  font-bold">Prognosis</div>
          </div>
        </div>
        <div className="pt-2 text-2xl font-semibold text-[#6B7280] whitespace-normal text-left">
          Understanding your life outlook.
        </div>
        <div className="flex items-center h-full gap-[0.7rem]">
          <div className="text-[#E10E0E] text-base font-normal text-center w-[140px] h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full">
            Favorable
          </div>
          <div className="text-[#E10E0E] text-base font-normal text-center w-[140px] h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full">
            Guarded
          </div>
          <div className="text-[#E10E0E] text-base font-normal text-center w-[140px] h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full">
            Unfavorable
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black h-screen "
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
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
                      stroke="#1F2A37"
                      stroke-width="2"
                    />
                    <path
                      d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                      stroke="#1F2A37"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
                Modal Title
              </ModalHeader>
              <ModalBody className="h-5/6"></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
function Research() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="col-span-5 row-span-2">
      <Button className=" rounded-xl border-2 border-slate-400/10 size-full bg-neutral-100 p-4 dark:bg-neutral-900 justify-start items-start flex text-black">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 21.25C25.9375 21.25 26.7969 20.4688 26.7969 19.4531V11.25C26.7969 10.3125 26.0156 9.45312 25 9.45312C24.0625 9.45312 23.2031 10.2344 23.2031 11.25V19.4531C23.2031 20.3906 24.0625 21.25 25 21.25Z"
            fill="#1C3FB7"
          />
          <path
            d="M38.6719 26.875C39.1406 26.875 39.6094 26.7188 39.9219 26.3281L42.6562 23.5938C43.3594 22.8906 43.3594 21.7969 42.6562 21.0938C41.9531 20.3906 40.8594 20.3906 40.1562 21.0938L37.4219 23.8281C36.7188 24.5313 36.7188 25.625 37.4219 26.3281C37.7344 26.7188 38.2031 26.875 38.6719 26.875Z"
            fill="#1C3FB7"
          />
          <path
            d="M46.875 36.9531H37.7344C36.875 30.7031 31.4844 25.8594 25 25.8594C18.5156 25.8594 13.125 30.7031 12.2656 36.9531H3.125C2.1875 36.9531 1.32812 37.7344 1.32812 38.75C1.32812 39.7656 2.10937 40.5469 3.125 40.5469H46.875C47.8125 40.5469 48.6719 39.7656 48.6719 38.75C48.6719 37.7344 47.8125 36.9531 46.875 36.9531ZM25 29.375C29.5312 29.375 33.3594 32.6563 34.2187 36.9531H15.7812C16.6406 32.6563 20.4687 29.375 25 29.375Z"
            fill="#1C3FB7"
          />
          <path
            d="M10.1563 26.3281C10.4688 26.6406 10.9375 26.875 11.4063 26.875C11.875 26.875 12.3438 26.7188 12.6563 26.3281C13.3594 25.625 13.3594 24.5313 12.6563 23.8281L9.84375 21.0938C9.14063 20.3906 8.04687 20.3906 7.34375 21.0938C6.64062 21.7969 6.64062 22.8906 7.34375 23.5938L10.1563 26.3281Z"
            fill="#1C3FB7"
          />
        </svg>
        Research
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black h-screen "
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
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
                      stroke="#1F2A37"
                      stroke-width="2"
                    />
                    <path
                      d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                      stroke="#1F2A37"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
                Modal Title
              </ModalHeader>
              <ModalBody className="h-5/6"></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
function Commonquestions() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="col-span-7 row-span-1">
      <Button className="flex-col size-full bg-cover h-full rounded-2xl border-2 border-[#F23030] bg-[#FEF3F3] p-[20px] justify-start items-start flex text-black">
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
              fill="#E10E0E"
            />
            <path
              d="M26.4062 9.45317C24.1406 9.06255 21.7969 9.68755 20.0781 11.1719C18.3594 12.6563 17.3438 14.7657 17.3438 17.1094C17.3438 17.9688 17.5 18.8282 17.8125 19.6875C18.125 20.625 19.1406 21.0938 20.0781 20.7813C21.0156 20.4688 21.4844 19.4532 21.1719 18.5157C21.0156 18.0469 20.9375 17.5782 20.9375 17.1094C20.9375 15.8594 21.4844 14.6875 22.4219 13.9063C23.3594 13.125 24.6094 12.7344 25.9375 12.9688C27.5781 13.2813 28.9844 14.6875 29.2969 16.3282C29.6094 18.2813 28.5937 20.2344 26.7969 21.0157C24.7656 21.875 23.4375 23.9063 23.4375 26.25V31.0938C23.4375 32.0313 24.2187 32.8907 25.2344 32.8907C26.1719 32.8907 27.0312 32.1094 27.0312 31.0938V26.25C27.0312 25.3907 27.5 24.6094 28.2031 24.2969C31.5625 22.8907 33.5156 19.375 32.8906 15.7813C32.0312 12.5782 29.5312 10 26.4062 9.45317Z"
              fill="#E10E0E"
            />
            <path
              d="M25.0781 35.7812H24.8437C23.9062 35.7812 23.0469 36.5625 23.0469 37.5781C23.0469 38.5937 23.8281 39.375 24.8437 39.375H25.0781C26.0156 39.375 26.7969 38.5937 26.7969 37.5781C26.7969 36.5625 26.0937 35.7812 25.0781 35.7812Z"
              fill="#E10E0E"
            />
          </svg>
          <div className="flex flex-col justify-start place-items-start">
            <div className="text-5xl  font-bold">Common Questions</div>
          </div>
        </div>
        <div className="pt-2 text-2xl font-semibold text-[#6B7280] whitespace-normal text-left">
          Questions asked by other patients.
        </div>
        <div className="flex items-center h-full gap-[0.7rem]">
          <div className="text-[#E10E0E] text-base font-normal text-center h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full px-5">
            Understanding
          </div>
          <div className="text-[#E10E0E] text-base font-normal text-center h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full px-5">
            Financial Concerns
          </div>
          <div className="text-[#E10E0E] text-base font-normal text-center h-[34px] outline flex items-center justify-center outline-2 bg-[#FFF5F5] outline-[#E10E0E] rounded-full px-5">
            Future Planning
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black h-screen "
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
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
                      stroke="#1F2A37"
                      stroke-width="2"
                    />
                    <path
                      d="M42 18.5L30 30M30 30L18 41.5M30 30L18 18.5M30 30L42 41.5"
                      stroke="#1F2A37"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                </Button>
                Modal Title
              </ModalHeader>
              <ModalBody className="h-5/6"></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
export default function Home() {
  return (
    <div className="grid aspect-video w-screen h-screen bg-gray-300 grid-cols-12 grid-rows-5 gap-[20px] p-[25px] 2xl:p-[50px]">
      <Hero></Hero>
      <Medication></Medication>
      <Symptoms></Symptoms>
      <Prognosis></Prognosis>
      <Research></Research>
      <Commonquestions></Commonquestions>
    </div>
  );
}
