// /src/components/CommandOutputs.tsx
import { ReactNode } from "react";
import generatedOutputs from "../generated/commandOutputs.json";

interface CommandOutput {
  text?: string;
  image?: string;
  animated?: boolean;
  statusComponent?: ReactNode;
  link?: { title: string; href: string };
  className?: string;
}

function parseOutput(
  text: string,
  className = "text-white",
  animated = false,
): CommandOutput[] {
  return text.split("\n").map((line) => {
    const linkFullMatch = line.match(/^%LINK:([^:]+):(.+)%$/);
    if (linkFullMatch) {
      return {
        link: { title: linkFullMatch[1].trim(), href: linkFullMatch[2].trim() },
        className,
      };
    }

    const imageMatch = line.match(/^%IMAGE:(.+)%$/);
    if (imageMatch) {
      return {
        image: imageMatch[1].trim(),
        className,
      };
    }

    return {
      text: line === "" ? "\u00A0" : line,
      className,
      animated,
    };
  });
}

export const commandOutputs: Record<string, CommandOutput[]> = Object.entries(
  generatedOutputs,
).reduce(
  (acc, [key, text]) => {
    acc[key] = parseOutput(text as string);
    return acc;
  },
  {} as Record<string, CommandOutput[]>,
);
