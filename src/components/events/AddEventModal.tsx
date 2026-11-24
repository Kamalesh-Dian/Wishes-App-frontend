import { useState } from "react";
import { X, Calendar, User, Mail, Tag, Building, Phone, Film, Sparkles, Image as ImageIcon, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventStore, type EventRecord } from "../../store/eventStore";
import { useAuthStore } from "../../store/authStore";
import { importOneDriveEvents } from "../../services/event";
import { toast } from "../../store/toastStore";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const { manualEvents, setManualEvents } = useEventStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    EventType: "Birthday",
    EventDate: "",
    Department: "",
    MediaType: "image" as "image" | "video" | "both",
    DeliveryChannel: "email" as "email" | "whatsapp" | "both",
    VideoModel: "gemini-omni" as "gemini-omni" | "svd",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create new event payload matching the table's normalized format
      const newEvent: EventRecord = {
        _id: Date.now().toString(),
        userId: user?.uid || "manual-entry",
        ...formData,
        phone: formData.Phone,
        mediaType: formData.MediaType,
        deliveryChannel: formData.DeliveryChannel,
        videoModel: formData.VideoModel,
        status: "pending",
        source: "excel"
      };

      // Add to local store immediately for UI update
      setManualEvents([...manualEvents, newEvent]);

      // Persist to backend MongoDB database for cron scheduler
      if (user?.uid) {
        await importOneDriveEvents([{
          name: formData.Name,
          email: formData.Email,
          phone: formData.Phone,
          occasion: formData.EventType,
          eventDate: formData.EventDate,
          department: formData.Department,
          mediaType: formData.MediaType,
          deliveryChannel: formData.DeliveryChannel,
          videoModel: formData.VideoModel,
          source: "excel",
          status: "pending",
        }]);
      }
      
      toast.success("Event scheduled successfully");
      
      // Reset and close
      setFormData({
        Name: "",
        Email: "",
        Phone: "",
        EventType: "Birthday",
        EventDate: "",
        Department: "",
        MediaType: "image",
        DeliveryChannel: "email",
        VideoModel: "gemini-omni",
      });
      onClose();
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Event added locally, could not sync with server.");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Add New Event</h3>
              <button 
                onClick={onClose} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Contact Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.Name}
                      onChange={e => setFormData({...formData, Name: e.target.value})}
                      placeholder="e.g. Maya Patel"
                      className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="email" 
                        value={formData.Email}
                        onChange={e => setFormData({...formData, Email: e.target.value})}
                        placeholder="maya@example.com"
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 flex items-center justify-between">
                      <span>WhatsApp / Phone</span>
                      {formData.DeliveryChannel !== "email" && <span className="text-teal-600 dark:text-teal-400 font-semibold normal-case text-[10px]">Required for WA</span>}
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required={formData.DeliveryChannel !== "email"}
                        type="tel" 
                        value={formData.Phone}
                        onChange={e => setFormData({...formData, Phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Department</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.Department}
                      onChange={e => setFormData({...formData, Department: e.target.value})}
                      placeholder="e.g. Engineering"
                      className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Event Type</label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select 
                        value={formData.EventType}
                        onChange={e => setFormData({...formData, EventType: e.target.value})}
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none"
                      >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Promotion">Promotion</option>
                        <option value="Diwali Celebration">Diwali Celebration</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="date" 
                        value={formData.EventDate}
                        onChange={e => setFormData({...formData, EventDate: e.target.value})}
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Generation Type */}
                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    AI Generation Media
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, MediaType: "image" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.MediaType === "image"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <ImageIcon size={16} className="mb-1" />
                      <span>Image Only</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, MediaType: "video" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.MediaType === "video"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Film size={16} className="mb-1" />
                      <span>Video Only</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, MediaType: "both" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.MediaType === "both"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Sparkles size={16} className="mb-1" />
                      <span>Both (Img+Vid)</span>
                    </button>
                  </div>
                </div>

                {/* Video Engine Selection (when Video or Both is selected) */}
                {formData.MediaType !== "image" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5"
                  >
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Video Diffusion Engine
                    </label>
                    <select
                      value={formData.VideoModel}
                      onChange={e => setFormData({ ...formData, VideoModel: e.target.value as "gemini-omni" | "svd" })}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="gemini-omni">Gemini Omni 1.2 Flash (Fast cinematic motion)</option>
                      <option value="svd">Stable Video Diffusion SVD XT 1.1 (ComfyUI)</option>
                    </select>
                  </motion.div>
                )}

                {/* Delivery Channel */}
                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Scheduled Delivery Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, DeliveryChannel: "email" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.DeliveryChannel === "email"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Mail size={16} className="mb-1" />
                      <span>Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, DeliveryChannel: "whatsapp" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.DeliveryChannel === "whatsapp"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <MessageSquare size={16} className="mb-1" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, DeliveryChannel: "both" })}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        formData.DeliveryChannel === "both"
                          ? "bg-teal-50 dark:bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Send size={16} className="mb-1" />
                      <span>Email + WA</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-5 py-2.5 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl shadow-sm transition-colors shadow-teal-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
