// components/ScrambleButton.tsx
"use client";

import React, { useRef, useCallback, ReactNode } from "react";
import { useTextScramble } from "@/src/hooks/useTextScramble";

type ButtonSize = "sm" | "md" | "lg";

interface ScrambleButtonProps {
  children: string; // Text content (required for scramble effect)
  onClick?: () => void;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  as?: "button" | "a";
  href?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  children,
  onClick,
  size = "md",
  className = "",
  disabled = false,
  icon,
  iconPosition = "right",
  as = "button",
  href,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);
  const { scramble } = useTextScramble();

  const handleMouseEnter = useCallback(() => {
    if (disabled || isAnimating.current || !textRef.current) return;
    isAnimating.current = true;

    scramble(textRef.current, children);

    // Reset flag after animation completes
    setTimeout(() => {
      isAnimating.current = false;
    }, 1100);
  }, [children, disabled, scramble]);

  const baseClasses = `
    relative inline-flex items-center justify-center 
    overflow-hidden font-vt323
    ${sizeClasses[size]}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      <span
        ref={textRef}
        className="relative inline-block whitespace-nowrap font-mono tracking-wide"
        style={{ minWidth: `${children.length}ch` }}>
        {children}
      </span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (as === "a" && href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onMouseEnter={handleMouseEnter}
        aria-disabled={disabled}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      className={baseClasses}>
      {content}
    </button>
  );
};

export default ScrambleButton;
