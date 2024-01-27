import Image from "next/image";
import BentoGrid from "@bentogrid/core";

function Card() {
  return (
    <main className="flex flex-col bg-zinc-400 rounded-2xl ">
      <div className="text-red-400 text-5xl px-auto py-5 text-center">
        Asthma
      </div>
    </main>
  );
}
function Card2() {
  return (
    <main className="flex flex-col bg-zinc-400 rounded-2xl ">
      <div className="text-red-400 text-5xl px-auto py-5">Symptoms</div>
    </main>
  );
}
function Medication() {
  return (
    <main className="flex flex-col bg-zinc-400 rounded-2xl ">
      <div className="text-red-400 text-5xl px-auto py-5">Symptoms</div>
    </main>
  );
}
function Treatment() {
  return (
    <main className="flex flex-col bg-zinc-400 rounded-2xl ">
      <div className="text-red-400 text-5xl px-auto py-5">Symptoms</div>
    </main>
  );
}
function Prognosis() {
  return (
    <main className="flex flex-col bg-zinc-400 rounded-2xl ">
      <div className="text-red-400 text-5xl px-auto py-5">Symptoms</div>
    </main>
  );
}
export default function Home() {
  return (
    <main className="bentogrid">
      <div data-bento="1x1" className="bg-white">
        hello
      </div>
      <div data-bento="2x5" className="bg-blue-500">
        hello
      </div>
      <div data-bento="2x1" className="bg-red-500">
        hello
      </div>
    </main>
  );
}
