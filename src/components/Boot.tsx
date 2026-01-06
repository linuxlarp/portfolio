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
    { text: "[    0.000000] Booting linuxlarp.dev", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.000012] Initializing core...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.000234] Loading kernel modules: hobbies, portfolio, linux, hosting, cloudflare", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.001872] Mounting /dev/portfolio...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.002521] Filesystem type: inspirationfs (rw, relatime)", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.003433] Starting init process (PID 1)...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.004004] systemd[1]: Starting linuxlarp identity service...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.004812] systemd[1]: Started linuxlarp-daemon.service", className: "text-green-400", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.005410] Initializing terminal renderer...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.006923] Loading user modules: about, projects, contact, experience", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.007812] SSH daemon: listening on linuxlarp.dev:22", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.010001] linuxlarp: entering multi-user mode", className: "text-green-400 font-bold", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
    { text: "[    0.011452] Welcome to linuxlarp.dev :: type `help` for commands", className: "text-blue-400", animated: true, statusComponent: null },
  ];


  const clearScreen = () => {
    setCleared(true);
    setCurrentLine(0);

    const bootSequenceElement = document.getElementById("boot-sequence");
    if (bootSequenceElement) {
      bootSequenceElement.innerHTML = '';
    }
  };

  if (cleared) return <div className="min-h-screen bg-black"></div>;

  return (
    <div className="min-h-screen bg-black font-mono p-8">
      <div className="max-w-4xl mx-auto" id="boot-sequence">
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
            <>
              <span> {line.statusComponent} {line.text}</span>
              {currentLine === index && (
              setTimeout(() => setCurrentLine(index + 1), 700)
              )}
            </>
              )}
            </div>
          )
        )}
        
      </div>
    </div>
  );
}