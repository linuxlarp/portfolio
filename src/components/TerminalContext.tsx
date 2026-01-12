// /src/components/TerminalContext.tsx

'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { commandOutputs } from './CommandOutputs';

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
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const addLine = (line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  };

  const clearLines = () => {
    setLines([]);
    setCurrentLine(0);
  };

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    
    addLine({
      text: `guest@linuxlarp:~$ ${command}`,
      className: "text-green-400",
      animated: false
    });

    if (cmd === 'clear') {
      setTimeout(() => clearLines(), 100);
    }
    else if (cmd === 'help') {
      addLine({
        text: "Available commands are: help, clear, about, projects, fastfetch, contact",
        className: "text-white",
        animated: false,
      });
    }

    else if (commandOutputs[cmd]) {
      commandOutputs[cmd].forEach(line => {
        addLine(line);
      });
    }


    else if (cmd === '') {
      // Do nothing, it gets quiet in here. Dont you think?
    }
    
    else {
      addLine({
        text: `bash: ${command}: command not found`,
        className: "text-red-400",
        animated: false
      });
    }

    setInputValue('');
  };

  return (
    <TerminalContext.Provider value={{ 
      lines, 
      setLines, 
      addLine, 
      clearLines, 
      currentLine, 
      setCurrentLine,
      inputValue,
      setInputValue,
      handleCommand,
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