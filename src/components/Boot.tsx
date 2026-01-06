'use client'

import { useState } from "react";
import TerminalLine from "../components/Terminal"

interface ConstructStatusProps {
  status: string;
  type?: "ok" | "failed" | "warn" | "info";
}


function ConstructStatus({ status, type = "ok"}: ConstructStatusProps) {
    const defaultColors = {
        ok: "text-green-400",
        failed: "text-red-400",
        warn: "text-yellow-400",
        info: "text-blue-400"
    }

    return (
        <span className="text-white">
            [<span className={defaultColors[type]} >   {status}   </span>]
        </span>
    );
}

export default function BootSequence() {
  const [currentLine, setCurrentLine] = useState(0);
  const [cleared, setCleared] = useState(false);

  const lines = [
    { 
      text: "[    0.000000] Booting system...",
      statusComponent: <ConstructStatus status="OK" type="ok"/>,
      className: "text-white",
      animated: false
    },

    { 
      text: "[    0.000000] Loading kernel modules...",
      statusComponent: <ConstructStatus status="OK" type="ok"/>,
      className: "text-white",
      animated: false
    },    
  ];

  const clearScreen = () => {
    setCleared(true);
    setTimeout(() => {
      setCurrentLine(0);
      setCleared(false);
    }, 100);
  };

  if (cleared) return <div className="min-h-screen bg-black"></div>;

  return (
    <div className="min-h-screen bg-black font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {lines.map((line, index) =>
          index <= currentLine && (
            <div key={index} className={`${line.className} flex items-center gap-2`}>
              {line.animated ? (
            <>
              {line.statusComponent && currentLine > index && line.statusComponent}
              <TerminalLine
                text={line.text}
                speed={70}
                onComplete={() => setCurrentLine(index + 1)}
              />
            </>
              ) : (
            <span> {line.statusComponent} {line.text}</span> 
              )}
            </div>
          )
        )}
        
        {currentLine >= lines.length && (
          <button 
            onClick={clearScreen}
            className="mt-4 text-green-400 hover:text-green-300"
          >
            clear
          </button>
        )}
      </div>
    </div>
  );
}