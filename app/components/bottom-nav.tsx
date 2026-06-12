import {
  Users,
  NotebookPen,
  Computer,
  User,
  Bookmark,
  Feather,
  BookOpen,
} from "lucide-react";

type BottomNavProps = {
  current: string;
  setActiveTab: (tab: string) => void;
};

const navItems = [
  {
    tab: "write",
    icon: Feather,
    tooltip: "Write",
  },
  {
    tab: "memoirs",
    icon: Users,
    tooltip: "Explore Memoirs",
  },
  {
    tab: "journals",
    icon: BookOpen,
    tooltip: "My Journals",
  },
  {
    tab: "saved",
    icon: Bookmark,
    tooltip: "Saved",
  },
  {
    tab: "profile",
    icon: User,
    tooltip: "Profile",
  },
  {
    tab: "sarmaya",
    icon: Computer,
    tooltip: "Sarmaya AI",
  },
];

export default function BottomNav({
  current,
  setActiveTab,
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-sky-200 bg-[#CBF0FD] backdrop-blur-sm z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-around py-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.tab}
              className="group relative"
            >
              <button
                onClick={() => setActiveTab(item.tab)}
                className={`
                  transition-all duration-200

                  ${
                    current === item.tab
                      ? "text-sky-700 scale-110"
                      : "text-slate-600 hover:text-sky-600 hover:scale-105"
                  }
                `}
              >
                <Icon size={24} />
              </button>

              {/* Tooltip */}
              <div
                className="
                  absolute
                  bottom-12
                  left-1/2
                  -translate-x-1/2

                  whitespace-nowrap

                  rounded-lg
                  bg-black

                  px-3
                  py-1

                  text-xs
                  text-white

                  opacity-0
                  invisible

                  transition-all

                  group-hover:opacity-100
                  group-hover:visible
                "
              >
                {item.tooltip}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}