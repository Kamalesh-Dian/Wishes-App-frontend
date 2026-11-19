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

  const getFramePath = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/hero/frame_${frameNum}.webp`;
  }, []);

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

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    imagesRef.current = new Array(TOTAL_FRAMES);

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

  const activeStage = isMobile || prefersReducedMotion
    ? 0
    : scrollProgress < 0.35
      ? 0
      : scrollProgress < 0.7
        ? 1
        : 2;

  return (
    <section
      ref={containerRef}
      aria-label="Wishes AI Hero"
      className={`relative w-full ${
        isMobile || prefersReducedMotion ? "min-h-screen py-24 sm:py-28" : "h-[230vh]"
      } bg-[#d9faf4] dark:bg-[#0f2a2a] text-[#0f2a2a] dark:text-[#d9faf4] transition-colors duration-300`}
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cohesive Visual Fallback Layer (Never Empty) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="/hero/frame_0020.webp"
            alt="Atmospheric night-market celebration backdrop"
            className="w-full h-full object-cover opacity-35 dark:opacity-55 scale-105"
          />
        </div>

        {/* Scrubbed 40-Frame Canvas (Desktop) */}
        {!isMobile && !prefersReducedMotion && (
          <canvas
            ref={canvasRef}
            aria-label="Interactive celebration frame sequence"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700"
            style={{ opacity: firstFrameLoaded ? 0.85 : 0 }}
          />
        )}

        {/* Editorial Vignettes & Night-Market Coral/Teal Glows */}
        <div className="absolute inset-0 bg-radial-[ellipse_80%_80%_at_50%_50%] from-transparent via-[#d9faf4]/55 dark:via-[#0f2a2a]/65 to-[#d9faf4] dark:to-[#0f2a2a] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#d9faf4] dark:from-[#0f2a2a] via-[#d9faf4]/80 dark:via-[#0f2a2a]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#d9faf4] dark:from-[#0f2a2a] via-[#d9faf4]/80 dark:via-[#0f2a2a]/80 to-transparent pointer-events-none" />

        {/* Restrained Coral-Red & Teal Ambient Lantern Glows */}
        <div className="absolute top-1/4 -left-16 w-96 h-96 bg-[#FF5A52]/15 dark:bg-[#FF5A52]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-[#00bfa6]/20 rounded-full blur-[160px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 pt-16 flex flex-col items-center text-center">
          {/* Small Uppercase Editorial Label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/75 dark:bg-white/[0.06] border border-[#0f2a2a]/10 dark:border-[#d9faf4]/15 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5A52] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#0f2a2a]/85 dark:text-[#d9faf4]/90 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#00bfa6]" />
              Identity-Preserving Celebration Studio
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5A52]/15 text-[#FF5A52] font-bold">
              FRAME {String(Math.min(TOTAL_FRAMES, Math.floor(scrollProgress * TOTAL_FRAMES) + 1)).padStart(2, "0")}/40
            </span>
          </div>

          {/* Three Staged Headlines */}
          <div className="relative min-h-[170px] sm:min-h-[195px] w-full max-w-4xl flex flex-col items-center justify-center">
            {/* Stage 1 (0% - 35%) */}
            <div
              className={`transition-all duration-500 ${
                activeStage === 0
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-6 pointer-events-none absolute inset-0"
              }`}
            >
              <h1 className="font-sans text-[clamp(2.3rem,5.8vw,4.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.06]">
                Turn one candid portrait into a{" "}
                <span className="text-[#00bfa6]">celebration</span>{" "}
                <span className="underline decoration-[#FF5A52]/70 decoration-wavy underline-offset-8">
                  scene.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-normal leading-relaxed">
                Upload a single photograph. Wishes AI stages festive night-market lanterns, royal arches,
                and candlelit soirées while preserving 100% of their true facial identity.
              </p>
            </div>

            {/* Stage 2 (35% - 70%) */}
            <div
              className={`transition-all duration-500 ${
                activeStage === 1
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
              }`}
            >
              <h2 className="font-sans text-[clamp(2.3rem,5.8vw,4.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.06]">
                Editorial warmth.{" "}
                <span className="text-[#FF5A52]">Festival light.</span>{" "}
                <span className="text-[#00bfa6]">Zero distortion.</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-normal leading-relaxed">
                From glowing Diwali diyas and milestone birthdays to palace wedding sangeets—ray-traced
                illumbering harmonizes naturally with skin tones and silk attire.
              </p>
            </div>

            {/* Stage 3 (70% - 100%) */}
            <div
              className={`transition-all duration-500 ${
                activeStage === 2
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
              }`}
            >
              <h2 className="font-sans text-[clamp(2.3rem,5.8vw,4.9rem)] font-extrabold tracking-tight text-[#0f2a2a] dark:text-[#d9faf4] leading-[1.06]">
                Keepsakes that linger{" "}
                <span className="text-[#00bfa6]">forever</span>{" "}
                <span className="text-[#FF5A52]">in 4K.</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[#0f2a2a]/75 dark:text-[#d9faf4]/75 font-normal leading-relaxed">
                Crafted in 60 seconds for personal milestones or dispatched automatically across your
                organization via OneDrive roster sync.
              </p>
            </div>
          </div>

          {/* Primary Actions (Always Accessible) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/create"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00bfa6] text-[#0f2a2a] font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(0,191,166,0.38)] hover:shadow-[0_12px_42px_rgba(0,191,166,0.6)] transition-all hover:scale-[1.03]"
            >
              <Sparkles size={17} className="text-[#0f2a2a]" />
              <span>Create Wish</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/20 bg-white/75 dark:bg-white/[0.06] text-[#0f2a2a] dark:text-[#d9faf4] text-sm font-semibold hover:border-[#FF5A52] hover:text-[#FF5A52] transition-all backdrop-blur-md cursor-pointer"
            >
              <Wand2 size={15} className="text-[#FF5A52]" />
              <span>Explore Process</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
