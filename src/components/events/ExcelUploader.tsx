import {
  FileSpreadsheet,
  CheckCircle2,
  X,
  UploadCloud,
  RefreshCw,
  Download,
  Calendar,
  Mail,
  User,
  Phone,
  Gift,
  AlertCircle,
  FileCheck2,
  TableProperties,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { useState, useRef, useId } from "react";
import * as XLSX from "xlsx";
import { useEventStore } from "../../store/eventStore";
import { uploadExcel, fetchEventsBySource } from "../../services/event";
import { toast } from "../../store/toastStore";

export interface RosterRow {
  Name: string;
  Email: string;
  EventType: string;
  EventDate: string;
  Department?: string;
  Phone?: string;
  PhotoURL?: string;
  CustomMessage?: string;
  MediaType?: "image" | "video" | "both";
  DeliveryChannel?: "email" | "whatsapp" | "both";
  VideoModel?: "gemini-omni" | "svd";
}

export const SAMPLE_ROSTER_ROWS: RosterRow[] = [
  {
    Name: "Maya Chen",
    Email: "maya.chen@acme.corp",
    EventType: "Birthday",
    EventDate: "2026-11-25",
    Department: "Product Design",
    Phone: "+1 415 555 0192",
    PhotoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Wishing our lead designer an extraordinary birthday celebration!",
    MediaType: "both",
    DeliveryChannel: "both",
  },
  {
    Name: "Arjun Patel",
    Email: "arjun.patel@acme.corp",
    EventType: "Work Anniversary",
    EventDate: "2026-12-01",
    Department: "Engineering",
    Phone: "+91 98765 43210",
    PhotoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Celebrating 5 years of engineering excellence and mentorship!",
    MediaType: "video",
    DeliveryChannel: "whatsapp",
    VideoModel: "gemini-omni",
  },
  {
    Name: "Sarah Jenkins",
    Email: "sarah.j@acme.corp",
    EventType: "Birthday",
    EventDate: "2026-12-14",
    Department: "Marketing",
    Phone: "+1 212 555 0148",
    PhotoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Happy Birthday Sarah! Thank you for bringing vibrant energy to our campaigns.",
    MediaType: "image",
    DeliveryChannel: "email",
  },
  {
    Name: "David Kim",
    Email: "david.kim@acme.corp",
    EventType: "Work Anniversary",
    EventDate: "2026-12-18",
    Department: "Operations",
    Phone: "+1 650 555 0184",
    PhotoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Celebrating your 3rd year with Acme. Thank you for keeping everything running smoothly!",
    MediaType: "both",
    DeliveryChannel: "both",
  },
  {
    Name: "Aisha Rahman",
    Email: "aisha.r@acme.corp",
    EventType: "Diwali Celebration",
    EventDate: "2026-11-01",
    Department: "People Ops",
    Phone: "+44 20 7946 0912",
    PhotoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Wishing you and your family a luminous, joyous and blessed Diwali!",
    MediaType: "video",
    DeliveryChannel: "whatsapp",
    VideoModel: "svd",
  },
  {
    Name: "Carlos Mendez",
    Email: "carlos.mendez@acme.corp",
    EventType: "Promotion",
    EventDate: "2026-12-30",
    Department: "Product Strategy",
    Phone: "+1 312 555 0177",
    PhotoURL: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    CustomMessage: "Congratulations on your promotion to Senior Product Director!",
    MediaType: "image",
    DeliveryChannel: "email",
  },
];

export const ROSTER_FIELD_SPECIFICATIONS = [
  {
    field: "Name",
    required: true,
    type: "Text",
    example: "Maya Chen",
    description: "Full name of the team member. Displayed on celebration cards and email salutations.",
  },
  {
    field: "Email",
    required: true,
    type: "Email Address",
    example: "maya.chen@acme.corp",
    description: "Corporate or personal email address for 9:00 AM automated celebration delivery.",
  },
  {
    field: "EventType",
    required: true,
    type: "Occasion",
    example: "Birthday, Work Anniversary, Diwali, Promotion",
    description: "Milestone occasion. Guides AI lighting, scene prompt, and greeting tone.",
  },
  {
    field: "EventDate",
    required: true,
    type: "Date (YYYY-MM-DD)",
    example: "2026-11-25",
    description: "Date of the milestone. Accepts ISO format YYYY-MM-DD or standard Excel date cell.",
  },
  {
    field: "Department",
    required: false,
    type: "Text",
    example: "Product Design, Engineering, Marketing",
    description: "Team or business unit name. Enables departmental filtering and channel tagging.",
  },
  {
    field: "Phone",
    required: false,
    type: "Phone (+E.164)",
    example: "+1 415 555 0192 or +91 98765 43210",
    description: "International phone with country code. Enables automated WhatsApp wish delivery.",
  },
  {
    field: "MediaType",
    required: false,
    type: "image | video | both",
    example: "both (default: image)",
    description: "Format of celebration media. Generates FLUX 4K portrait, Motion Video, or Both.",
  },
  {
    field: "DeliveryChannel",
    required: false,
    type: "email | whatsapp | both",
    example: "both (default: email)",
    description: "Dispatch channel on milestone date (9:00 AM). Delivers via Email, WhatsApp, or Both.",
  },
  {
    field: "PhotoURL",
    required: false,
    type: "Image URL",
    example: "https://images.unsplash.com/... or Cloudinary URL",
    description: "Portrait photo link. Used by FLUX to preserve identity across celebration themes.",
  },
  {
    field: "CustomMessage",
    required: false,
    type: "Text Note",
    example: "Wishing you an extraordinary 5th anniversary!",
    description: "Personalized message or leadership quote included in the generated greeting.",
  },
];

export const downloadRosterExcelFile = () => {
  const wb = XLSX.utils.book_new();

  // 1. Employee Roster Sheet
  const wsRoster = XLSX.utils.json_to_sheet(SAMPLE_ROSTER_ROWS);
  wsRoster["!cols"] = [
    { wch: 18 }, // Name
    { wch: 28 }, // Email
    { wch: 20 }, // EventType
    { wch: 14 }, // EventDate
    { wch: 20 }, // Department
    { wch: 18 }, // Phone
    { wch: 14 }, // MediaType
    { wch: 16 }, // DeliveryChannel
    { wch: 45 }, // PhotoURL
    { wch: 50 }, // CustomMessage
  ];
  XLSX.utils.book_append_sheet(wb, wsRoster, "Employee Roster");

  // 2. Format Instructions Sheet
  const wsInstructions = XLSX.utils.json_to_sheet(
    ROSTER_FIELD_SPECIFICATIONS.map((spec) => ({
      "Column Name": spec.field,
      Requirement: spec.required ? "REQUIRED" : "Optional",
      "Expected Format": spec.example,
      "Field Purpose": spec.description,
    }))
  );
  wsInstructions["!cols"] = [
    { wch: 18 }, // Column Name
    { wch: 14 }, // Requirement
    { wch: 40 }, // Expected Format
    { wch: 60 }, // Field Purpose
  ];
  XLSX.utils.book_append_sheet(wb, wsInstructions, "Format Instructions");

  XLSX.writeFile(wb, "wishes_employee_roster_template.xlsx");
};

export default function ExcelUploader() {
  const fileInputId = useId();
  const { setManualEvents, setUploadedFileName, clearEvents } = useEventStore();
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "guidelines">("preview");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 5;

  const normalizeEvents = (events: any[]) =>
    events.map((event) => ({
      ...event,
      Name: event.name || event.Name,
      Email: event.email || event.Email,
      Phone: event.phone || event.Phone,
      Department: event.department || event.Department,
      EventType: event.occasion || event.EventType,
      EventDate: event.eventDate || event.EventDate,
      MediaType: event.mediaType || event.MediaType || "image",
      DeliveryChannel: event.deliveryChannel || event.DeliveryChannel || "email",
      VideoModel: event.videoModel || event.VideoModel || "gemini-omni",
      photoUrl: event.photoUrl || event.PhotoURL || event.PhotoUrl,
      customMessage: event.customMessage || event.CustomMessage,
      generatedWishImage: event.generatedWishImage,
      generatedWishVideo: event.generatedWishVideo,
      generatedWishText: event.generatedWishText,
      whatsappStatus: event.whatsappStatus,
      emailStatus: event.emailStatus,
      status: event.status || "Pending",
    }));

  const parseFile = async (file: File) => {
    setSelectedFile(file);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { cellDates: true });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      setPreviewData(json);
      setCurrentPage(1);
      toast.success(`Loaded ${json.length} rows from ${file.name}`);
    } catch (err) {
      console.error("Failed to read excel preview", err);
      toast.error("Could not parse Excel file. Please ensure it is a valid .xlsx or .xls file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        toast.error("Please upload an Excel file (.xlsx or .xls)");
        return;
      }
      parseFile(file);
    }
  };

  const handleLoadSampleRoster = () => {
    // Convert sample rows into a real File object so it can be uploaded directly
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(SAMPLE_ROSTER_ROWS);
    XLSX.utils.book_append_sheet(wb, ws, "Employee Roster");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const sampleFile = new File([blob], "sample_employee_roster.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    setSelectedFile(sampleFile);
    setPreviewData(SAMPLE_ROSTER_ROWS);
    setCurrentPage(1);
    toast.success("Loaded 6 pre-formatted sample milestone rows!");
  };

  const handleLoadToEvents = async () => {
    if (!selectedFile) return;

    try {
      setIsImporting(true);
      const uploadResponse = await uploadExcel(selectedFile);
      const response = await fetchEventsBySource("excel");
      const normalized = normalizeEvents(response.data);

      setManualEvents(normalized);
      setUploadedFileName(selectedFile.name);
      setEventCount(uploadResponse.data?.count || normalized.length || previewData.length);

      setIsImporting(false);
      setImportSuccess(true);
      toast.success("Excel roster successfully imported to Events!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to import Excel. Please verify required columns (Name, Email, EventType, EventDate).");
      setIsImporting(false);
    }
  };

  const resetUploader = () => {
    clearEvents();
    setImportSuccess(false);
    setSelectedFile(null);
    setPreviewData([]);
    setCurrentPage(1);
  };

  // Inspect column health of the parsed preview
  const detectedColumns = previewData.length > 0 ? Object.keys(previewData[0]) : [];
  const hasName = detectedColumns.some((c) => /name/i.test(c));
  const hasEmail = detectedColumns.some((c) => /email/i.test(c));
  const hasEvent = detectedColumns.some((c) => /(eventtype|occasion|event)/i.test(c));
  const hasDate = detectedColumns.some((c) => /(eventdate|date)/i.test(c));
  const isTemplateValid = hasName && hasEmail && hasEvent && hasDate;

  const totalPages = Math.max(1, Math.ceil(previewData.length / itemsPerPage));
  const paginatedPreview = previewData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Success State
  if (importSuccess) {
    return (
      <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl p-12 sm:p-16 flex flex-col items-center justify-center border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl text-center transition-all">
        <div className="w-16 h-16 bg-[#00bfa6]/15 border border-[#00bfa6]/30 text-[#00bfa6] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(0,191,166,0.25)]">
          <CheckCircle2 size={34} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] mb-2">
          {eventCount} Milestones Imported Successfully
        </h2>
        <p className="text-xs sm:text-sm font-medium text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 mb-8 max-w-md">
          All valid employee milestones are now loaded into your active celebration schedule with identity preservation enabled.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={resetUploader}
            className="px-6 py-2.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            Import Another Roster
          </button>
          <button
            onClick={downloadRosterExcelFile}
            className="px-6 py-2.5 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 hover:border-[#00bfa6] text-[#0f2a2a] dark:text-[#d9faf4] text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Download size={13} className="text-[#00bfa6]" />
            Download Formatted Template
          </button>
        </div>
      </div>
    );
  }

  // Preview Mode for Selected File
  if (selectedFile && !importSuccess) {
    return (
      <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl overflow-hidden transition-all">
        {/* Header Bar */}
        <div className="p-6 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-[#0f2a2a]/40">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#00bfa6]/15 border border-[#00bfa6]/30 flex items-center justify-center text-[#00bfa6]">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#0f2a2a] dark:text-[#d9faf4]">
                  {selectedFile.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00bfa6]/15 text-[#00bfa6]">
                  {previewData.length} Rows
                </span>
              </div>
              <p className="text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                Review your milestone roster before importing into the celebration pipeline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewData([]);
              }}
              className="p-2 rounded-xl text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 hover:text-[#0f2a2a] dark:hover:text-[#d9faf4] hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Validation Status Pill */}
        <div className="px-6 py-3 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-slate-100/50 dark:bg-[#0c2424]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {isTemplateValid ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <FileCheck2 size={15} />
                <span>Standard Roster Format Detected: All 4 Required Columns Present</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <AlertCircle size={15} />
                <span>
                  Check Format: Expected columns{" "}
                  <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">
                    Name, Email, EventType, EventDate
                  </code>
                </span>
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
            Detected: {detectedColumns.slice(0, 5).join(", ")}
            {detectedColumns.length > 5 ? ` +${detectedColumns.length - 5} more` : ""}
          </span>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-slate-50/70 dark:bg-[#123030]/60 text-[10px] font-bold text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 uppercase tracking-wider">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Event Type</th>
                <th className="py-3 px-6">Event Date</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6">Phone (WhatsApp)</th>
                <th className="py-3 px-6">Custom Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f2a2a]/5 dark:divide-[#d9faf4]/5 text-xs text-[#0f2a2a] dark:text-[#d9faf4]">
              {paginatedPreview.length > 0 ? (
                paginatedPreview.map((row, i) => {
                  let dateStr = "Unknown";
                  const rawDate = row.EventDate || row.eventDate || row.Date || row.date;
                  if (rawDate) {
                    if (typeof rawDate === "number") {
                      const date = new Date(Math.round((rawDate - 25569) * 86400 * 1000));
                      dateStr = date.toISOString().split("T")[0];
                    } else if (rawDate instanceof Date) {
                      dateStr = rawDate.toISOString().split("T")[0];
                    } else {
                      dateStr = String(rawDate);
                    }
                  }

                  const name = row.Name || row.name || "-";
                  const email = row.Email || row.email || "-";
                  const occasion = row.EventType || row.eventType || row.Occasion || row.occasion || "-";
                  const dept = row.Department || row.department || "-";
                  const phone = row.Phone || row.phone || "-";
                  const photo = row.PhotoURL || row.photoUrl || row.PhotoUrl || row.photo;
                  const message = row.CustomMessage || row.customMessage || "-";

                  return (
                    <tr
                      key={i}
                      className="hover:bg-[#00bfa6]/5 dark:hover:bg-[#00bfa6]/10 transition-colors"
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          {photo ? (
                            <img
                              src={photo}
                              alt={name}
                              className="w-7 h-7 rounded-lg object-cover border border-[#00bfa6]/30 shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-[#00bfa6]/15 text-[#00bfa6] font-bold flex items-center justify-center text-xs shrink-0">
                              {name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-semibold">{name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 font-mono text-[11px] text-[#0f2a2a]/80 dark:text-[#d9faf4]/80">
                        {email}
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00bfa6]/15 text-[#00bfa6]">
                          {occasion}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono text-[11px]">{dateStr}</td>
                      <td className="py-3.5 px-6 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
                        {dept}
                      </td>
                      <td className="py-3.5 px-6 font-mono text-[11px] text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
                        {phone}
                      </td>
                      <td className="py-3.5 px-6 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xs truncate">
                        {message}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#0f2a2a]/50 dark:text-[#d9faf4]/50">
                    No rows found in this sheet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Load Controls */}
        <div className="p-4 px-6 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-slate-50/50 dark:bg-[#0f2a2a]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, previewData.length)} of {previewData.length} entries
          </div>

          <div className="flex items-center gap-3">
            {previewData.length > itemsPerPage && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg text-xs font-bold border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 disabled:opacity-40 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                >
                  Prev
                </button>
                <span className="text-xs font-mono">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg text-xs font-bold border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 disabled:opacity-40 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

            <button
              onClick={handleLoadToEvents}
              disabled={isImporting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_20px_rgba(0,191,166,0.35)] hover:shadow-[0_0_28px_rgba(0,191,166,0.5)] transition-all hover:scale-105 disabled:opacity-50 cursor-pointer"
            >
              {isImporting ? <RefreshCw size={14} className="animate-spin" /> : <UploadCloud size={14} />}
              <span>{isImporting ? "Importing Roster..." : "Load to Events"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Upload & Template Format View
  return (
    <div className="space-y-8">
      {/* Top Banner: Roster Template Specifications & Quick Download */}
      <div className="bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#00bfa6]">
              <TableProperties size={13} />
              <span>Standard Format Specification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight">
              Employee Milestone Roster Template
            </h2>
            <p className="text-xs sm:text-sm text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-2xl leading-relaxed">
              Use our pre-formatted Excel template to automate Birthdays, Work Anniversaries, Diwali, and
              promotions. Supports both manual upload and automatic 24/7 OneDrive sync.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadRosterExcelFile}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.55)] transition-all hover:scale-105 cursor-pointer"
            >
              <Download size={15} />
              <span>Download Template (.xlsx)</span>
            </button>

            <button
              onClick={handleLoadSampleRoster}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 hover:border-[#00bfa6] text-[#0f2a2a] dark:text-[#d9faf4] text-xs font-bold transition-all hover:scale-105 cursor-pointer bg-slate-50/50 dark:bg-white/5"
            >
              <FileSpreadsheet size={14} className="text-[#00bfa6]" />
              <span>Load Sample Data</span>
            </button>
          </div>
        </div>

        {/* Tabs: Interactive Format Preview vs Field Guidelines */}
        <div className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#0c2424]/80 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
              <button
                onClick={() => setActiveTab("preview")}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-white dark:bg-[#143838] text-[#00bfa6] shadow-sm"
                    : "text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 hover:text-[#0f2a2a] dark:hover:text-[#d9faf4]"
                }`}
              >
                <Eye size={13} />
                <span>Live Format Preview (Sheet 1)</span>
              </button>
              <button
                onClick={() => setActiveTab("guidelines")}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "guidelines"
                    ? "bg-white dark:bg-[#143838] text-[#00bfa6] shadow-sm"
                    : "text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 hover:text-[#0f2a2a] dark:hover:text-[#d9faf4]"
                }`}
              >
                <SlidersHorizontal size={13} />
                <span>Field Rules & Instructions (Sheet 2)</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
              4 Required Columns • 4 Optional Enhancements
            </span>
          </div>

          {activeTab === "preview" ? (
            /* Live Format Mock Table */
            <div className="rounded-2xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-100/80 dark:bg-[#0c2424]/80 border-b border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 text-[10px] font-bold text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 uppercase tracking-wider">
                      <th className="py-3 px-5">
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-[#00bfa6]" />
                          <span>Name</span>
                          <span className="text-[#FF5A52] font-mono">*</span>
                        </div>
                      </th>
                      <th className="py-3 px-5">
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} className="text-[#00bfa6]" />
                          <span>Email</span>
                          <span className="text-[#FF5A52] font-mono">*</span>
                        </div>
                      </th>
                      <th className="py-3 px-5">
                        <div className="flex items-center gap-1.5">
                          <Gift size={12} className="text-[#00bfa6]" />
                          <span>EventType</span>
                          <span className="text-[#FF5A52] font-mono">*</span>
                        </div>
                      </th>
                      <th className="py-3 px-5">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#00bfa6]" />
                          <span>EventDate</span>
                          <span className="text-[#FF5A52] font-mono">*</span>
                        </div>
                      </th>
                      <th className="py-3 px-5">Department</th>
                      <th className="py-3 px-5">
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-[#00bfa6]" />
                          <span>Phone (WhatsApp)</span>
                        </div>
                      </th>
                      <th className="py-3 px-5">Media Type</th>
                      <th className="py-3 px-5">Delivery Channel</th>
                      <th className="py-3 px-5">CustomMessage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0f2a2a]/5 dark:divide-[#d9faf4]/5 text-xs text-[#0f2a2a] dark:text-[#d9faf4] bg-white/50 dark:bg-transparent">
                    {SAMPLE_ROSTER_ROWS.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#00bfa6]/5 dark:hover:bg-[#00bfa6]/10 transition-colors"
                      >
                        <td className="py-3 px-5 font-semibold">
                          <div className="flex items-center gap-2.5">
                            {row.PhotoURL ? (
                              <img
                                src={row.PhotoURL}
                                alt={row.Name}
                                className="w-6 h-6 rounded-md object-cover border border-[#00bfa6]/30"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-md bg-[#00bfa6]/15 text-[#00bfa6] font-bold flex items-center justify-center text-[10px]">
                                {row.Name.charAt(0)}
                              </div>
                            )}
                            <span>{row.Name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-5 font-mono text-[11px] text-[#0f2a2a]/80 dark:text-[#d9faf4]/80">
                          {row.Email}
                        </td>
                        <td className="py-3 px-5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00bfa6]/15 text-[#00bfa6]">
                            {row.EventType}
                          </span>
                        </td>
                        <td className="py-3 px-5 font-mono text-[11px] font-semibold text-[#00bfa6]">
                          {row.EventDate}
                        </td>
                        <td className="py-3 px-5 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
                          {row.Department}
                        </td>
                        <td className="py-3 px-5 font-mono text-[11px] text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
                          {row.Phone}
                        </td>
                        <td className="py-3 px-5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.MediaType === "both"
                              ? "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                              : row.MediaType === "video"
                              ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                              : "bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300"
                          }`}>
                            {row.MediaType === "both" ? "✨ Both" : row.MediaType === "video" ? "🎬 Video" : "🖼️ Image"}
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.DeliveryChannel === "both"
                              ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300"
                              : row.DeliveryChannel === "whatsapp"
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300"
                          }`}>
                            {row.DeliveryChannel === "both" ? "🚀 Email + WA" : row.DeliveryChannel === "whatsapp" ? "💬 WhatsApp" : "✉️ Email"}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 max-w-xs truncate">
                          {row.CustomMessage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Field Guidelines Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROSTER_FIELD_SPECIFICATIONS.map((spec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 bg-slate-50/50 dark:bg-[#0c2424]/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0f2a2a] dark:text-[#d9faf4]">
                        {spec.field}
                      </span>
                      {spec.required ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#FF5A52]/15 text-[#FF5A52]">
                          Required
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#0f2a2a]/10 dark:bg-[#d9faf4]/10 text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                          Optional
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-[#00bfa6]">{spec.type}</span>
                  </div>
                  <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 leading-relaxed">
                    {spec.description}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                    <span className="text-[#00bfa6]">Example: </span>
                    <span>{spec.example}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`bg-white/80 dark:bg-[#143838]/80 backdrop-blur-xl rounded-3xl border-2 border-dashed transition-all p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-lg ${
          isDragging
            ? "border-[#00bfa6] bg-[#00bfa6]/10 scale-[1.01]"
            : "border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 hover:border-[#00bfa6]/60"
        }`}
      >
        <div className="w-16 h-16 bg-[#00bfa6]/15 border border-[#00bfa6]/30 text-[#00bfa6] rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,191,166,0.2)]">
          <UploadCloud size={30} />
        </div>

        <h3 className="text-base sm:text-lg font-extrabold text-[#0f2a2a] dark:text-[#d9faf4] mb-1.5">
          Drop your employee roster spreadsheet here
        </h3>
        <p className="text-xs text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 mb-6 max-w-md leading-relaxed">
          Supports <span className="font-bold text-[#00bfa6]">.xlsx</span> and{" "}
          <span className="font-bold text-[#00bfa6]">.xls</span> files up to 5 MB (up to 1,000 employees). You will
          be able to review all records before final import.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <label htmlFor={fileInputId} className="cursor-pointer">
            <div className="px-6 py-3 bg-[#0f2a2a] hover:bg-[#1a4444] dark:bg-[#d9faf4] dark:hover:bg-white dark:text-[#0f2a2a] text-[#d9faf4] text-xs font-bold rounded-full transition-all shadow-md inline-flex items-center gap-2 hover:scale-105">
              <UploadCloud size={14} />
              <span>Browse Files from Computer</span>
            </div>
            <input
              id={fileInputId}
              ref={fileInputRef}
              hidden
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
            />
          </label>

          <button
            onClick={downloadRosterExcelFile}
            className="px-5 py-3 rounded-full border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 hover:border-[#00bfa6] text-[#0f2a2a] dark:text-[#d9faf4] text-xs font-bold transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            <Download size={14} className="text-[#00bfa6]" />
            <span>Download Formatted Template</span>
          </button>
        </div>

        <div className="mt-8 flex items-center gap-4 text-[11px] text-[#0f2a2a]/50 dark:text-[#d9faf4]/50 font-mono">
          <span>• Identity Preserved</span>
          <span>• 9:00 AM Delivery Sync</span>
          <span>• WhatsApp & Email Ready</span>
        </div>
      </div>
    </div>
  );
}
