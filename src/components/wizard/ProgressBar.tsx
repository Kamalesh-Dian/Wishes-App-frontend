import { Check } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";

const steps = [
  "Occasion",
  "Photo",
  "Theme",
  "People",
  "Decor",
  "Animation",
  "Engine",
  "Preview",
  "Output"
];

export default function ProgressBar() {
  const { currentStep, setCurrentStep } = useWishStore();

  return (
    <div className="w-full overflow-x-auto pb-8 scrollbar-hide -mb-8">
      <div className="flex items-center justify-between w-full min-w-[500px] md:min-w-0 max-w-3xl mx-auto relative z-0">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full"></div>
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 -z-10 rounded-full transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      ></div>

      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <div key={step} className="flex flex-col items-center relative z-10">
            <button
              type="button"
              onClick={() => isCompleted && setCurrentStep(stepNum)}
              disabled={!isCompleted}
              aria-label={`Step ${stepNum}: ${step}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isCompleted
                  ? "bg-teal-500 text-white shadow-sm hover:ring-2 hover:ring-teal-400 cursor-pointer"
                  : isActive
                    ? "bg-teal-500 text-white ring-4 ring-teal-500/30 dark:ring-teal-500/20 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-default"
              }`}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
            </button>

            <span className={`absolute top-10 text-[10px] sm:text-xs font-bold tracking-wide text-center whitespace-nowrap ${
              isActive || isCompleted
                ? "text-slate-800 dark:text-slate-200"
                : "text-slate-400 dark:text-slate-500"
            }`}>
              {step}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
}
