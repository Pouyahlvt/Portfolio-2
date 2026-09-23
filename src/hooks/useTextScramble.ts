// hooks/useTextScramble.ts
import { useCallback, useRef } from "react";
import gsap from "gsap";

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#$%&@~";

interface ScrambleOptions {
  /** Characters used for scrambling */
  chars?: string;
  /** Total animation duration in seconds */
  duration?: number;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Speed of reveal (lower = more frames) */
  speed?: number;
  /** Called when animation completes */
  onComplete?: () => void;
}

export const useTextScramble = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const scramble = useCallback(
    (element: HTMLElement, text: string, options: ScrambleOptions = {}) => {
      const {
        chars = DEFAULT_CHARS,
        duration = 1,
        delay = 0,
        speed = 1,
        onComplete,
      } = options;

      // Kill any previous animation on this element
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const length = text.length;
      const queue: Array<{
        from: string;
        to: string;
        start: number;
        end: number;
        char?: string;
      }> = [];

      const revealFrames = 20 * speed;

      for (let i = 0; i < length; i++) {
        const from = text[i];
        const to = text[i];
        const start = Math.floor(Math.random() * revealFrames);
        const end = start + Math.floor(Math.random() * revealFrames) + 10;
        queue.push({ from, to, start, end });
      }

      const obj = { frame: 0 };
      const maxFrame = Math.max(...queue.map((q) => q.end));

      timelineRef.current = gsap.timeline({
        delay,
        onUpdate: () => {
          let output = "";
          for (let i = 0; i < queue.length; i++) {
            const { from, to, start, end } = queue[i];
            let { char } = queue[i];

            if (obj.frame >= end) {
              output += to;
            } else if (obj.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = chars[Math.floor(Math.random() * chars.length)];
                queue[i].char = char;
              }
              output += `<span class="scramble-char">${char}</span>`;
            } else {
              output += from;
            }
          }
          element.innerHTML = output;
        },
        onComplete,
      });

      timelineRef.current.to(obj, {
        frame: maxFrame,
        duration,
        ease: "none",
      });
    },
    [],
  );

  const stop = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
  }, []);

  return { scramble, stop };
};
