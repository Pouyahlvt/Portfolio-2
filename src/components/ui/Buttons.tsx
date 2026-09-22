"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export type SignalButtonVariant = "primary" | "ghost" | "danger";
export type SignalButtonSize = "sm" | "md" | "lg";

export interface SignalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: SignalButtonVariant;
  size?: SignalButtonSize;
  /** How long the full turn-on "power bloom" cycle takes, seconds */
  cycleDuration?: number;
  /** Disable the hover animation */
  disableAnimation?: boolean;
}

/* ---------- Tailwind class maps ---------- */

const sizeClasses: Record<SignalButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-7 py-3 text-[13px]",
  lg: "px-10 py-4 text-[15px]",
};

const variantClasses: Record<SignalButtonVariant, string> = {
  primary:
    "text-[#7df9ff] border-[#7df9ff] hover:shadow-[0_0_20px_rgba(125,249,255,0.4),inset_0_0_16px_rgba(125,249,255,0.15)]",
  ghost: "text-[#e6e6e6] border-[#e6e6e6]/50",
  danger:
    "text-[#ff4d6d] border-[#ff4d6d] hover:shadow-[0_0_20px_rgba(255,77,109,0.4),inset_0_0_16px_rgba(255,77,109,0.15)]",
};

/* ---------- Component ---------- */

