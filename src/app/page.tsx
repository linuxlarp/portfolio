// /src/app/page.tsx

'use client'

import { useEffect } from "react";
import { useTerminal } from "../components/TerminalContext";
import TerminalLine from "../components/Terminal";

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
  };

  return (
    <span className="inline-block w-12 text-center mr-2">
      [<span className={defaultColors[type]}>{status}</span>]
    </span>
  );
}

export default function Home() {
  const { 
    lines, 
    setLines, 
    currentLine, 
    setCurrentLine, 
    inputValue, 
    setInputValue, 
    handleCommand 
  } = useTerminal();

  useEffect(() => {
    const bootLines = [
      { text: "[    0.000000] Booting linuxlarp.dev", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.000012] Initializing core...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.000234] Loading kernel modules: hobbies, portfolio, linux, hosting, cloudflare", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.001872] Mounting /dev/portfolio...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.002521] Filesystem type: ext4", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.003433] Starting init process (PID 1)...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.004004] systemd[1]: Starting linuxlarp identity service...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.004812] systemd[1]: Started linuxlarp-daemon.service", className: "text-green-400", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.005410] Initializing terminal renderer...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.006923] Loading user modules: about, projects, contact, experience", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.007812] SSH daemon: listening on linuxlarp.dev:22", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.010001] linuxlarp: entering multi-user mode", className: "text-green-400 font-bold", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.011452] Welcome to linuxlarp.dev :: type `help` for commands", className: "text-blue-400", animated: true, statusComponent: null },
    ];
    setLines(bootLines);
  }, [setLines]);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    
    const currentLineData = lines[currentLine];
    
    if (!currentLineData.animated) {
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines, setCurrentLine]);

  return (
    <div className="min-h-screen bg-black font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {lines.map((line, index) =>
          index <= currentLine && (
            <div key={index} className="flex items-start">
              {line.image ? (
                <img src={line.image} alt="terminal-image" className="max-w-full mt-2 rounded" />
              ) : line.animated && line.text ? (
                <>
                  {line.statusComponent && currentLine > index && (
                    <span className="flex-shrink-0">{line.statusComponent}</span>
                  )}
                  <span className={line.className}>
                    <TerminalLine
                      text={line.text}
                      speed={70}
                      onComplete={() => setCurrentLine(index + 1)}
                    />
                  </span>
                </>
              ) : (
                <>
                  {line.statusComponent && (
                    <span className="flex-shrink-0">{line.statusComponent}</span>
                  )}
                  <span className={`${line.className} whitespace-pre-wrap break-words flex-1`}>
                    {line.text || '\u00A0'}
                  </span>
                </>
              )}
            </div>
          )
        )}
      
        {currentLine >= lines.length && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-400">guest@linuxlarp:~$</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommand(inputValue);
                }
              }}
              className="bg-transparent text-green-400 outline-none flex-1 font-mono"
              autoFocus
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}