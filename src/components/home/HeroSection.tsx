import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Wand2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 40;
const PRELOAD_COUNT = 10;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Helper to format frame path
  const getFramePath = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/hero/frame_${frameNum}.webp`;
  }, []);

  // Draw current frame onto canvas with 'cover' aspect ratio
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  // Handle high-DPI resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  useEffect(() => {
    // Check mobile and reduced motion
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize canvas & frame preloader
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize image cache array
    imagesRef.current = new Array(TOTAL_FRAMES);

    // 1. Eagerly preload first 10 frames
    let loadedCount = 0;
    for (let i = 0; i < PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          setFirstFrameLoaded(true);
          renderFrame(0);
        }
        if (loadedCount === PRELOAD_COUNT) {
          // 2. Progressively load remaining frames in idle time
          loadRemainingFrames();
        }
      };
      imagesRef.current[i] = img;
    }

    function loadRemainingFrames() {
      for (let i = PRELOAD_COUNT; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        imagesRef.current[i] = img;
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getFramePath, handleResize, renderFrame]);

  // Setup GSAP ScrollTrigger for pinned canvas scrub
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * TOTAL_FRAMES)
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            renderFrame(targetFrame);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, renderFrame]);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | string, opts: { offset: number; duration: number }) => void } }).__lenis;
    const target = document.getElementById("how-it-works");
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        isMobile || prefersReducedMotion ? "min-h-screen py-24 sm:py-32" : "h-[220vh]"
      } bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] transition-colors duration-300`}
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Scrubbed Canvas (Desktop) */}
        {!isMobile && !prefersReducedMotion ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700"
            style={{ opacity: firstFrameLoaded ? 0.9 : 0 }}
          />
        ) : (
          /* Mobile / Reduced-Motion Fallback Image */
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <img
              src="/hero/frame_0040.webp"
              alt="Celebration scene"
              className="w-full h-full object-cover opacity-50 scale-105"
            />
          </div>
        )}

        {/* Soft Vignettes & Theme Gradients */}
        <div className="absolute inset-0 bg-radial-[ellipse_80%_80%_at_50%_50%] from-transparent via-[#d9faf4]/50 dark:via-[#0f2a2a]/60 to-[#d9faf4] dark:to-[#0f2a2a] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#d9faf4] dark:from-[#0f2a2a] via-[#d9faf4]/80 dark:via-[#0f2a2a]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#d9faf4] dark:from-[#0f2a2a] via-[#d9faf4]/80 dark:via-[#0f2a2a]/80 to-transparent pointer-events-none" />

        {/* Ambient Teal Glow Lights */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00bfa6]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00bfa6]/20 rounded-full blur-[160px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Top Pill Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.05] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00bfa6] animate-ping" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0f2a2a]/80 dark:text-[#d9faf4]/90 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#00bfa6]" />
              True Identity Preservation Core
            </span>
          </div>

          {/* Dynamic Staged Headline */}
          <div className="min-h-[220px] sm:min-h-[260px] flex flex-col items-center justify-center">
            {/* Stage 1: (0% - 35%) */}
            <div
              className={`transition-all duration-700 ${
                scrollProgress < 0.35 || isMobile
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-8 pointer-events-none absolute"
              }`}
            >
              <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.05]">
                A single portrait becomes a{" "}
                <span className="italic text-[#00bfa6] font-semibold">celebration.</span>
              </h1>
              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 font-normal leading-relaxed">
                Upload one photograph. Wishes AI synthesizes an authentic, cinematic
                celebration scene — keeping their true smile, spirit, and likeness intact.
              </p>
            </div>

            {/* Stage 2: (35% - 70%) */}
            {!isMobile && (
              <div
                className={`transition-all duration-700 ${
                  scrollProgress >= 0.35 && scrollProgress < 0.7
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 pointer-events-none absolute"
                }`}
              >
                <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.05]">
                  Authentic emotion.{" "}
                  <span className="italic text-[#00bfa6] font-semibold">Cinematic light.</span>
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 font-normal leading-relaxed">
                  Diwali twilight with glowing diyas, candlelit milestone birthdays,
                  or royal wedding floral arches. Zero generic AI distortion.
                </p>
              </div>
            )}

            {/* Stage 3: (70% - 100%) Final Call-to-Action */}
            <div
              className={`transition-all duration-700 ${
                scrollProgress >= 0.7 || isMobile
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 pointer-events-none absolute"
              }`}
            >
              <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.05]">
                Wishes that linger{" "}
                <span className="italic text-[#00bfa6] font-semibold">forever.</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 font-normal leading-relaxed">
                Handcrafted for personal milestones or scheduled across your entire company.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/create"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(0,191,166,0.4)] hover:shadow-[0_0_45px_rgba(0,191,166,0.65)] transition-all hover:scale-[1.03]"
                >
                  <Sparkles size={18} className="text-[#0f2a2a]" />
                  <span>Create Your Celebration Wish</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <button
                  onClick={handleLearnMore}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 bg-white/60 dark:bg-white/[0.04] text-[#0f2a2a] dark:text-[#d9faf4] text-sm font-semibold hover:border-[#00bfa6] hover:text-[#00bfa6] transition-all backdrop-blur-md cursor-pointer"
                >
                  <Wand2 size={15} className="text-[#00bfa6]" />
                  <span>See How It Works</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
