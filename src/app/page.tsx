// /src/app/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useTerminal } from "../components/TerminalContext";
import TerminalLine from "../components/Terminal";

export default function Home() {
  const {
    lines,
    setLines,
    currentLine,
    setCurrentLine,
    inputValue,
    setInputValue,
    handleCommand,
  } = useTerminal();

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, currentLine]);

  useEffect(() => {
    const bootLines = [
      {
        text: "ROOT: clean, 314979/30736384 files, 14376676/122942464 blocks",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "runit: $Id: c6c9cea989d36a913fe0ed1212c01625813eb4 $: booting.",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "runit: enter stage: /etc/runit/1",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting sys filesystem",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting proc filesystem",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting dev filesystem",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting cgroups filesystem",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting filesystems",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting hostname",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Adjusting hwclock",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting kmod-static-nodes",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting tmpfiles-dev",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting udev daemon",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Triggering udev uevents",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Loading user-specified modules",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Waiting for udev uevents to be processed",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting console-setup",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting net-lo",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Checking filesystems",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Remounting root filesystem rw",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting mount-all",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Mounting /home/larp/portfolio (ext4)",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Activating swap",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting random-seed",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting tmpfiles-setup",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting sysusers",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Saving dmesg log",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Loading sysctl settings",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "fs.inotify.max_user_instances = 1024",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "fs.inotify.max_user_watches = 524288",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "vm.max_map_count = 1048576",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "net.ipv4.tcp_keepalive_time = 120",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Running binfmt",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Running binfmt.d",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Starting cleanup",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "  Initialization complete",
        className: "text-green-400",
        animated: false,
        statusComponent: null,
      },
      {
        text: "runit: leave stage: /etc/runit/1",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "runit: enter stage: /etc/runit/2",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "runsvdir: default: current.",
        className: "text-white",
        animated: false,
        statusComponent: null,
      },
      {
        text: "linuxlarp.dev (tty1)",
        className: "text-white font-bold",
        animated: false,
        statusComponent: null,
      },
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
        <a
          key={`link-${key++}`}
          href={m[2].trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          {m[1].trim()}
        </a>,
      );
      lastIndex = idx + m[0].length;
    }

    if (lastIndex < txt.length) {
      parts.push(txt.slice(lastIndex));
    }

    return parts;
  };

  const renderDropdown = (txt: string) => {
    // Begin working on this
    const regex = /%DROPDOWN:([^%]+?)%([\s\S]*?)%DROPDOWN%/g;
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
        <details key={`detail-${key++}`} className="">
          {m[1].trim()}
        </details>,
      );

      lastIndex = idx + m[0].length;
    }

    if (lastIndex < txt.length) {
      parts.push(txt.slice(lastIndex));
    }

    return parts;
  };

  const renderTerminalLine = (line: (typeof lines)[0], index: number) => {
    const showStatus = line.statusComponent && currentLine > index;

    if (line.image) {
      return (
        <img
          src={line.image}
          alt="terminal-image"
          className="max-w-full mt-2 rounded"
        />
      );
    }

    if (line.link) {
      return (
        <>
          {line.statusComponent && (
            <span className="flex-shrink-0">{line.statusComponent}</span>
          )}
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
        const typingText = line.text.replace(
          /%LINK:([^:]+?):([^%]+?)%/g,
          (_, title) => title,
        );
        return (
          <>
            {showStatus && (
              <span className="flex-shrink-0">{line.statusComponent}</span>
            )}
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
          {line.statusComponent && (
            <span className="flex-shrink-0">{line.statusComponent}</span>
          )}
          <span
            className={`${line.className} whitespace-pre-wrap break-words flex-1`}
          >
            {renderTextWithLinks(line.text || "\u00A0")}
          </span>
        </>
      );
    }

    return (
      <>
        {line.statusComponent && (
          <span className="flex-shrink-0">{line.statusComponent}</span>
        )}
        <span
          className={`${line.className} whitespace-pre-wrap break-words flex-1`}
        >
          {renderTextWithLinks(line.text || "\u00A0")}
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
            if (e.key === "Enter") {
              handleCommand(inputValue);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              navigateHistory("up");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              navigateHistory("down");
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
        {lines.map(
          (line, index) =>
            index <= currentLine && (
              <div key={index} className="flex items-start">
                {renderTerminalLine(line, index)}
              </div>
            ),
        )}
        {currentLine >= lines.length && renderCommandInput()}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
