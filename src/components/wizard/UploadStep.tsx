import { ImageIcon, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useWishStore } from "../../store/wishesStore";
import { compressImage } from "../../services/imageCompression";
import ImageEditorToolbar from "./ImageEditorToolbar";
import { toast } from "../../store/toastStore";

export default function UploadStep() {
  const { uploadedImage, setImage, photoConsent, setPhotoConsent } = useWishStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!photoConsent) {
      toast.error("Please confirm photo consent before uploading.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, or WebP)");
      return;
    }
    
    setIsLoading(true);
    try {
      const base64 = await compressImage(file);
      setImage(base64);
      toast.success("Image uploaded and processed");
    } catch (error) {
      console.error("Failed to process image", error);
      toast.error("Failed to process image. Please try another file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const clearImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplace = () => {
    if (!photoConsent) {
      toast.error("Please confirm photo consent before uploading.");
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTriggerUpload = () => {
    if (!uploadedImage) {
      if (!photoConsent) {
        toast.error("Please confirm photo consent below before uploading.");
        return;
      }
      fileInputRef.current?.click();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload reference images</h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Optional: Add a person's photo to incorporate into the AI greeting design.</p>
      
      <input 
        type="file" 
        accept="image/png, image/jpeg, image/jpg, image/webp" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />

      <div 
        onClick={handleTriggerUpload}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center text-center transition-colors relative overflow-hidden min-h-[260px]
          ${uploadedImage ? 'border-teal-400 bg-slate-900/5 dark:bg-slate-800/40' : isDragging ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-teal-400 bg-slate-50/50 dark:bg-slate-850/30 cursor-pointer'}
        `}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-teal-500 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Processing image...</p>
          </div>
        ) : uploadedImage ? (
          <div className="relative w-full flex flex-col items-center justify-center gap-4">
            <img src={uploadedImage} alt="Uploaded reference" className="max-h-[220px] object-contain rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800" />
            
            <ImageEditorToolbar
              imageUrl={uploadedImage}
              onUpdateImage={(newBase64) => setImage(newBase64)}
              onReplace={handleReplace}
              onRemove={clearImage}
            />
          </div>
        ) : (
          <>
            <ImageIcon className={`mb-4 transition-colors ${isDragging ? 'text-teal-500' : 'text-teal-400 dark:text-teal-500'}`} size={36} strokeWidth={1.5} />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Drop images or click to browse</p>
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">Optional · JPEG, PNG, or WebP up to 10MB</p>
          </>
        )}
      </div>

      {/* Photo Consent Checkbox */}
      <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
        <input
          type="checkbox"
          id="photo-consent"
          checked={photoConsent}
          onChange={(e) => setPhotoConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500 cursor-pointer"
        />
        <label htmlFor="photo-consent" className="text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer leading-relaxed">
          <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-0.5">
            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" /> Photo Consent & Authorization
          </span>
          I confirm that I have permission and explicit consent from the person in this photo to upload and transform their image with AI.
        </label>
      </div>
    </div>
  );
}
