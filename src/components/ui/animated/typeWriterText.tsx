// components/TypewriterText.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  /** ms between each character. Lower = faster. Default 50 */
  speed?: number;
  /** delay before typing starts, in ms */
  delay?: number;
  /** loop the animation forever */
  loop?: boolean;
  /** pause after finishing before looping/restarting, in ms */
  pause?: number;
  /** show a blinking cursor */
  cursor?: boolean;
}

export default function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  loop = false,
  pause = 1000,
  cursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // reset on text change
    indexRef.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed("");
    setDone(false);

    const type = () => {
      if (indexRef.current >= text.length) {
        setDone(true);
        if (loop) {
          const t = setTimeout(() => {
            indexRef.current = 0;
            setDisplayed("");
            setDone(false);
            type();
          }, pause);
          timeouts.current.push(t);
        }
        return;
      }

      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      const t = setTimeout(type, speed);
      timeouts.current.push(t);
    };

    const start = setTimeout(type, delay);
    timeouts.current.push(start);

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [text, speed, delay, loop, pause]);

  return (
    <span
      className={className}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
      {displayed}
      {cursor && !done && (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
      {cursor && done && loop && (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
}
