import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { toast } from "../../store/toastStore";

export default function WizardNavigation() {
  const { currentStep, nextStep, prevStep, resetWish } = useWishStore();

  const totalSteps = 9;

  return (
    <div className="flex justify-between items-center mt-10">
      <button
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          currentStep === 1
            ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <ArrowLeft size={14} /> Back
      </button>

      {currentStep === totalSteps ? (
        <button
          onClick={() => {
            resetWish();
            toast.success("Ready to craft a new wish from Step 1!");
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md bg-[#00bfa6] hover:bg-[#00a892] text-[#0f2a2a] cursor-pointer"
        >
          <RotateCcw size={14} /> Start Over (Step 1)
        </button>
      ) : (
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 cursor-pointer"
        >
          Next <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
