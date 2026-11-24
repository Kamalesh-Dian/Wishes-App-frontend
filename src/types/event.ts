export interface EventRecord {
  Name: string;
  Email: string;
  Phone?: string;
  EventType: string;
  EventDate: string;
  Department: string;
  WhatsAppGroup?: string;
  MediaType?: "image" | "video" | "both";
  DeliveryChannel?: "email" | "whatsapp" | "both";
  VideoModel?: "gemini-omni" | "svd";
}
