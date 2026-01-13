// /src/app/page.tsx

'use client'

import { useEffect, useRef } from "react";
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

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, currentLine]);

  useEffect(() => {
    const bootLines = [
      { text: "[    0.000000] Booting linuxlarp.dev", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.000012] Initializing core...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.000234] Loading kernel modules: commands, network, portfolio, images, renderer", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
      { text: "[    0.001872] Mounting /home/larp/portfolio...", className: "text-white", animated: false, statusComponent: <ConstructStatus status="OK" type="ok" /> },
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

  // helper to convert inline %LINK:TITLE:URL% to anchor nodes
  const renderTextWithLinks = (txt: string) => {
    const regex = /%LINK:([^:]+?):([^%]+?)%/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    let key = 0;

    while ((m = regex.exec(txt)) !== null) {
      const idx = m.index;
      if (idx > lastIndex) {
        parts.push(txt.slice(lastIndex, idx));
      }
      parts.push(
        <a key={`link-${key++}`} href={m[2].trim()} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
          {m[1].trim()}
        </a>
      );
      lastIndex = idx + m[0].length;
    }

    if (lastIndex < txt.length) {
      parts.push(txt.slice(lastIndex));
    }

    return parts;
  };

  const renderTerminalLine = (line: typeof lines[0], index: number) => {
    const showStatus = line.statusComponent && currentLine > index;

    if (line.image) {
      return (
        <img src={line.image} alt="terminal-image" className="max-w-full mt-2 rounded" />
      );
    }

    if (line.link) {
      return (
        <>
          {line.statusComponent && <span className="flex-shrink-0">{line.statusComponent}</span>}
          <a
            href={line.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${line.className} underline`}
          >
            {line.link.title}
          </a>
        </>
      );
    }

    if (line.animated && line.text) {
      if (currentLine === index) {
        const typingText = line.text.replace(/%LINK:([^:]+?):([^%]+?)%/g, (_, title) => title);
        return (
          <>
            {showStatus && <span className="flex-shrink-0">{line.statusComponent}</span>}
            <span className={line.className}>
              <TerminalLine
                text={typingText}
                speed={70}
                onComplete={() => setCurrentLine(index + 1)}
              />
            </span>
          </>
        );
      }

      return (
        <>
          {line.statusComponent && <span className="flex-shrink-0">{line.statusComponent}</span>}
          <span className={`${line.className} whitespace-pre-wrap break-words flex-1`}>
            {renderTextWithLinks(line.text || '\u00A0')}
          </span>
        </>
      );
    }

    return (
      <>
        {line.statusComponent && <span className="flex-shrink-0">{line.statusComponent}</span>}
        <span className={`${line.className} whitespace-pre-wrap break-words flex-1`}>
          {renderTextWithLinks(line.text || '\u00A0')}
        </span>
      </>
    );
  };

  const renderCommandInput = () => {
    const { navigateHistory } = useTerminal();
    
    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-green-400">guest@linuxlarp:~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(inputValue);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              navigateHistory('down');
            }
          }}
          className="bg-transparent text-green-400 outline-none flex-1 font-mono"
          autoFocus
          spellCheck={false}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {lines.map((line, index) =>
          index <= currentLine && (
            <div key={index} className="flex items-start">
              {renderTerminalLine(line, index)}
            </div>
          )
        )}
        {currentLine >= lines.length && renderCommandInput()}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}