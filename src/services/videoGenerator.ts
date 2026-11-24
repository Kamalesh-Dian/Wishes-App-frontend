import api from "./api";

export type VideoMotionStyle = "cinematic-bokeh" | "confetti-party" | "diya-lanterns";

export interface GenerateVideoOptions {
  imageUrl: string;
  occasion: string;
  theme?: string;
  customMessage?: string;
  people?: string[];
  decorations?: string[];
  additionalInformation?: string;
  prompt?: string;
  style?: VideoMotionStyle;
  durationMs?: number;
  aiEngine?: "video-model" | "svd" | "gemini";
  onProgress?: (percent: number) => void;
}

export interface GeneratedVideoResult {
  url: string;
  blob?: Blob;
  filename: string;
  mimeType: string;
  model?: string;
}

/**
 * Primary Video Generation: Calls the AI Video Diffusion Model backend API
 */
export async function synthesizeCelebrationVideo(
  options: GenerateVideoOptions
): Promise<GeneratedVideoResult> {
  const {
    imageUrl,
    occasion,
    theme = "",
    customMessage = "",
    people = [],
    decorations = [],
    additionalInformation = "",
    prompt = "",
    style = "cinematic-bokeh",
    durationMs = 8000,
    onProgress,
  } = options;

  const durationSec = Math.min(8, Math.max(4, Math.round(durationMs / 1000)));

  if (onProgress) onProgress(20);

  try {
    const response = await api.post(
      "/generate/video",
      {
        imageUrl,
        occasion,
        theme,
        customMessage,
        people,
        decorations,
        additionalInformation,
        prompt,
        duration: durationSec,
        motionStyle: style,
        aiEngine: options.aiEngine || "video-model",
      },
      {
        timeout: 180000,
      }
    );

    if (onProgress) onProgress(90);

    const data = response.data;
    if (!data?.success || !data?.videoUrl) {
      throw new Error(data?.error || "AI Video Model returned invalid response");
    }

    const videoUrl = data.videoUrl;
    let videoBlob: Blob | undefined = undefined;

    try {
      const blobRes = await fetch(videoUrl);
      if (blobRes.ok) {
        videoBlob = await blobRes.blob();
      }
    } catch {
      // Direct stream or CORS
    }

    if (onProgress) onProgress(100);

    const filename = `wishes-ai-${(occasion || "celebration")
      .toLowerCase()
      .replace(/\s+/g, "-")}-${Date.now()}.mp4`;

    return {
      url: videoUrl,
      blob: videoBlob,
      filename,
      mimeType: data.mimeType || "video/mp4",
      model: data.model || "Stable Video Diffusion (AI Model)",
    };
  } catch (modelErr) {
    console.warn(
      "AI Video Model request failed, falling back to local synthesis:",
      modelErr
    );
    return await synthesizeCelebrationVideoLocal(options);
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rot: number;
  vRot: number;
  isRibbon: boolean;
}

/**
 * Fallback Local Video Synthesizer
 */
export async function synthesizeCelebrationVideoLocal(
  options: GenerateVideoOptions
): Promise<GeneratedVideoResult> {
  const {
    imageUrl,
    occasion,
    theme = "",
    customMessage = "",
    style = "cinematic-bokeh",
    durationMs = 8000,
    onProgress,
  } = options;

  // Clamp duration to between 4s (4000ms) and 8s (8000ms)
  const effectiveDurationMs = Math.min(8000, Math.max(4000, durationMs));

  // 1. Load source image with CORS
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.crossOrigin = "anonymous";
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Failed to load source image for video synthesis"));
    el.src = imageUrl;
  });

  const width = 960;
  const height = 720;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }

  // 2. Pick supported MediaRecorder mimeType
  const mimeCandidates = [
    "video/mp4;codecs=avc1",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  const selectedMime =
    mimeCandidates.find((m) =>
      typeof MediaRecorder !== "undefined" ? MediaRecorder.isTypeSupported(m) : false
    ) || "video/webm";

  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 4_500_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  const recordingPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: selectedMime });
      resolve(blob);
    };
    recorder.onerror = (err) => reject(err);
  });

  // 3. Initialize particles based on chosen style
  const palette =
    style === "diya-lanterns"
      ? ["#FF5A52", "#F5B24A", "#FFD166", "#FF9F1C"]
      : style === "confetti-party"
        ? ["#00BFA6", "#FF5A52", "#F5B24A", "#A78BFA", "#38BDF8"]
        : ["#00BFA6", "#F5B24A", "#D9FAF4", "#FF5A52"];

  const particleCount = style === "confetti-party" ? 55 : 36;
  const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
    x: ((i * 73) % width),
    y: ((i * 59) % height),
    vx: (Math.sin(i * 3.1) * 1.2),
    vy: style === "confetti-party" ? 1.8 + (i % 4) * 0.7 : -(0.9 + (i % 4) * 0.5),
    size: style === "confetti-party" ? 6 + (i % 5) * 2 : 5 + (i % 6) * 3.5,
    color: palette[i % palette.length],
    alpha: 0.35 + (i % 5) * 0.12,
    rot: (i * 45) % 360,
    vRot: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4)),
    isRibbon: style === "confetti-party" && i % 2 === 0,
  }));

  recorder.start(100);

  const fps = 30;
  const totalFrames = Math.max(60, Math.round((effectiveDurationMs / 1000) * fps));
  const frameInterval = 1000 / fps;

  // Aspect-cover base dimensions
  const imgAspect = img.naturalWidth / (img.naturalHeight || 1);
  const canvasAspect = width / height;
  let drawW = width;
  let drawH = height;
  if (imgAspect > canvasAspect) {
    drawH = height;
    drawW = height * imgAspect;
  } else {
    drawW = width;
    drawH = width / imgAspect;
  }

  for (let frame = 0; frame < totalFrames; frame++) {
    const t = frame / (totalFrames - 1); // 0..1

    // Smooth Ken Burns zoom + gentle pan
    const zoom = 1.0 + 0.09 * Math.sin(t * Math.PI * 0.5);
    const panX = Math.sin(t * Math.PI) * 14;
    const panY = Math.cos(t * Math.PI) * 8;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Draw zoomed image centered
    ctx.translate(width / 2 + panX, height / 2 + panY);
    ctx.scale(zoom, zoom);
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Subtle cinematic vignette & warm light pulse
    const pulseAlpha = 0.14 + 0.08 * Math.sin(t * Math.PI * 3);
    const radial = ctx.createRadialGradient(
      width * 0.5,
      height * 0.35,
      50,
      width * 0.5,
      height * 0.5,
      width * 0.75
    );
    radial.addColorStop(0, `rgba(245, 178, 74, ${pulseAlpha.toFixed(3)})`);
    radial.addColorStop(0.6, "rgba(0, 191, 166, 0.05)");
    radial.addColorStop(1, "rgba(9, 22, 22, 0.45)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // Update & render particles
    for (const p of particles) {
      p.x += p.vx + Math.sin(t * 6 + p.size) * 0.4;
      p.y += p.vy;
      p.rot += p.vRot;

      if (p.y < -25) p.y = height + 20;
      if (p.y > height + 25) p.y = -20;
      if (p.x < -25) p.x = width + 20;
      if (p.x > width + 25) p.x = -20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(t * 10 + p.x));
      ctx.fillStyle = p.color;

      if (p.isRibbon) {
        ctx.fillRect(-p.size, -p.size * 0.35, p.size * 2, p.size * 0.7);
      } else {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Animated bottom celebration caption overlay
    const bannerSlide = Math.min(1, t * 4);
    const bannerY = height - 92 + (1 - bannerSlide) * 35;

    ctx.save();
    ctx.globalAlpha = bannerSlide * 0.92;
    ctx.fillStyle = "rgba(11, 31, 31, 0.78)";
    ctx.strokeStyle = "rgba(0, 191, 166, 0.55)";
    ctx.lineWidth = 1.5;

    const boxX = 48;
    const boxW = width - 96;
    const boxH = 68;
    const r = 20;
    ctx.beginPath();
    ctx.roundRect(boxX, bannerY, boxW, boxH, r);
    ctx.fill();
    ctx.stroke();

    // Occasion Pill Text
    ctx.fillStyle = "#00BFA6";
    ctx.font = "bold 12px sans-serif";
    const headerLabel = `${(occasion || "Celebration").toUpperCase()}${
      theme ? ` • ${theme.toUpperCase()}` : ""
    } • WISHES AI`;
    ctx.fillText(headerLabel, boxX + 24, bannerY + 25);

    // Custom Greeting Text
    ctx.fillStyle = "#F4F1EA";
    ctx.font = "bold 17px sans-serif";
    const displayMsg =
      customMessage.trim() ||
      `Wishing you a magical and unforgettable ${(occasion || "celebration").toLowerCase()}! ✨`;
    const clippedMsg =
      displayMsg.length > 68 ? displayMsg.slice(0, 65) + "..." : displayMsg;
    ctx.fillText(clippedMsg, boxX + 24, bannerY + 49);
    ctx.restore();

    if (onProgress) {
      onProgress(Math.round(((frame + 1) / totalFrames) * 100));
    }

    await new Promise((r) => setTimeout(r, frameInterval));
  }

  recorder.stop();
  const videoBlob = await recordingPromise;
  const ext = selectedMime.includes("mp4") ? "mp4" : "webm";
  const filename = `wishes-ai-${(occasion || "celebration")
    .toLowerCase()
    .replace(/\s+/g, "-")}-${Date.now()}.${ext}`;

  return {
    url: URL.createObjectURL(videoBlob),
    blob: videoBlob,
    filename,
    mimeType: selectedMime,
  };
}
