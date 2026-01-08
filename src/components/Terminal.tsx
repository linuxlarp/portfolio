// Components/Terminal.tsx

import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

interface TerminalLineProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export default function TerminalLine({ text = "", delay = 0, speed = 50, onComplete }: TerminalLineProps) {
  return (
    <TypeAnimation
      sequence={[
        delay,
        text,
        () => onComplete && onComplete()
      ]}
      wrapper="div"
      speed={speed as any}
      cursor={false}
    />
  );
}