"use client";

import { useState } from "react";
import {
  BookOpen,
  Feather,
  ScrollText,
  Globe,
  Lock,
  VenetianMask,
  Save,
  Send,
  Search,
  Mic,
  ChevronDown,
} from "lucide-react";
import { Props } from "../page";



export default function Memoirs({ setActiveTab }: Props) {
  const [type, setType] = useState("journal");
  const [visibility, setVisibility] = useState("private");
  const [sortBy, setSortBy] = useState("Trending");

  return (
    <div className="min-h-screen bg-[#CBF0FD] flex flex-col p-1 mb-6 overflw-hidden">

      <div className="max-w-4xl mx-auto mt-2 flex items-center gap-4 px-4 sticky">

        {/* Dropdown */}
        <div className="w-[180px] flex-shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
            appearance-none
        w-full
        bg-transparent
        text-black
        px-4
        py-2
        rounded-full
        shadow-md
        outline-none
      "
          >
            {["Trending", "Latest", "Oldest"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            type="text"
            placeholder="Search memoirs ..."
            className="
        w-full
        bg-[#b8d8e8]
        text-black
        rounded-full
        py-2
        pl-12
        pr-14
        outline-none
      "
          />

          <Mic
            size={22}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
          />
        </div>

      </div>

      <main className="flex-1 flex flex-col items-center font-instrument-serif justify-center text-center px-6 mb-12">
        <h2 className="text-3xl md:text-5xl text-white/70 mb-3">
          It's your space...
        </h2>

        <p className="text-gray-700 text-sm md:text-base max-w-sm">
          Make sure to own this page 💕
        </p>
      </main>

    </div>
  );
}