import { Moon, Sun } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function ThemeToggle({
  theme,
  toggleTheme,
}: Props) {
  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`
          relative flex items-center
          h-10 w-20 rounded-full p-1
          transition-all duration-300
          ${
            theme === "dark"
              ? "bg-zinc-900"
              : "bg-[#d8cdb8]"
          }
        `}
      >
        <div
          className={`
            absolute h-8 w-8 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${
              theme === "dark"
                ? "translate-x-10 bg-zinc-800"
                : "translate-x-0 bg-white"
            }
          `}
        >
          {theme === "dark" ? (
            <Moon size={12} />
          ) : (
            <Sun size={12} />
          )}
        </div>

        <div className="flex w-full justify-between px-2">
          <Sun size={14} />
          <Moon size={14} />
        </div>
      </button>
    </div>
  );
}