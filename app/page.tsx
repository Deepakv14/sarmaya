"use client";

import { useState } from "react";

import JournalsPage from "./components/journals";
import Memoirs from "./components/memoirs";
import BottomNav from "./components/bottom-nav";
import { Sarabun } from "next/font/google";
import Sarmaya from "./components/sarmaya";
import Header from "./components/Header";

export type Tab =
  | "journals"
  | "memoirs"
  | "write"
  | "saved"
  | "profile"
  | "sarmaya";

export type Props = {
  setActiveTab: (
    tab:
      | "journals"
      | "memoirs"
      | "write"
      | "saved"
      | "profile"
      | "sarmaya"
  ) => void;
};

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<Tab>("write");

  return (
    <>
      <Header heading={activeTab.toWellFormed()} />
      <div className="overflow-hidden">
        {activeTab === "write" && (
          <JournalsPage setActiveTab={setActiveTab} />
        )}

        {activeTab === "memoirs" && (
          <Memoirs setActiveTab={setActiveTab} />
        )}

        {activeTab === "sarmaya" && (
          <Sarmaya setActiveTab={setActiveTab} />
        )}

        <BottomNav
          current="journals"
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
}