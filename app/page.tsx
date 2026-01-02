import Link from "next/link";
import Image from "next/image";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="relative z-10 mb-6 animate-fade-in">
        <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-zinc-200/25 via-zinc-200/10 to-transparent blur-xl"
            aria-hidden="true"
          />
          <Image
            src="/img/general/avatar.png"
            alt="Tamir Nakar avatar"
            fill
            priority
            sizes="(max-width: 768px) 112px, 160px"
            className="relative rounded-full border border-zinc-700/60 bg-zinc-900/30 object-cover shadow-2xl shadow-black/40"
          />
        </div>
      </div>
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Tamir Nakar
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Senior Software Sorcerer | Guardian of the event-loop{" "}
        </h2>
      </div>
    </div>
  );

}
