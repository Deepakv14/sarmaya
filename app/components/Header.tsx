import { House } from "lucide-react";


export default function Header({ heading }: { heading: string }) {
    return (
        <header className="bg-[#5DBDDE] z-1000 rounded-tr-xl rounded-bl-xl mb-4  px-4 py-4 flex items-center justify-between shadow-sm sticky top-0">

            <button>
                <House size={24} color="#000000" />
            </button>
            <h1
                className={`
            font-comforter-brush
            text-5xl
            text-white
            text-center
            ${heading === "sarmaya" ? "italic font-serif" : ""}

                }
            `}
            >
                {heading === "sarmaya" ? "सरमाया" : heading}
            </h1>

            <button className="relative">
                🔔
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

        </header>
    );
}