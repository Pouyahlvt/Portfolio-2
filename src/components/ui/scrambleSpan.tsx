// components/ScrambleText.tsx
"use client";

import { useRef } from "react";
import { useTextScramble } from "@/src/hooks/useTextScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({
  text,
  className = "",
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scramble } = useTextScramble();

  const handleHover = () => {
    if (!ref.current) return;
    scramble(ref.current, text);
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleHover}
      className={className}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}
