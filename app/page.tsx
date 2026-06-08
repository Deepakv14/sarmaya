"use client";

import { useState, useEffect } from "react";
import {
  saveEntry,
  getRecentEntries,
  generateId,
  type DiaryEntry,
  deleteEntry,
} from "./lib/storage";

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

export default function Home() {
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
    <div className="min-h-screen bg-black/10 text-zinc-100 flex flex-col items-center justify-start gap-6 p-6 md:p-12 font-sans" >
      {/* Decorative top element */}
      {/* <div className="w-full max-w-3xl flex justify-center mb-2">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
      </div> */}

      <div className="flex w-full max-w-3xl flex-col gap-8">
        {/* Elegant Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-mukta text-6xl md:text-4xl font-light text-zinc-100">सरमाया</h1>
          <p className="text-xs italic max-w-sm opacity-40">Where your feelings find poetry, and your words find solace.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-30 " />
        </div>

        {/* Main Writing Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-xl border border-zinc-800 p-4 transition-all"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm tracking-widest font-poppins opacity-80">
              {currentDate}
            </span>
            <span className="text-xs opacity-60">
              {currentTime}
            </span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-30" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="pour your heart out here…"
            rows={8}
            className="w-full resize-none rounded-lg p-2 font-light placeholder-opacity-100 text-zinc-400 outline-none font-serif"
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="self-end rounded-lg px-8 py-2 text-sm font-normal text-zinc-500 "
          >
            {sending ? "here we go…" : "Send"}
          </button>
        </form>

        {entries.length > 0 && (
          <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 p-6">
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-xs uppercase text-zinc-600">Me</span>
                <p className="mt-1 text-sm whitespace-pre-wrap font-poppins">
                  {entries[0].userMessage}
                </p>
              </div>

              {entries[0].reply && (
                <div className="border-t border-zinc-800 pt-4">
                  <span className="text-xs uppercase text-zinc-600">
                    Sarmaya
                  </span>

                  <p className="mt-1 whitespace-pre-wrap leading-relaxed italic text-zinc-300">
                    {entries[0].reply.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Entry History */}
        {!loadingEntries && entries.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10" />
              <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-300 whitespace-nowrap">
                ✦ Recent Entries ✦
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10" />

              <button
                onClick={handleDeleteAll}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {entries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <button
                    key={entry.id}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : entry.id)
                    }
                    className="flex flex-col gap-3 rounded-xl border border-zinc-800 p-5 text-left transition-all hover:border-zinc-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-medium opacity-70">
                        📖 {new Date(entry.timestamp).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <svg
                        className={`h-5 w-5 text-zinc-300 transition-transform ${isExpanded ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>

                    {isExpanded && (
                      <div className="flex flex-col gap-4 pt-2">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed font-poppins">
                          {entry.userMessage}
                        </p>
                        {entry.reply && (
                          <div className="border-t border-white border-opacity-10 pt-4 flex flex-col gap-2">
                            <span className="block text-xs font-medium uppercase tracking-widest text-zinc-400">
                              ✨
                            </span>
                            <p className="whitespace-pre-wrap text-md  font-poppins opacity-80 italic">
                              {entry.reply.message}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {loadingEntries && (
          <p className="text-center text-sm opacity-60 italic">Loading your memories…</p>
        )}
      </div>
    </div>
  );
}
