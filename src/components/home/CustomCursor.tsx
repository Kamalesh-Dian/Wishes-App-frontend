import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(-100, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(-100, { damping: 28, stiffness: 350 });
  const ringX = useSpring(-100, { damping: 20, stiffness: 180 });
  const ringY = useSpring(-100, { damping: 20, stiffness: 180 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[data-cursor]") ||
        target?.tagName === "INPUT"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden transition-opacity duration-300">
      {/* Central crisp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#F5B24A] shadow-[0_0_8px_#F5B24A]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing golden aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#F5B24A]/40 bg-[#F5B24A]/5 transition-[width,height,background-color] duration-200"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? "rgba(245, 178, 74, 0.12)" : "rgba(245, 178, 74, 0.03)",
          borderColor: isHovered ? "rgba(245, 178, 74, 0.8)" : "rgba(245, 178, 74, 0.35)",
        }}
      />
    </div>
  );
}
