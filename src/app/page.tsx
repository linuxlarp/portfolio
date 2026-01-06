'use client';
import { useState } from "react";
import TerminalLine from "../components/Terminal";
import BootSequence from "../components/Boot"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
          <BootSequence/>
      </div>
    </div>
  );
}
