"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

interface InteractiveCTAProps {
  heading: string;
  description: string;
  buttonText: string;
  href: string;
}

const PARTICLE_COUNT = 18;

export function InteractiveCTA({
  heading,
  description,
  buttonText,
  href,
}: InteractiveCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const particlesControl = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 5 + Math.random() * 90,
      size: 1 + Math.random() * 1.5,
    }))
  );

  const getButtonTarget = useCallback(() => {
    if (!containerRef.current || !buttonRef.current) return null;
    const cr = containerRef.current.getBoundingClientRect();
    const br = buttonRef.current.getBoundingClientRect();
    return {
      x: br.left + br.width / 2 - cr.left,
      y: br.top + br.height / 2 - cr.top,
      cw: cr.width,
      ch: cr.height,
    };
  }, []);

  const handleHoverStart = useCallback(() => {
    const target = getButtonTarget();
    if (!target) return;
    setIsHovering(true);

    particlesControl.start((i) => {
      const px = (particles[i].left / 100) * target.cw;
      const py = (particles[i].top / 100) * target.ch;
      return {
        x: (target.x - px) * 0.7,
        y: (target.y - py) * 0.7,
        opacity: 0.6,
        transition: {
          type: "spring",
          stiffness: 25,
          damping: 12,
          delay: i * 0.015,
        },
      };
    });
  }, [particlesControl, particles, getButtonTarget]);

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);
    particlesControl.start((i) => ({
      x: 0,
      y: 0,
      opacity: 0.2,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 18,
        delay: i * 0.01,
      },
    }));
  }, [particlesControl]);

  const handleMouseDown = useCallback(() => {
    const target = getButtonTarget();
    if (!target) return;

    particlesControl.start((i) => {
      const px = (particles[i].left / 100) * target.cw;
      const py = (particles[i].top / 100) * target.ch;
      return {
        x: (target.x - px) * 0.95 + (Math.random() - 0.5) * 8,
        y: (target.y - py) * 0.95 + (Math.random() - 0.5) * 8,
        opacity: 0.8,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 8,
        },
      };
    });
  }, [particlesControl, particles, getButtonTarget]);

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Corner marks */}
      <Plus
        className="absolute -top-3 -left-3 z-10 h-6 w-6 text-white/20"
        strokeWidth={1}
      />
      <Plus
        className="absolute -top-3 -right-3 z-10 h-6 w-6 text-white/20"
        strokeWidth={1}
      />
      <Plus
        className="absolute -bottom-3 -left-3 z-10 h-6 w-6 text-white/20"
        strokeWidth={1}
      />
      <Plus
        className="absolute -bottom-3 -right-3 z-10 h-6 w-6 text-white/20"
        strokeWidth={1}
      />

      {/* Vertical side rules */}
      <div className="pointer-events-none absolute -inset-y-6 left-0 w-px border-l border-overlay-border-light" />
      <div className="pointer-events-none absolute -inset-y-6 right-0 w-px border-r border-overlay-border-light" />

      {/* Center dashed rule */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full border-l border-dashed border-overlay-border-light opacity-50" />

      {/* Main container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden border-y border-overlay-border-light bg-[radial-gradient(35%_80%_at_25%_0%,rgba(255,255,255,0.04),transparent)] px-6 py-12"
      >
        {/* Particle field */}
        <div className="pointer-events-none absolute inset-0">
          {particles.map((p, i) => (
            <motion.div
              key={p.id}
              custom={i}
              initial={{ x: 0, y: 0, opacity: 0.2 }}
              animate={particlesControl}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
              }}
              className="absolute rounded-full bg-white"
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="heading-xl text-center">{heading}</h2>
            <p className="mx-auto max-w-2xl text-center text-lg text-muted">
              {description}
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              ref={buttonRef}
              href={href}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              onMouseDown={handleMouseDown}
              className={`inline-flex items-center gap-3 px-8 py-4 font-medium transition-smooth ${
                isHovering
                  ? "bg-white text-black scale-[1.02]"
                  : "bg-white text-black hover:bg-white/90 hover:scale-[1.02]"
              }`}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
