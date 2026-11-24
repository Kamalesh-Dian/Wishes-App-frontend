import api from "./api";

export const uploadExcel = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/events/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchEventsBySource = (source: "excel" | "onedrive") => {
  return api.get(`/events?source=${source}`);
};

export const importOneDriveEvents = (events: any[]) => {
  return api.post("/events/import-json", events);
};

export const saveGeneratedWish = (
  eventId: string,
  payload: {
    generatedWishImage: string;
    generatedWishText: string;
  },
) => {
  return api.put(`/events/${eventId}/generated`, payload);
};

export const updateEvent = (eventId: string, payload: any) => {
  return api.put(`/events/${eventId}`, payload);
};

export const deleteEvent = (eventId: string) => {
  return api.delete(`/events/${eventId}`);
};

export const sendEventWhatsApp = (eventId: string, phone?: string) => {
  return api.post(`/events/${eventId}/send-whatsapp`, { phone });
};

export const sendEventEmail = (eventId: string, email?: string) => {
  return api.post(`/events/${eventId}/send-email`, { email });
};
