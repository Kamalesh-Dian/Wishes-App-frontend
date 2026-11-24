import api from "./api";

export async function generateWish(payload: unknown) {
  const response = await api.post("/generate", payload, {
    timeout: 180000,
  });

  return response.data;
}
