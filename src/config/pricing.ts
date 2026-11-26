function parseNonNegativeInt(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

const currency = (import.meta.env.VITE_PLAN_CURRENCY as string | undefined)?.trim() || "$";

const freePrice = parseNonNegativeInt(import.meta.env.VITE_PLAN_FREE_PRICE, 0);
const freeImages = parseNonNegativeInt(import.meta.env.VITE_PLAN_FREE_IMAGES, 5);
const freeVideos = parseNonNegativeInt(import.meta.env.VITE_PLAN_FREE_VIDEOS, 3);

const proPrice = parseNonNegativeInt(import.meta.env.VITE_PLAN_PRO_PRICE, 5);
const proImages = parseNonNegativeInt(import.meta.env.VITE_PLAN_PRO_IMAGES, 40);
const proVideos = parseNonNegativeInt(import.meta.env.VITE_PLAN_PRO_VIDEOS, 10);

const ultimatePrice = parseNonNegativeInt(import.meta.env.VITE_PLAN_ULTIMATE_PRICE, 12);
const ultimateImages = parseNonNegativeInt(import.meta.env.VITE_PLAN_ULTIMATE_IMAGES, 75);
const ultimateVideos = parseNonNegativeInt(import.meta.env.VITE_PLAN_ULTIMATE_VIDEOS, 25);

export const PRICING_CONFIG = {
  currency,
  free: {
    price: `${currency}${freePrice}`,
    priceNumeric: freePrice,
    imageLimit: freeImages,
    videoLimit: freeVideos,
    totalGenerations: freeImages + freeVideos,
  },
  pro: {
    price: `${currency}${proPrice}`,
    priceNumeric: proPrice,
    imageLimit: proImages,
    videoLimit: proVideos,
    totalGenerations: proImages + proVideos,
  },
  ultimate: {
    price: `${currency}${ultimatePrice}`,
    priceNumeric: ultimatePrice,
    imageLimit: ultimateImages,
    videoLimit: ultimateVideos,
    totalGenerations: ultimateImages + ultimateVideos,
  },
} as const;
