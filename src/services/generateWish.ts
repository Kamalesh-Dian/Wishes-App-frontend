import api from "./api";

export type WishStatus = "queued" | "image" | "video" | "done" | "failed";

export interface GenerateWishResponse {
  success: boolean;
  wishId?: string;
  imageURL?: string;
  cleanImageURL?: string;
  videoURL?: string;
  status?: WishStatus;
  error?: string;
}

export interface GenerateWishCallbacks {
  onStatusUpdate?: (status: WishStatus, elapsedSec: number) => void;
}

export async function generateWish(
  payload: unknown,
  callbacks?: GenerateWishCallbacks
): Promise<GenerateWishResponse> {
  // 1. Submit async generation request
  const submitResponse = await api.post("/generate", payload, {
    timeout: 30000,
  });

  const { wishId } = submitResponse.data || {};
  if (!wishId) {
    return submitResponse.data;
  }

  // Initial callback
  if (callbacks?.onStatusUpdate) {
    callbacks.onStatusUpdate("queued", 0);
  }

  // 2. Poll /generate/:wishId/status every 3s with a 10-minute timeout (200 attempts)
  const pollIntervalMs = 3000;
  const maxAttempts = 200; // 200 * 3s = 600s = 10 minutes
  const startTime = Date.now();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

    const elapsedSec = Math.round((Date.now() - startTime) / 1000);
    const statusRes = await api.get(`/generate/${wishId}/status`, {
      timeout: 15000,
    });

    const statusData = statusRes.data;
    const currentStatus: WishStatus = statusData.status || "queued";

    if (callbacks?.onStatusUpdate) {
      callbacks.onStatusUpdate(currentStatus, elapsedSec);
    }

    if (currentStatus === "done") {
      const finalImage =
        statusData.imageUrl ||
        statusData.generatedImage ||
        statusData.imageURL ||
        statusData.cleanImageUrl ||
        statusData.cleanImage ||
        "";
      return {
        success: true,
        wishId,
        imageURL: finalImage,
        cleanImageURL: statusData.cleanImageUrl || statusData.cleanImage,
        videoURL: statusData.videoUrl || statusData.videoURL,
        status: "done",
      };
    }

    if (currentStatus === "failed") {
      throw new Error(statusData.error || "Wish generation failed.");
    }
  }

  throw new Error("Wish generation timed out after 10 minutes.");
}
