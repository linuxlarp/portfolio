'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalLine {
  text: string;
  className?: string;
  animated?: boolean;
  statusComponent?: ReactNode;
}

interface TerminalContextType {
  lines: TerminalLine[];
  setLines: (lines: TerminalLine[]) => void;
  addLine: (line: TerminalLine) => void;
  clearLines: () => void;
  currentLine: number;
  setCurrentLine: (line: number) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const addLine = (line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  };

  const clearLines = () => {
    setLines([]);
    setCurrentLine(0);
  };

  const handleCommand = (command: string ) => {
    const cmd = command.trim().toLowerCase()

    addLine({
      text: `user@linuxlarp~$ ${command}`,
      className: "text-green-400",
      animated: false
    })


    // TEMPORARY LOGIC FOR COMMANDS
    if (cmd == 'clear') {
      setTimeout(() => clearLines(), 100);
    }
    else if (cmd === 'help') {
      addLine({
        text: "Available commands are: help, clear, about, projects, fastfetch, contact",
        className: "text-white",
        animated: false,
      })
    };
    
  }

  return (
    <TerminalContext.Provider value={{ 
      lines, 
      setLines, 
      addLine, 
      clearLines, 
      currentLine, 
      setCurrentLine
    }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) throw new Error('useTerminal must be used within TerminalProvider');
  return context;
}