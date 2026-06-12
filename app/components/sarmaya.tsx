"use client";

import { useState, useEffect } from "react";
import {
    saveEntry,
    getRecentEntries,
    generateId,
    type DiaryEntry,
    deleteEntry,
} from "../lib/storage";
import { Sun, Moon, NotebookPen, PenTool } from "lucide-react";
import { Props } from "../page";
import JournalEditor from "./JournalEditor";
import LatestReflection from "./LatestReflection";
import EntryHistory from "./EntryHistory";
import ThemeToggle from "./ThemeToggle";

type Reply = {
    message: string;
    poetry: {
        included: boolean;
        type: "recommendation" | "quote" | null;
        poet: string | null;
        title: string | null;
        reason: string | null;
    };
};

export default function Sarmaya({ setActiveTab }: Props) {
    const [text, setText] = useState("");
    const [submitted, setSubmitted] = useState<string | null>(null);
    const [reply, setReply] = useState<Reply | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Load saved entries on component mount
    useEffect(() => {
        const loadEntries = async () => {
            try {
                const recent = await getRecentEntries(50);
                setEntries(recent);
            } catch (err) {
                console.error("Failed to load entries:", err);
            } finally {
                setLoadingEntries(false);
            }
        };

        loadEntries();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("sarmaya-theme");

        if (saved === "light" || saved === "dark") {
            setTheme(saved);
        }
    }, []);


    useEffect(() => {
        setCurrentTime(
            new Date().toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
        );
    }, []);

    useEffect(() => {
        setCurrentDate(
            new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
        localStorage.setItem("sarmaya-theme", nextTheme);
    };


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed || sending) return;

        setSending(true);
        setError(null);

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error ?? "Something went wrong");
            }

            const newEntry: DiaryEntry = {
                id: generateId(),
                userMessage: data.received ?? trimmed,
                reply: data.reply ?? null,
                timestamp: Date.now(),
            };

            await saveEntry(newEntry);
            setEntries([newEntry, ...entries]);
            setSubmitted(data.received ?? trimmed);
            setReply(data.reply ?? null);
            setText("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send message");
        } finally {
            setSending(false);
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm("Are you sure you want to clear all entries? This cannot be undone.")) {
            return;
        }

        try {
            await Promise.all(entries.map((entry) => deleteEntry(entry.id)));
            setEntries([]);
            setExpandedId(null);
        } catch (err) {
            console.error("Failed to delete entries:", err);
            alert("Failed to clear entries. Please try again.");
        }
    };

   return (
  <div className="min-h-screen mb-12">

    <ThemeToggle
      theme={theme}
      toggleTheme={toggleTheme}
    />

    <JournalEditor
      text={text}
      setText={setText}
      handleSubmit={handleSubmit}
      sending={sending}
      currentDate={currentDate}
    />

    <LatestReflection
      entry={entries[0]}
    />

    <EntryHistory
      entries={entries}
      expandedId={expandedId}
      setExpandedId={setExpandedId}
      handleDeleteAll={handleDeleteAll}
    />

  </div>
);
}