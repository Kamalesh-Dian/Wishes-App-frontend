export interface WhatsAppShareParams {
  phone?: string;
  recipientName?: string;
  occasion?: string;
  customMessage?: string;
  mediaUrl: string;
  mediaBlob?: Blob;
  mediaFilename?: string;
}

export function formatWhatsAppWishText(params: WhatsAppShareParams): string {
  const { recipientName, occasion = "Celebration", customMessage, mediaUrl } = params;
  const greetingHeader = recipientName
    ? `✨ *Happy ${occasion}, ${recipientName}!* 🎉`
    : `✨ *Happy ${occasion} Wishes!* 🎉`;

  const bodyMsg =
    customMessage && customMessage.trim().length > 0
      ? customMessage.trim()
      : `Wishing you a joyful, radiant, and unforgettable ${occasion.toLowerCase()} filled with warmth and celebration!`;

  return `${greetingHeader}\n\n${bodyMsg}\n\n🖼️ *View your personalized celebration card:*\n${mediaUrl}\n\n_Crafted with Wishes AI Studio_`;
}

export function openWhatsAppDirect(params: WhatsAppShareParams): void {
  const text = formatWhatsAppWishText(params);
  const encodedText = encodeURIComponent(text);

  // Clean phone number to digits only
  const cleanPhone = (params.phone || "").replace(/[^\d]/g, "");

  const targetUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodedText}`
    : `https://api.whatsapp.com/send?text=${encodedText}`;

  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

export async function shareWishViaNativeOrWhatsApp(
  params: WhatsAppShareParams
): Promise<"native" | "whatsapp-link"> {
  const text = formatWhatsAppWishText(params);

  // If no specific phone number is forced and Web Share API with files is supported (mobile/modern desktop),
  // attempt to share the actual image/video file directly
  if (!params.phone && typeof navigator !== "undefined" && navigator.share) {
    try {
      let blobToShare = params.mediaBlob;
      if (!blobToShare && params.mediaUrl) {
        const res = await fetch(params.mediaUrl);
        blobToShare = await res.blob();
      }
      if (blobToShare) {
        const filename =
          params.mediaFilename ||
          `wishes-ai-${(params.occasion || "greeting").toLowerCase().replace(/\s+/g, "-")}.png`;
        const file = new File([blobToShare], filename, {
          type: blobToShare.type || "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Happy ${params.occasion || "Celebration"} Wish`,
            text,
            files: [file],
          });
          return "native";
        }
      }
    } catch {
      // Fall back to WhatsApp deep link if user cancels or file share fails
    }
  }

  openWhatsAppDirect(params);
  return "whatsapp-link";
}
