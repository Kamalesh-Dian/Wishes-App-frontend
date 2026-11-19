import { ArrowLeft, ArrowRight, RotateCcw, Lock } from "lucide-react";
import { useWishStore } from "../../store/wishesStore";
import { toast } from "../../store/toastStore";

export default function WizardNavigation() {
  const {
    currentStep,
    nextStep,
    prevStep,
    resetWish,
    occasion,
    uploadedImage,
    photoConsent,
    theme,
    people,
    decorations,
    aiEngine,
    generatedImage,
  } = useWishStore();

  const totalSteps = 9;

  const getStepValidation = (): { valid: boolean; message: string } => {
    switch (currentStep) {
      case 1:
        return {
          valid: Boolean(occasion && occasion.trim().length > 0),
          message: "Please select an occasion to continue.",
        };
      case 2:
        if (!uploadedImage) {
          return {
            valid: false,
            message: "Please upload a reference photo to continue.",
          };
        }
        if (!photoConsent) {
          return {
            valid: false,
            message: "Please confirm photo consent to continue.",
          };
        }
        return { valid: true, message: "" };
      case 3:
        return {
          valid: Boolean(theme && theme.trim().length > 0),
          message: "Please choose a celebration site to continue.",
        };
      case 4:
        return {
          valid: people.length > 0,
          message: "Please select at least one companion group to continue.",
        };
      case 5:
        return {
          valid: decorations.length > 0,
          message: "Please select at least one decoration to continue.",
        };
      case 6:
        return { valid: true, message: "" };
      case 7:
        return {
          valid: Boolean(aiEngine && aiEngine.trim().length > 0),
          message: "Please select an AI provider to continue.",
        };
      case 8:
        return {
          valid: Boolean(generatedImage),
          message: "Please generate your wish image before proceeding to output.",
        };
      default:
        return { valid: true, message: "" };
    }
  };

  const { valid: canProceed, message: validationMessage } = getStepValidation();

  const handleNext = () => {
    if (!canProceed) {
      toast.error(validationMessage);
      return;
    }
    nextStep();
  };

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
          onClick={handleNext}
          aria-disabled={!canProceed}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
            canProceed
              ? "bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 cursor-pointer"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          {!canProceed && <Lock size={13} />}
          <span>Next</span>
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
