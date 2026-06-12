import { BookOpen, Feather, House, ScrollText, VenetianMask, Lock, Globe } from "lucide-react";
import BottomNav from "./bottom-nav";
import { useState } from "react";
import Header from "./Header";


type Props = {
    setActiveTab: (
        tab:
            | "journals"
            | "memoirs"
            | "write"
            | "saved"
            | "profile"
    ) => void;
};

export default function JournalsPage({ setActiveTab }: Props) {
    const [type, setType] = useState("journal");
    const [visibility, setVisibility] = useState("private");
    const [usermessage, setUserMessage] = useState("");
    return (
        <div className="min-h-screen bg-[#CBF0FD] flex flex-col p-1 mb-12">
            {/* Date */}
            <div className="flex justify-center m-2">
                <div className="bg-[#4f8bb8] text-white text-xs px-4 py-1 font-playfair-display rounded-full shadow">
                    12/06/2026 • Friday
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center font-instrument-serif justify-center text-center">
                <input
                    type="text"
                    placeholder="Untitled Memoir..."
                    className=" 
            bg-transparent
            outline-none
            border-none

            text-sm
            text-slate-800

            font-playfair-display

            placeholder:text-slate-400

          "
                />
            </div>

            <div className="flex-1 max-w-4xl items-center justify-center mx-auto w-full px-5 py-8">
                {/* Content */}

                <textarea
                    placeholder="It's your space... Make sure to own this page 💕"
                    disabled
                    value={usermessage}
                    rows={5}
                    onChange={(e) => { setUserMessage(e.target.value) }}
                    className="
            w-full
            text-black/80
            min-h-[350px]

            bg-white/40
            backdrop-blur-sm

            rounded-2xl
            p-6

            resize-none
            outline-none

            font-instrument-serif
            text-lg
            leading-8

            shadow-sm
          "
                />

                {/* Type */}

                <div className="mt-4">

                    <h3 className="font-geist-sans text-sm mb-2 text-slate-600">
                        Writing Type
                    </h3>

                    <div className="flex gap-3 text-sm flex-wrap">

                        <button
                            onClick={() => setType("journal")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${type === "journal"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <BookOpen size={16} />
                            Journal
                        </button>

                        <button
                            onClick={() => setType("memoir")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${type === "memoir"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <ScrollText size={16} />
                            Memoir
                        </button>

                        <button
                            onClick={() => setType("poem")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${type === "poem"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <Feather size={16} />
                            Poem
                        </button>

                    </div>

                </div>

                {/* Visibility */}

                <div className="mt-8">

                    <h3 className="font-geist-sans text-sm mb-3 text-slate-600">
                        Visibility
                    </h3>

                    <div className="flex gap-3 text-sm flex-wrap">

                        <button
                            onClick={() => setVisibility("private")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${visibility === "private"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <Lock size={16} />
                            Private
                        </button>

                        <button
                            onClick={() => setVisibility("public")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${visibility === "public"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <Globe size={16} />
                            Public
                        </button>

                        <button
                            onClick={() => setVisibility("anonymous")}
                            className={`
                px-4 py-1 rounded-full
                flex items-center gap-2

                ${visibility === "anonymous"
                                    ? "bg-[#63b5d5] text-white"
                                    : "bg-white"
                                }
              `}
                        >
                            <VenetianMask size={16} />
                            Anonymous
                        </button>

                    </div>

                </div>
            </div>

            {/* Write Bar */}
            <div className="px-1 pb-1">
                <div className="bg-white rounded-xs shadow-md flex items-center px-1 py-2 border-2 border-dotted border-[#63b5d5]">
                    <input
                        type="text"
                        placeholder="Share your thoughts..."
                        onChange={(e) => setUserMessage(e.target.value)}
                        value={usermessage}
                        className="flex-1 bg-transparent outline-none font-klee-one text-xl text-[#63b5d5]"
                    />

                    <button type="submit" className="bg-[#63b5d5] text-white p-2 rounded-md hover:scale-105 transition"
                        onClick={
                            () => {
                                setUserMessage("");
                                alert("Your entry has been shared!");
                            }
                        }>
                        ➤
                    </button>
                </div>
            </div>

            {/* Bottom Navigation */}
            {/* <nav className="bg-white border-t border-gray-200 py-3 px-6">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    <button className="text-2xl">👥</button>

                    <button className="text-2xl text-[#63b5d5]">
                        📔
                    </button>

                    <button className="text-3xl">
                        🪶
                    </button>

                    <button className="text-2xl">
                        🔖
                    </button>

                    <button className="text-2xl">
                        👤
                    </button>
                </div>
            </nav> */}
        </div>
    );
}