export const SignalButton: React.FC<SignalButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  cycleDuration = 2.4,
  disableAnimation = false,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null); // rolling scanline
  const beamRef = useRef<HTMLSpanElement>(null); // horizontal power-on beam
  const glowRef = useRef<HTMLSpanElement>(null); // phosphor bloom
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const startSignal = useCallback(() => {
    if (disableAnimation || !buttonRef.current) return;

    const button = buttonRef.current;
    const label = labelRef.current;
    const scan = scanRef.current;
    const beam = beamRef.current;
    const glow = glowRef.current;

    tlRef.current?.kill();
    gsap.killTweensOf([button, label, scan, beam, glow]);

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
    tlRef.current = tl;

    /* =========================================================
       PHASE 1 — Power-on: screen collapses to a thin horizontal
       line, then blooms back out vertically (CRT warm-up).
       ========================================================= */
    gsap.set(button, { opacity: 1, textShadow: "0 0 0 rgba(0,0,0,0)" });
    gsap.set(beam, { opacity: 1, scaleX: 0, scaleY: 1 });
    gsap.set(glow, { opacity: 0 });

    tl.fromTo(
      beam,
      { scaleX: 0, scaleY: 1, opacity: 1 },
      { scaleX: 1, duration: 0.18, ease: "power3.out" },
      0,
    )
      // the horizontal line blooms vertically into a full panel
      .to(
        beam,
        {
          scaleY: 40,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.18,
      )
      // label snaps in slightly after bloom
      .fromTo(
        label,
        { opacity: 0, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" },
        0.35,
      )
      // phosphor bloom flash
      .to(glow, { opacity: 0.6, duration: 0.08, ease: "none" }, 0.35)
      .to(glow, { opacity: 0, duration: 0.5, ease: "power2.out" }, 0.43);

    /* =========================================================
       PHASE 2 — Vertical hold wobble + rolling scanline.
       Runs continuously while hovered.
       ========================================================= */
    if (scan) {
      gsap.set(scan, { opacity: 0.9, yPercent: -100 });
      tl.to(
        scan,
        {
          yPercent: 220,
          duration: 1.1,
          ease: "none",
          repeat: -1,
        },
        0.6,
      );
    }

    /* =========================================================
       PHASE 3 — Signal instability: brief brightness flutters
       and horizontal jitter, mimicking weak reception.
       ========================================================= */
    tl.to(
      button,
      {
        keyframes: [
          { opacity: 0.85, x: -1, duration: 0.05 },
          { opacity: 1, x: 1, duration: 0.04 },
          { opacity: 0.7, x: -1, duration: 0.06 },
          { opacity: 1, x: 0, duration: 0.05 },
          { opacity: 0.95, x: 0, duration: 0.9 }, // settled gap
        ],
        ease: "none",
      },
      0.7,
    );

    /* =========================================================
       PHASE 4 — Chromatic aberration (RGB split) flicker.
       ========================================================= */
    tl.to(
      button,
      {
        textShadow:
          "0.6px 0 0 rgba(255,0,80,0.85), -0.6px 0 0 rgba(0,200,255,0.85)",
        duration: 0.06,
        ease: "none",
      },
      0.7,
    )
      .to(
        button,
        {
          textShadow:
            "-0.6px 0 0 rgba(255,0,80,0.85), 0.6px 0 0 rgba(0,200,255,0.85)",
          duration: 0.06,
          ease: "none",
        },
        0.76,
      )
      .to(
        button,
        {
          textShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.15,
          ease: "power1.out",
        },
        0.82,
      );

    // ensure the timeline loops with the full cycle length
    tl.duration(cycleDuration);
  }, [disableAnimation, cycleDuration]);

  const stopSignal = useCallback(() => {
    const button = buttonRef.current;
    const label = labelRef.current;
    const scan = scanRef.current;
    const beam = beamRef.current;
    const glow = glowRef.current;

    tlRef.current?.kill();
    tlRef.current = null;
    gsap.killTweensOf([button, label, scan, beam, glow]);

    // "power off" — collapse back into a horizontal line
    const off = gsap.timeline();
    off
      .to([glow, beam], { opacity: 0, duration: 0.1 }, 0)
      .to(
        button,
        {
          opacity: 1,
          x: 0,
          textShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.15,
          ease: "power2.out",
        },
        0,
      )
      .to(scan, { opacity: 0, duration: 0.1 }, 0)
      .fromTo(
        beam,
        { opacity: 1, scaleX: 1, scaleY: 40 },
        {
          scaleY: 1,
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
        },
        0.05,
      );
  }, []);

  useEffect(() => () => void tlRef.current?.kill(), []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    startSignal();
    onMouseEnter?.(e);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopSignal();
    onMouseLeave?.(e);
  };
  const handleFocus = () => startSignal();
  const handleBlur = () => stopSignal();

  /* ---------- Compose Tailwind classes ---------- */

  const baseClasses = [
    "relative inline-flex items-center justify-center",
    "border-2 bg-black",
    "font-mono font-bold tracking-[0.12em] uppercase",
    "cursor-pointer overflow-hidden isolate",
    "transition-[border-color,box-shadow] duration-200",
    "will-change-[opacity,text-shadow,transform]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7df9ff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "motion-reduce:[&>span[aria-hidden]]:hidden",
  ].join(" ");

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* Rolling scanline (moves vertically) */
  const scanClasses = [
    "pointer-events-none absolute inset-x-0 h-[8%] z-[2] opacity-0",
    "mix-blend-screen",
    "bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.55)_50%,transparent_100%)]",
  ].join(" ");

  /* Horizontal power-on beam (CRT collapse/expand line) */
  const beamClasses = [
    "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2",
    "h-[2px] w-full z-[3] opacity-0 origin-center",
    "bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.95)_50%,transparent_100%)]",
    "shadow-[0_0_12px_rgba(255,255,255,0.9)]",
  ].join(" ");

  /* Phosphor bloom flash */
  const glowClasses = [
    "pointer-events-none absolute inset-0 z-[1] opacity-0",
    "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35)_0%,transparent_70%)]",
    "mix-blend-screen",
  ].join(" ");

  return (
    <button
      ref={buttonRef}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}>
      {/* Phosphor bloom */}
      <span ref={glowRef} className={glowClasses} aria-hidden="true" />
      {/* Rolling scanline */}
      <span ref={scanRef} className={scanClasses} aria-hidden="true" />
      {/* Power-on horizontal beam */}
      <span ref={beamRef} className={beamClasses} aria-hidden="true" />
      {/* Label */}
      <span ref={labelRef} className="relative z-4">
        {children}
      </span>
    </button>
  );
};

export default SignalButton;
