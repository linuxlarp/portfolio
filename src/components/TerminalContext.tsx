// /src/components/TerminalContext.tsx

"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { commandOutputs } from "./CommandOutputs";

interface TerminalLine {
  text?: string;
  image?: string;
  className?: string;
  animated?: boolean;
  statusComponent?: ReactNode;
  link?: { title: string; href: string };
}

interface TerminalContextType {
  lines: TerminalLine[];
  setLines: (lines: TerminalLine[]) => void;
  addLine: (line: TerminalLine) => void;
  clearLines: () => void;
  currentLine: number;
  setCurrentLine: (line: number) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleCommand: (command: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  navigateHistory: (direction: "up" | "down") => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined,
);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addLine = (line: TerminalLine) => {
    setLines((prev) => [...prev, line]);
  };

  const clearLines = () => {
    setLines([]);
    setCurrentLine(0);
  };

  const navigateHistory = (direction: "up" | "down") => {
    if (commandHistory.length === 0) return;

    if (direction === "up") {
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    } else {
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    }
  };

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }

    addLine({
      text: `guest@linuxlarp.dev:~$ ${command}`,
      className: "text-green-400",
      animated: false,
    });

    if (cmd === "clear") {
      setTimeout(() => clearLines(), 100);
    } else if (cmd === "help" || command == "") {
      addLine({
        text: `

Available commands are:
help - Displays this message
clears - Clears all messages in the TerminalContext
about - Displays about me of linuxlarp
projects - Shows a list of my projects you can view by typing each individual name in
skills - Shows my skillset of languages, tools and platforms
contact - Shows where you can contact me and social media platforms
source - Shows source code of this repo
exit - Exit this website
whoami - Shows the currently authenticated useTerminal
hostname - Shows the hostname of this site.
hardware - Shows my hardware and setup
status - Refers you to the status page of LARPED_ Technologies.

`,
        className: "text-white",
        animated: false,
      });

      addLine({
        text: `
Available sub-commands are:
about linux - Display my Linux setups (Desktop, Server)

`,
        className: "text-white",
        animated: false,
      });
    } else if (commandOutputs[cmd]) {
      commandOutputs[cmd].forEach((line) => {
        addLine(line);
      });
    } else if (cmd === "") {
      // Do nothing, it gets quiet in here. Dont you think? (Also redirects to help)
      //
      //
    } else if (cmd == "exit") {
      for (let step = 5; step > 0; step--) {
        setTimeout(
          () => {
            addLine({
              text: `Self destructing in ${step}...`,
              className: "text-red-400",
              animated: true,
            });

            if (step === 1) {
              setTimeout(() => {
                window.location.href = "about:blank";
              }, 2000);
            }
          },
          (5 - step) * 1000,
        );
      }
    } else if (cmd == "secret") {
      window.location.href = "https://youtu.be/xvFZjo5PgG0?si=iWqmbHQn8fRhZ2e2";
    } else {
      addLine({
        text: `bash: ${command}: command not found`,
        className: "text-red-400",
        animated: false,
      });
    }

    setInputValue("");
  };

  return (
    <TerminalContext.Provider
      value={{
        lines,
        setLines,
        addLine,
        clearLines,
        currentLine,
        setCurrentLine,
        inputValue,
        setInputValue,
        handleCommand,
        commandHistory,
        historyIndex,
        setHistoryIndex,
        navigateHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context)
    throw new Error("useTerminal must be used within TerminalProvider");
  return context;
}
