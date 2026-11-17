import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToastStore, type ToastType } from "../../store/toastStore";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
  error: <AlertCircle size={18} className="text-rose-500 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
  info: <Info size={18} className="text-teal-500 shrink-0" />,
};

const borderColors: Record<ToastType, string> = {
  success: "border-emerald-500/30",
  error: "border-rose-500/30",
  warning: "border-amber-500/30",
  info: "border-teal-500/30",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border ${borderColors[t.type]} rounded-xl shadow-lg shadow-black/5 text-slate-800 dark:text-slate-100 text-xs font-medium`}
          >
            {icons[t.type]}
            <p className="flex-1 leading-relaxed mt-0.5">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer transition-colors"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
