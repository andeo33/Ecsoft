import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Search,
  Cpu,
  CheckCircle,
  Calendar,
  FileText,
  Layout,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Zap,
  Shield,
  ArrowRight,
  Sparkle,
  Bookmark,
  ExternalLink,
  Lock,
  Key,
  Compass,
  Smile,
  Activity,
  Layers,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Monitor,
  Smartphone,
  Tablet,
  Printer,
  ScanLine,
  Database,
  Scale,
  CreditCard,
  X,
  Mail,
  Building,
  Check,
  Trash2,
  Users,
  RefreshCw
} from "lucide-react";
import { AuditReport, ActionPlanItem, DetailedIssue } from "./types";
import ScoreGauge from "./components/ScoreGauge";
import TechStackBadges from "./components/TechStackBadges";

// Helper for absolute visual elegance card styling
const CARD_STYLE = "bg-[#111625]/80 backdrop-blur-md rounded-2xl border border-gray-800 p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 shadow-lg";

// Real-world POS hardware peripherals database matching user-provided image
const POS_HARDWARE_ITEMS = [
  {
    id: "terminal",
    name: "Master Touch Terminal",
    icon: Monitor,
    sub: "All-In-One Touch System",
    role: "Acts as the central checkout brain, powering instant item selection, SST sales processing, and dual-display configuration for direct custom interaction.",
    specs: [
      { key: "Screen", value: "15.6\" 1080p Cap-Touch Panel" },
      { key: "Processor", value: "Intel high-frequency quad-core" },
      { key: "Memory", value: "8GB DDR4 RAM / 128GB Enterprise SSD" },
      { key: "OS System", value: "Compliance-hardened POS system kernel" }
    ],
    status: "LHDN e-Invoicing Ready"
  },
  {
    id: "printer",
    name: "Receipt Thermal Printer",
    icon: Printer,
    sub: "High-Speed Counter Roll",
    role: "Secures high speed thermal slip delivery with anti-jam cutter technology, perfect for kitchen orders and physical invoicing verification tickets.",
    specs: [
      { key: "Print Speed", value: "250mm/sec ultra-fast response" },
      { key: "Interface", value: "Triple connection (USB + Serial + LAN)" },
      { key: "Roll Size", value: "Standard 80mm thermal receipt paper" },
      { key: "Auto-cut", value: "Heavy-duty steel blade (1.5M cuts)" }
    ],
    status: "Auto-Cut & SST Tax Compliant"
  },
  {
    id: "scanner",
    name: "Omni Laser Scanner",
    icon: ScanLine,
    sub: "Hands-Free 2D Scan Engine",
    role: "Fires direct red laser grid lines to instantly register 1D barcodes and 2D mobile e-wallet QR codes seamlessly without manual alignment.",
    specs: [
      { key: "Scan Pattern", value: "20-line omnidirectional laser grid" },
      { key: "Decoding", value: "Reads blurred, damaged or phone screens" },
      { key: "Sensing", value: "Auto-trigger wake-on-detect sensor" },
      { key: "Interface", value: "Driverless plug-and-play USB connection" }
    ],
    status: "Instant 2D QR Code Ready"
  },
  {
    id: "drawer",
    name: "Heavy-Duty Cash Drawer",
    icon: Lock,
    sub: "Double-Lock Steel Safe Box",
    role: "Stores currency notes and coins securely inside reinforced premium steel casing that automatically clicks open on transaction completion.",
    specs: [
      { key: "Chamber", value: "5 Bill Dividers / 8 Coin slots" },
      { key: "Structure", value: "Thick cold-rolled steel design" },
      { key: "Trigger", value: "RJ11/24V pulse printer-driven solenoid" },
      { key: "Lifetime", value: "Over 1,000,000 flawless cycles" }
    ],
    status: "Reinforced Security"
  },
  {
    id: "display",
    name: "VFD Customer Display",
    icon: Database,
    sub: "Price Display Pole Extension",
    role: "Provides high-visibility clear ledger totals and change updates to the customers in real-time, meeting standard trust parameters.",
    specs: [
      { key: "Display Panel", value: "High-contrast Vacuum Fluorescent" },
      { key: "Chr Array", value: "20 characters x 2 rows Dot Matrix" },
      { key: "Command Set", value: "ESC/POS & standard emulation modes" },
      { key: "Ergonomics", value: "360-degree rotation & height adjustable" }
    ],
    status: "Active Customer Sign-off"
  },
  {
    id: "scale",
    name: "Certified Weight Scale",
    icon: Scale,
    sub: "Integrated Retail Balance",
    role: "Transmits fresh stock weight counts directly to active POS software checkout carts to instantly verify SST taxation levels.",
    specs: [
      { key: "Max Weight", value: "15.000 kg capacity limitation" },
      { key: "Graduation", value: "2g high-precision division steps" },
      { key: "Port Type", value: "RS232 serial feed directly to Terminal" },
      { key: "Chamber Plate", value: "High-grade food safe stainless steel" }
    ],
    status: "Malaysia weights & measures certified"
  },
  {
    id: "mobile",
    name: "Smart POS Tablet",
    icon: Smartphone,
    sub: "Full Wireless Order Pad",
    role: "Provides complete tableside checkout, popup vendor invoices, and handheld physical logistics catalog management on the move.",
    specs: [
      { key: "Interface", value: "5.5\" Multi-touch screen workspace" },
      { key: "Wireless", value: "Dualband Wi-Fi + High Speed 4G LTE" },
      { key: "Printer", value: "Built-in 58mm high resolution thermal slip printer" },
      { key: "Battery Core", value: "5200mAh Lithium long life battery" }
    ],
    status: "Wireless Handheld Ready"
  },
  {
    id: "msr",
    name: "MSR Magnetic Reader",
    icon: CreditCard,
    sub: "Triple-Track Card Swipe",
    role: "Supports physical loyalty cards, identification sign-offs, and custom checkout staff profile checkouts in milliseconds.",
    specs: [
      { key: "Emulation", value: "Driverless keyboard simulation" },
      { key: "Standards", value: "ISO 7811 formats compatibility" },
      { key: "Speed Scope", value: "10 to 120 cm/sec tracking pace" },
      { key: "Connection", value: "Integrated compact USB interface cable" }
    ],
    status: "Swipe-to-Identify Enabled"
  }
];

export default function App() {
  const [url, setUrl] = useState("https://ecsoft.com.my/");
  const [customGoal, setCustomGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [stages, setStages] = useState<string[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Tabs: overview, seo, copywriting, design, plan
  const [activeTab, setActiveTab] = useState<"overview" | "seo" | "copywriting" | "design" | "plan">("overview");

  // Interactive playground for re-writing copywriting headline/copy live
  const [playOriginal, setPlayOriginal] = useState(
    "Authorized SQL Payroll, SQL Account agent, POS & billing software system with local office support across major territories."
  );
  const [playRewrite, setPlayRewrite] = useState(
    "Empowering Malaysian Small & Medium Enterprises with the industry's default, LHDN e-Invoicing compliant ledger & payroll platform."
  );
  
  // Custom design simulator variables
  const [simPairing, setSimPairing] = useState<"standard" | "modern">("modern");
  const [simLineHeight, setSimLineHeight] = useState<"compressed" | "spacious">("spacious");
  const [simTheme, setSimTheme] = useState<"vintage" | "amber-gold">("amber-gold");

  // Selection of active interactive POS hardware peripheral
  const [selectedHardware, setSelectedHardware] = useState<string>("terminal");
  const [isHwTesting, setIsHwTesting] = useState<boolean>(false);
  const [hwTestStatus, setHwTestStatus] = useState<string | null>(null);

  // Appointment modal control state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [modalViewMode, setModalViewMode] = useState<"form" | "database">("form");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingCompany, setBookingCompany] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-06-25");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [bookingService, setBookingService] = useState("LHDN e-Invoicing Compliance Consultation");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // CRM Database variables
  const [appointmentsList, setAppointmentsList] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [crmSearchQuery, setCrmSearchQuery] = useState("");

  // Secure Admin CRM Portal States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  const [isResetPasscodeOpen, setIsResetPasscodeOpen] = useState(false);
  const [currentResetPasscode, setCurrentResetPasscode] = useState("");
  const [newResetPasscode, setNewResetPasscode] = useState("");
  const [resetPasscodeError, setResetPasscodeError] = useState<string | null>(null);
  const [resetPasscodeSuccess, setResetPasscodeSuccess] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const fetchAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentsList(data);
      }
    } catch (err) {
      console.error("Error fetching CRM database records:", err);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) {
      setBookingError("Please provide your full name.");
      return;
    }
    if (!bookingEmail.trim() || !bookingEmail.includes("@")) {
      setBookingError("Please enter a valid email address.");
      return;
    }
    if (!bookingPhone.trim()) {
      setBookingError("Please enter your contact phone number.");
      return;
    }
    setBookingError(null);
    setIsSubmittingBooking(true);

    try {
      const payload = {
        name: bookingName,
        email: bookingEmail,
        phone: bookingPhone,
        company: bookingCompany,
        date: bookingDate,
        time: bookingTime,
        service: bookingService,
        notes: bookingNotes
      };

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to persist details to CRM database");
      }

      setBookingSuccess(true);
      // Automatically refresh CRM records list
      fetchAppointments();
    } catch (err: any) {
      setBookingError(err.message || "Network error. Unable to connect to CRM database.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const deleteCrmAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setAppointmentsList(prev => prev.filter(apt => apt.id !== id));
      }
    } catch (err) {
      console.error("Error deleting CRM lead:", err);
    }
  };

  const updateCrmAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setAppointmentsList(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
      }
    } catch (err) {
      console.error("Error updating CRM lead status:", err);
    }
  };

  const testSelectedHardware = (id: string) => {
    setIsHwTesting(true);
    setHwTestStatus("Initializing connection bus over Serial/USB emulator...");
    
    setTimeout(() => {
      setHwTestStatus("Querying BIOS microcode and bus status... OK");
    }, 450);
    
    setTimeout(() => {
      if (id === "terminal") {
        setHwTestStatus("ACTIVE STATUS ✔️: 15.6\" touchscreen responds to 10-point tactile signals. SST database synchronized.");
      } else if (id === "printer") {
        setHwTestStatus("ACTIVE STATUS ✔️: Direct thermal print-head calibrated. Cutter cycle succeeded. Paper Roll at 84%.");
      } else if (id === "scanner") {
        setHwTestStatus("ACTIVE STATUS ✔️: Omni-directional laser diode active. Sensed default code [SST-LHDN-2026] successfully.");
      } else if (id === "drawer") {
        setHwTestStatus("ACTIVE STATUS ✔️: Solenoid driver sent pulse 24V. Vault latch auto-ejected successfully.");
      } else if (id === "display") {
        setHwTestStatus("ACTIVE STATUS ✔️: VFD micro-controller online. Ticker display refreshed with string: [WELCOME TO ECSOFT].");
      } else if (id === "scale") {
        setHwTestStatus("ACTIVE STATUS ✔️: Weighing sensor calibrated. Serial feed returned stable reading [0.000 kg] live scale test.");
      } else if (id === "mobile") {
        setHwTestStatus("ACTIVE STATUS ✔️: Handheld Wi-Fi / 4G channel active. Local mobile ticket server prints order #832.");
      } else {
        setHwTestStatus("ACTIVE STATUS ✔️: Magnetic Card Reader swipe channel ready. Emulating keyboard input queue.");
      }
      setIsHwTesting(false);
    }, 1200);
  };

  // Pre-trigger standard loading sequences to mimic realistic high-fidelity scanner
  const runAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url) return;

    setLoading(true);
    setErrorMessage(null);
    setReport(null);
    setStages([
      "Establishing connection interface...",
      "Resolving target DNS routing...",
      "Parsing meta description & tax-compliance schemas...",
      "Detecting legacy dependencies & frameworks...",
      "Evaluating visual contrast & mobile viewport breakpoints...",
      "Executing semantic brand value comparison using Gemini AI..."
    ]);
    setActiveStageIndex(0);

    // Dynamic scanning feel
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          return 5;
        }
        return prev + 1;
      });
    }, 700);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customGoal })
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Connection refused or API is offline.");
      }

      const data = await response.json();
      
      // Ensure smooth visual experience with a short delay
      setTimeout(() => {
        setReport(data);
        setLoading(false);
        setActiveTab("overview");
      }, 4200);

    } catch (err: any) {
      clearInterval(interval);
      setErrorMessage(err.message || "An unexpected error occurred during testing.");
      setLoading(false);
    }
  };

  // Run automatically on first render for standard user delight
  useEffect(() => {
    runAnalysis();
    fetchAppointments();
  }, []);

  // Handler to toggle simulated action plan completed items locally
  const toggleActionItem = (index: number) => {
    if (!report) return;
    const updatedPlan = [...report.actionPlan];
    updatedPlan[index] = {
      ...updatedPlan[index],
      completed: !updatedPlan[index].completed
    };
    setReport({
      ...report,
      actionPlan: updatedPlan
    });
  };

  return (
    <div id="website_auditor_app" className="min-h-screen bg-[#070a13] text-gray-100 font-sans selection:bg-amber-500 selection:text-[#070a13] relative overflow-hidden pb-24">
      {/* Decorative Golden Ambient Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-radial from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-20%] w-[60vw] h-[60vw] bg-radial from-emerald-500/5 via-teal-600/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[10%] w-[45vw] h-[45vw] bg-radial from-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Modern High-End Floating Navbar Header */}
      <header className="sticky top-0 z-40 bg-[#070a13]/85 backdrop-blur-xl border-b border-gray-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-emerald-500 p-[1.5px] flex items-center justify-center shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-white font-sans">
                  ECSOFT Software Solution Company <span className="text-xs text-amber-400 font-medium tracking-normal">(since year 1999)</span>
                </h1>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md uppercase font-bold shrink-0">
                  v2.8
                </span>
              </div>
              <p className="text-xs text-gray-400">High-End Brand & Website Intelligence Suite</p>
            </div>
          </div>

          {/* Quick Stats Banner / Status Indicator */}
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Gemini-3.5-Flash Active (Grounding)
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-amber-400">
              <Award className="w-3.5 h-3.5" />
              Premium Design Studio Vibe Apply
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Modern Gorgeous Hero Section combining technology visual + brand design context */}
        <section className="mb-12 relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-b from-[#111625] to-[#0a0d16] p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070a13] via-[#070a13]/80 to-transparent pointer-events-none z-1" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Descriptive Pitch & Form Header */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
                <Sparkle className="w-3.5 h-3.5" />
                Vibe & Style Re-imagination Interface
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Assess legacy software portfolios with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">aesthetic mastery</span>.
              </h2>
              
              <p className="text-gray-400 leading-relaxed max-w-xl">
                We design and dissect digital touchpoints. This interface replicates high-contrast slate layouts with cozy warm-glow highlights, dynamic score indicators, and a live, professional copywriting playground.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAppointmentModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-[#070a13] border border-amber-500/35 hover:border-amber-500 font-sans font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer leading-none"
                  id="hero_contact_button"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Make Appointment
                </button>
              </div>

              {/* Analyzer interactive form */}
              <form onSubmit={runAnalysis} className="bg-[#181f33] p-2.5 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-2 shadow-xl relative group focus-within:border-amber-500/40 transition-all">
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">
                      Target Audit Website
                    </span>
                    <input
                      type="text"
                      className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm font-semibold"
                      placeholder="e.g. https://domain.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Optional Custom Objectives */}
                <div className="flex-1 flex items-center gap-3 px-3 border-t md:border-t-0 md:border-l border-gray-800/80">
                  <Compass className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">
                      Bonus Strategy Focus
                    </span>
                    <input
                      type="text"
                      className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                      placeholder="e.g. emphasize SST & cloud sync"
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-[#070a13] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      Verify Vibe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Generated Model Image - Displayed with Luxury Frame & Accent Borders */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-transparent blur-2xl rounded-2xl" />
              <div className="relative border-4 border-gray-900 rounded-2xl overflow-hidden shadow-2xl group transition-transform hover:scale-[1.01]">
                <img
                  src="/src/assets/images/tech_auditor_hero_1782039322196.jpg"
                  alt="Tech auditor looking at website analytics"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover brightness-[0.82] contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating graphic element representing technology integration scan */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-800 flex items-center gap-2 text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CRAWLER_NODE_ACTIVE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#111625]/90 backdrop-blur-md p-3 rounded-xl border border-gray-800">
                  <p className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider mb-0.5">Website Auditor Interface</p>
                  <p className="text-xs text-white font-medium">Replaces low-precision layouts with sleek golden grids.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Scan console feedback */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-10 bg-[#0f1320] border border-amber-500/30 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 animate-pulse w-full" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin" />
                  REAL-TIME ADAPTIVE RUNTIME AUDIT
                </span>
                <span className="text-xs text-gray-500 font-mono">Stage {activeStageIndex + 1} of 6</span>
              </div>

              {/* Progress text steps */}
              <div className="space-y-1.5">
                {stages.map((stageText, idx) => {
                  const state = idx < activeStageIndex ? "done" : idx === activeStageIndex ? "active" : "pending";
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between font-mono text-xs py-1 px-2.5 rounded-lg transition-colors ${state === "active" ? "bg-amber-500/10 text-amber-300 border-l-2 border-amber-500" : state === "done" ? "text-slate-400" : "text-slate-600"}`}
                    >
                      <div className="flex items-center gap-2">
                        {state === "done" ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : state === "active" ? (
                          <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0 mx-1" />
                        )}
                        <span>{stageText}</span>
                      </div>
                      <span className="text-[10px] font-bold">
                        {state === "done" ? "SUCCESS" : state === "active" ? "RUNNING" : "WAITING"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display generic error message */}
        {errorMessage && (
          <div className="mb-10 p-5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Auditing Operational Interruption</h4>
              <p className="text-xs mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Primary Audit Output Board */}
        {report && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Quick Audit Metrics Segment Card */}
            <div className="bg-gradient-to-r from-[#0d1222] to-[#12192e] rounded-3xl p-6 border border-gray-800 shadow-xl overflow-hidden relative">

              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative z-10">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-gray-400 font-medium">Scanned via e-Invoicing engine</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{report.siteName}</h3>
                    <p className="text-sm font-mono text-amber-400 mt-1 flex items-center gap-1.5 group cursor-pointer hover:underline">
                      <Globe className="w-4 h-4 shrink-0" />
                      {report.url}
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </p>
                  </div>

                  {/* Estimated fetch payload */}
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold leading-none">Response Latency</span>
                        <span className="text-xs text-slate-200 font-mono font-bold">{report.responseTime} ms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold leading-none">Document Size</span>
                        <span className="text-xs text-slate-200 font-mono font-bold">{report.pageSize} KB</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold leading-none">Trust Factor</span>
                        <span className="text-xs text-emerald-400 font-mono font-bold">Authorized Agent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-3/5">
                  <ScoreGauge score={report.scores.seo} label="SEO Status" description="Tag density & rich schemas" color="blue" />
                  <ScoreGauge score={report.scores.performance} label="Performance" description="Assets, lazyloading buffers" color="amber" />
                  <ScoreGauge score={report.scores.mobile} label="Mobile Vibe" description="Table viewport responsive" color="rose" />
                  <ScoreGauge score={report.scores.security} label="SSL & Trust" description="SST guidelines readiness" color="emerald" />
                </div>
              </div>
            </div>

            {/* Structured Tab Switcher Container */}
            <div className="flex flex-col space-y-6">
              <div className="bg-[#12192e]/60 backdrop-blur-md p-1.5 rounded-xl border border-gray-800 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "overview" ? "bg-amber-500 text-[#070a13] shadow-md" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}
                >
                  <Info className="w-3.5 h-3.5" />
                  Core Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "seo" ? "bg-amber-500 text-[#070a13] shadow-md" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}
                >
                  <Search className="w-3.5 h-3.5" />
                  Technical SEO
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("copywriting")}
                  className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "copywriting" ? "bg-amber-500 text-[#070a13] shadow-md" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  LHDN Copywriting
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("design")}
                  className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "design" ? "bg-amber-500 text-[#070a13] shadow-md" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  Design aesthetics
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plan")}
                  className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === "plan" ? "bg-emerald-500 text-[#070a13] shadow-md" : "text-gray-400 hover:text-white hover:bg-gray-800/40"}`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Action roadmap
                </button>
              </div>

              {/* Tab Content display areas */}
              <div className="min-h-[400px]">
                
                {/* 1. Core Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left block - corporate overview */}
                    <div className="md:col-span-7 space-y-6">
                      <div className={CARD_STYLE}>
                        <div className="flex items-center gap-2.5 mb-4 border-b border-gray-800 pb-3">
                          <Compass className="text-amber-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white uppercase tracking-tight">Market Segment & Core Audience</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Primary Sector</span>
                            <p className="text-sm text-slate-200 font-semibold">{report.overview.industry}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Target Business Buying Personae</span>
                            <p className="text-sm text-slate-300 leading-relaxed">{report.overview.targetAudience}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Value Statement Outline</span>
                            <p className="text-sm text-emerald-400 leading-relaxed italic">{report.overview.coreOffering}</p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive POS and Peripherals Hardware Suite Showcase (User Requested Option) */}
                      <div className="bg-[#111625]/80 backdrop-blur-md rounded-2xl border border-gray-800 p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 shadow-lg space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                              <h4 className="text-sm font-extrabold text-white tracking-widest uppercase font-sans">
                                POS AND PERIPHERALS
                              </h4>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-1">
                              Bespoke hardware configurations certified for corporate taxation and LHDN sandbox integration.
                            </p>
                          </div>
                          <span className="self-start sm:self-auto px-2 py-0.5 rounded text-[9px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold tracking-wide">
                            BUS ADAPTER v2.4
                          </span>
                        </div>

                        {/* Responsive Peripherals Grid Selector */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {POS_HARDWARE_ITEMS.map((item) => {
                            const IconComponent = item.icon;
                            const isSelected = selectedHardware === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setSelectedHardware(item.id);
                                  setHwTestStatus(null);
                                }}
                                className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                                  isSelected
                                    ? "bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                                    : "bg-[#0b0f1a]/80 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-amber-500" />
                                )}
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className={`p-1.5 rounded-lg transition-colors ${
                                    isSelected ? "bg-amber-500/20 text-amber-400" : "bg-gray-900 text-gray-500 group-hover:text-gray-300"
                                  }`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[8px] font-mono font-bold text-gray-500 group-hover:text-amber-500/60 transition-colors">
                                    COM{POS_HARDWARE_ITEMS.findIndex(i => i.id === item.id) + 1}
                                  </span>
                                </div>
                                <h5 className="text-[11px] font-bold tracking-tight block truncate leading-none">
                                  {item.name}
                                </h5>
                                <span className="text-[9px] text-gray-500 block truncate font-sans mt-0.5">
                                  {item.sub}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Specifications Panel & Simulated Vector Interface */}
                        {(() => {
                          const activeItem = POS_HARDWARE_ITEMS.find((i) => i.id === selectedHardware) || POS_HARDWARE_ITEMS[0];
                          const MatchIcon = activeItem.icon;
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2 border-t border-gray-800/60">
                              
                              {/* Spec Sheet Column */}
                              <div className="md:col-span-7 space-y-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded leading-none">
                                      {activeItem.status}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-bold text-white uppercase tracking-tight mt-1">
                                    {activeItem.name} Specification
                                  </h4>
                                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                                    {activeItem.role}
                                  </p>
                                </div>

                                <div className="bg-[#080b13]/90 rounded-xl border border-gray-900 p-3.5 space-y-2">
                                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block border-b border-gray-800/80 pb-1.5 mb-1.5">
                                    Low-Level Port Attributes
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                                    {activeItem.specs.map((spec, sIdx) => (
                                      <div key={sIdx} className="flex justify-between items-center sm:block">
                                        <span className="text-gray-500 block sm:inline">{spec.key}:</span>
                                        <span className="text-slate-300 block sm:inline sm:ml-1 font-semibold">{spec.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Vector Blueprint Mock / Signal Diagnostic Panel */}
                              <div className="md:col-span-5 flex flex-col justify-between bg-[#0b0f1a] rounded-xl border border-gray-900 p-4 relative overflow-hidden min-h-[180px]">
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
                                
                                <div className="relative z-10 flex items-center justify-between border-b border-gray-900 pb-2 mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <MatchIcon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                                    <span className="text-[9px] font-mono text-slate-300 font-bold uppercase">
                                      {activeItem.id.toUpperCase()}_DEV_CONN
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[8px] font-mono text-emerald-400 font-bold">ONLINE</span>
                                  </div>
                                </div>

                                {/* Dynamic Tailwind-rendered outline blueprint model visualization */}
                                <div className="flex-1 flex items-center justify-center p-3">
                                  {activeItem.id === "terminal" && (
                                    <div className="w-24 h-20 border border-amber-600/30 bg-amber-500/5 rounded-lg p-1.5 flex flex-col justify-between relative shadow-inner">
                                      <div className="w-full h-12 border border-amber-500/40 rounded flex flex-col items-center justify-center bg-gray-950/80 relative">
                                        <span className="text-[8px] font-mono text-amber-400 font-semibold leading-none">[RM 165.04]</span>
                                        <span className="text-[6px] font-mono text-gray-500 mt-1">LHDN-CONNECT</span>
                                      </div>
                                      <div className="w-10 h-3 bg-amber-600/30 mx-auto rounded-b border-t border-amber-500/40" />
                                      <div className="w-14 h-1 bg-amber-600/40 mx-auto rounded-full" />
                                    </div>
                                  )}
                                  {activeItem.id === "printer" && (
                                    <div className="w-20 h-20 border border-amber-600/30 bg-amber-500/5 rounded p-2 flex flex-col justify-between relative">
                                      <div className="w-14 h-2 bg-gray-950 border border-amber-500/30 mx-auto rounded-sm relative overflow-hidden">
                                        <div className="absolute top-0 bottom-0 left-1 right-1 bg-amber-500/40 animate-pulse" />
                                      </div>
                                      <div className="w-full h-8 bg-gray-950/80 border border-gray-900 rounded p-1 flex flex-col justify-center gap-0.5">
                                        <div className="w-10 h-0.5 bg-gray-500 rounded" />
                                        <div className="w-12 h-0.5 bg-gray-500 rounded" />
                                        <div className="w-8 h-0.5 bg-gray-500 rounded" />
                                      </div>
                                      <div className="text-[6px] font-mono text-center text-amber-500 font-bold tracking-widest uppercase">
                                        SLIP_OUT
                                      </div>
                                    </div>
                                  )}
                                  {activeItem.id === "scanner" && (
                                    <div className="w-16 h-20 flex flex-col items-center justify-center relative">
                                      <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center relative">
                                        <ScanLine className="w-6 h-6 text-amber-400 animate-pulse" />
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-bounce" />
                                      </div>
                                      <div className="w-6 h-8 bg-amber-950/40 border border-amber-500/20 rounded-b mt-1" />
                                    </div>
                                  )}
                                  {activeItem.id === "drawer" && (
                                    <div className="w-24 h-14 border border-amber-600/30 bg-amber-500/5 rounded p-1 flex flex-col justify-between shadow-inner">
                                      <div className="w-full h-1 bg-amber-500/40 rounded-full" />
                                      <div className="grid grid-cols-4 gap-1 flex-1 mt-1.5">
                                        <div className="border border-gray-800 bg-gray-950 rounded flex items-center justify-center"><div className="w-1 h-3 bg-amber-500/10 rounded" /></div>
                                        <div className="border border-gray-800 bg-gray-950 rounded flex items-center justify-center"><div className="w-1 h-3 bg-amber-500/10 rounded" /></div>
                                        <div className="border border-gray-800 bg-gray-950 rounded flex items-center justify-center"><div className="w-1 h-3 bg-amber-500/10 rounded" /></div>
                                        <div className="border border-gray-800 bg-gray-950 rounded flex items-center justify-center"><div className="w-1 h-3 bg-amber-500/10 rounded" /></div>
                                      </div>
                                      <div className="w-full h-1.5 bg-gray-950 border-t border-gray-900 rounded-b mt-1 flex items-center justify-center relative">
                                        <div className="w-3 h-0.5 bg-gray-800 rounded" />
                                      </div>
                                    </div>
                                  )}
                                  {activeItem.id === "display" && (
                                    <div className="w-24 h-20 flex flex-col items-center relative gap-1">
                                      <div className="w-full h-8 border border-amber-500/30 bg-gray-950 rounded p-1 flex items-center justify-center">
                                        <span className="font-mono text-[8px] text-emerald-400 leading-none tracking-widest font-bold">TOTAL: RM165.04</span>
                                      </div>
                                      <div className="w-2 h-7 bg-amber-600/20 border-x border-amber-500/20" />
                                      <div className="w-10 h-2 bg-amber-600/30 rounded" />
                                    </div>
                                  )}
                                  {activeItem.id === "scale" && (
                                    <div className="w-24 h-16 flex flex-col justify-between relative">
                                      <div className="w-full h-1.5 bg-amber-500/20 border border-amber-500/40 rounded-t" />
                                      <div className="flex-1 bg-gray-950/80 border-x border-b border-gray-900 p-1 flex flex-col justify-end">
                                        <div className="w-12 h-4 border border-amber-500/30 bg-black rounded mx-auto flex items-center justify-center px-1">
                                          <span className="text-[8px] font-mono text-amber-400 font-bold">1.405 KG</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {activeItem.id === "mobile" && (
                                    <div className="w-12 h-20 border border-amber-500/30 bg-amber-500/5 rounded-lg p-1 flex flex-col justify-between">
                                      <div className="w-full h-1 bg-gray-950 rounded-sm" />
                                      <div className="flex-1 bg-gray-950/80 border border-gray-900 rounded-md my-1 flex items-center justify-center relative">
                                        <span className="text-[6px] font-mono text-amber-500 font-bold uppercase tracking-tighter">ORDER_PAD</span>
                                      </div>
                                      <div className="flex justify-between items-center px-1">
                                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                                        <div className="w-4 h-0.5 bg-gray-500 rounded-full" />
                                        <div className="w-1 h-0.5 bg-gray-500 rounded-full" />
                                      </div>
                                    </div>
                                  )}
                                  {activeItem.id === "msr" && (
                                    <div className="w-20 h-12 border border-amber-500/30 bg-amber-500/10 rounded p-1 flex items-center justify-center gap-1.5 relative">
                                      <div className="w-full h-2 bg-gray-950 rounded-sm relative">
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-500/40" />
                                      </div>
                                      <div className="absolute left-6 w-8 h-8 border-y-2 border-dashed border-red-500/40 rounded-full animate-spin pointer-events-none" />
                                      <CreditCard className="w-6 h-6 text-amber-400 absolute right-4" />
                                    </div>
                                  )}
                                </div>

                                {/* Dynamic Diagnostics response box */}
                                <div className="space-y-2 relative z-10">
                                  {hwTestStatus ? (
                                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono text-amber-300 leading-tight">
                                      {hwTestStatus}
                                    </div>
                                  ) : (
                                    <div className="p-2 rounded bg-gray-900/60 border border-gray-900 text-[9px] font-mono text-gray-500 italic text-center">
                                      Diagnose serial hardware stream
                                    </div>
                                  )}

                                  <button
                                    type="button"
                                    disabled={isHwTesting}
                                    onClick={() => testSelectedHardware(activeItem.id)}
                                    className="w-full py-1.5 rounded bg-amber-500 hover:bg-amber-400 disabled:bg-gray-850 hover:shadow-lg disabled:opacity-50 text-black font-mono font-bold text-[10px] uppercase transition-all duration-200"
                                  >
                                    {isHwTesting ? "Querying Bus..." : `Test ${activeItem.name}`}
                                  </button>
                                </div>
                              </div>

                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Right block - technical framework detection & trust metrics */}
                    <div className="md:col-span-5 space-y-6">
                      <div className={CARD_STYLE}>
                        <div className="flex items-center gap-2.5 mb-4 border-b border-gray-800 pb-3">
                          <Cpu className="text-emerald-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white uppercase tracking-tight">Tech Stack Signature</h4>
                        </div>
                        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                          We successfully registered these running systems behind the target website port. These indicate potential speed and modernization vectors:
                        </p>
                        <TechStackBadges technologies={report.techStack} />
                      </div>

                      {/* Trust signals audit */}
                      <div className={CARD_STYLE}>
                        <div className="flex items-center gap-2.5 mb-4 border-b border-gray-800 pb-3">
                          <Award className="text-amber-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white uppercase tracking-tight">Trust Signal Assessments</h4>
                        </div>
                        <div className="space-y-3">
                          {report.overview.trustSignals.map((signal, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2.5">
                              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-200">{signal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. SEO & Technical Audit Tab */}
                {activeTab === "seo" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {/* Meta crawlers details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={CARD_STYLE}>
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                          <Globe className="text-blue-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white">Parsed Page Meta Tags</h4>
                        </div>
                        <div className="space-y-3 font-mono text-xs text-slate-300">
                          <div className="p-2.5 bg-[#090d16] rounded-xl border border-gray-900">
                            <span className="text-[9px] uppercase font-bold text-amber-400 block mb-1">&lt;title&gt; tag</span>
                            <span className="font-sans text-xs text-gray-200 font-semibold">{report.meta.title}</span>
                          </div>
                          <div className="p-2.5 bg-[#090d16] rounded-xl border border-gray-900">
                            <span className="text-[9px] uppercase font-bold text-amber-400 block mb-1">meta description</span>
                            <span className="font-sans text-xs text-gray-300 leading-relaxed block">{report.meta.description || "N/A"}</span>
                          </div>
                          <div className="p-2.5 bg-[#090d16] rounded-xl border border-gray-900">
                            <span className="text-[9px] uppercase font-bold text-amber-400 block mb-1">primary &lt;h1&gt; anchor</span>
                            <span className="font-sans text-xs text-slate-200">{report.meta.h1 || "None identified."}</span>
                          </div>
                        </div>
                      </div>

                      {/* SEO Strengths list */}
                      <div className={CARD_STYLE}>
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                          <CheckCircle className="text-emerald-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white">Identified Site Strengths</h4>
                        </div>
                        <div className="space-y-3.5">
                          {report.seoAudit.strengths.map((strength, strIdx) => (
                            <div key={strIdx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 mt-0.5">
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                              </div>
                              <span className="text-xs text-gray-300 leading-relaxed">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Technical Warnings */}
                    <div className={CARD_STYLE}>
                      <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                        <AlertTriangle className="text-amber-500 w-5 h-5" />
                        <h4 className="text-md font-bold text-white">Required Technical Code Refactorings</h4>
                      </div>
                      <div className="divide-y divide-gray-800/60 space-y-4">
                        {report.seoAudit.detailedIssues.map((issue, issueIdx) => {
                          const isHigh = issue.severity === "high";
                          const isMed = issue.severity === "medium";
                          return (
                            <div key={issueIdx} className="pt-4 first:pt-0 flex flex-col md:flex-row gap-4 items-start justify-between">
                              <div className="space-y-1 md:w-3/5">
                                <div className="flex items-center gap-2.5">
                                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${isHigh ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : isMed ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-slate-400"}`}>
                                    {issue.severity} priority
                                  </span>
                                  <h5 className="text-xs font-bold text-white tracking-tight">{issue.title}</h5>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">{issue.recommendation}</p>
                              </div>
                              <div className="bg-[#090d16] p-3 rounded-xl border border-gray-900 md:w-1/3 text-xs flex flex-col gap-1">
                                <span className="text-[8px] uppercase tracking-wider font-bold text-gray-500">Suggested Patch code</span>
                                <code className="text-[10px] text-amber-400 font-mono break-all leading-tight">
                                  {isHigh ? '<picture>\n  <source srcset="banner.webp" type="image/webp">\n  <img src="banner.jpg">\n</picture>' : 'table {\n  display: block;\n  overflow-x: auto;\n}'}
                                </code>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. LHDN Copywriting Tab */}
                {activeTab === "copywriting" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: copywriting feedback briefing */}
                      <div className="md:col-span-4 space-y-6">
                        <div className={CARD_STYLE}>
                          <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-amber-400">Tone Analysis</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-4">{report.copyAudit.tone}</p>
                          
                          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-amber-400">Value Proposition Assessment</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-1">{report.copyAudit.valuePropClarity}</p>
                        </div>

                        <div className={CARD_STYLE}>
                          <div className="flex items-center gap-2 text-indigo-400 mb-3">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <h4 className="text-xs font-bold uppercase tracking-wider font-sans">SST & LHDN Compliance Term checklist</h4>
                          </div>
                          <div className="space-y-2 opacity-85">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>LHDN SDK Setup: Checked</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>e-Invoicing sandbox: Ready</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>SST direct compliance logs: Verify</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Comparative Interactive Sandbox playground */}
                      <div className="md:col-span-8 flex flex-col gap-6">
                        <div className={CARD_STYLE}>
                          <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                            <div className="flex items-center gap-2.5">
                              <Sparkles className="text-amber-400 w-5 h-5" />
                              <h4 className="text-md font-bold text-white">Dynamic Copywriter Sandbox</h4>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">LIVE COMPARISON TOOL</span>
                          </div>

                          <p className="text-xs text-gray-400 leading-relaxed mb-4">
                            Slightly text-heavy or dry headlines limit local lead conversions. Refactor technical definitions into active solutions:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Original */}
                            <div className="p-4 bg-[#090d16] rounded-xl border border-gray-900 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-mono uppercase bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded font-bold">
                                  Original Text (Density heavy)
                                </span>
                                <textarea
                                  className="w-full bg-transparent text-gray-350 text-xs mt-3 h-24 focus:outline-none resize-none leading-relaxed"
                                  value={playOriginal}
                                  onChange={(e) => setPlayOriginal(e.target.value)}
                                />
                              </div>
                              <span className="text-[10px] text-gray-600 block mt-3 font-mono">Length: {playOriginal.length} characters</span>
                            </div>

                            {/* Rewritten */}
                            <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 flex flex-col justify-between relative">
                              <div className="absolute top-3 right-3 text-amber-400">
                                <Sparkle className="w-4 h-4 animate-spin-slow" />
                              </div>
                              <div>
                                <span className="text-[9px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                                  AI Suggested Hook (Clickable)
                                </span>
                                <textarea
                                  className="w-full bg-transparent text-slate-100 text-xs mt-3 h-24 focus:outline-none resize-none leading-relaxed font-semibold focus:text-white"
                                  value={playRewrite}
                                  onChange={(e) => setPlayRewrite(e.target.value)}
                                />
                              </div>
                              <span className="text-[10px] text-amber-400/70 block mt-3 font-mono">Length: {playRewrite.length} characters</span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500">Test other variants by typing in either box</span>
                            <button
                              type="button"
                              onClick={() => {
                                setPlayRewrite("Seamless cloud-hosted SQL Account setup. Configured by Platinum engineering agents to assure state e-Invoicing compliance.");
                              }}
                              className="text-xs text-amber-400 hover:text-white flex items-center gap-1 font-semibold"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Cycle alternate options
                            </button>
                          </div>
                        </div>

                        {/* List of text ideas */}
                        <div className={CARD_STYLE}>
                          <h4 className="text-xs font-bold text-white mb-3">Copywriter recommendations:</h4>
                          <ul className="space-y-3.5">
                            {report.copyAudit.suggestions.map((sug, sugIdx) => (
                              <li key={sugIdx} className="text-xs text-gray-300 leading-relaxed flex items-start gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-amber-400/10 flex items-center justify-center text-[10px] text-amber-400 shrink-0 font-mono font-bold mt-0.5">
                                  {sugIdx + 1}
                                </div>
                                <span className="text-gray-300 leading-relaxed">{sug}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 4. Design & Usability Tab */}
                {activeTab === "design" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: visual architecture critique */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className={CARD_STYLE}>
                          <h4 className="text-xs font-bold tracking-wider text-amber-400 uppercase mb-3">Current Grid Style Report</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{report.designAudit.layoutStyle}</p>
                        </div>
                        <div className={CARD_STYLE}>
                          <h4 className="text-xs font-bold tracking-wider text-amber-400 uppercase mb-3">Typography & Microcopy assessment</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{report.designAudit.typographyFeel}</p>
                        </div>
                        <div className={CARD_STYLE}>
                          <h4 className="text-xs font-bold tracking-wider text-rose-400 uppercase mb-3">Mobile Usability Review</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{report.designAudit.mobileResponsiveAudit}</p>
                        </div>
                      </div>

                      {/* Right: Premium CSS Simulator Panel */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className={CARD_STYLE}>
                          <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                            <div className="flex items-center gap-2.5">
                              <Layout className="text-emerald-400 w-5 h-5" />
                              <h4 className="text-md font-bold text-white">Live CSS Layout Refiner Simulator</h4>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">INTERACTIVE MOCKUP</span>
                          </div>

                          <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Experiment with modern typographic styles from our audit blueprint to witness the transformative vibe shift directly:
                          </p>

                          {/* Control sliders/buttons */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Typography Pair</span>
                              <div className="flex flex-col gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSimPairing("standard")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simPairing === "standard" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  Segoe UI / Arial
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSimPairing("modern")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simPairing === "modern" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  Space Grotesk
                                </button>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Line Height Grid</span>
                              <div className="flex flex-col gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSimLineHeight("compressed")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simLineHeight === "compressed" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  Compressed (1.2)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSimLineHeight("spacious")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simLineHeight === "spacious" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  Spacious (1.6)
                                </button>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Card Borders Vibe</span>
                              <div className="flex flex-col gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSimTheme("vintage")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simTheme === "vintage" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  Standard Shadows
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSimTheme("amber-gold")}
                                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg border font-mono ${simTheme === "amber-gold" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-gray-900 border-gray-850 text-gray-400"}`}
                                >
                                  obsidian Gold Cut
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Dynamic live simulation preview box */}
                          <div className={`p-5 rounded-2xl border transition-all duration-300 ${simTheme === "amber-gold" ? "bg-[#0c0f18] border-amber-500/30 shadow-lg shadow-amber-500/5" : "bg-slate-900 border-slate-800"}`}>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] uppercase tracking-wider font-mono text-amber-400/80 font-bold">Revamped Hero Area</span>
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                              </div>
                            </div>

                            <h5 className={`font-bold text-white tracking-tight ${simPairing === "modern" ? "text-xl font-display uppercase font-mono tracking-wide" : "text-md font-sans"}`}>
                              SST compliant SQL accounting solutions for high growing businesses in Penang
                            </h5>

                            <p className={`text-xs text-gray-400 mt-2.5 border-t border-gray-800/60 pt-3 ${simLineHeight === "spacious" ? "leading-relaxed" : "leading-none"}`}>
                              Ensure complete local compliance during state e-Invoicing declarations. Our authorized platinum engineers implement, check, and optimize your database backup protocols within 24 hours. No hidden fees.
                            </p>

                            <div className="mt-4 flex gap-2">
                              <button type="button" className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-[10px] rounded uppercase">
                                Consultation
                              </button>
                              <button type="button" className="px-3.5 py-1.5 bg-transparent border border-gray-800 text-gray-300 text-[10px] rounded uppercase">
                                Read details
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* List of recommended improvements in code format */}
                        <div className={CARD_STYLE}>
                          <h4 className="text-xs font-bold text-white mb-2">Crawl recommendations for UI developer team:</h4>
                          <div className="space-y-2">
                            {report.designAudit.improvements.map((imp, impIdx) => (
                              <div key={impIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono py-1">
                                <span className="text-amber-400 font-bold">{`#${impIdx + 1}`}</span>
                                <span>{imp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* 5. Complete Priority Action Roadmap checklist */}
                {activeTab === "plan" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className={CARD_STYLE}>
                      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className="text-emerald-400 w-5 h-5" />
                          <h4 className="text-md font-bold text-white">Priority Roadmap checklist</h4>
                        </div>
                        <span className="text-xs font-mono text-emerald-400">TRACK PROGRESS</span>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-6">
                        Click on each priority item block beneath to mark it as resolved as your developer team rolls out structural patches to enhance user conversion rates:
                      </p>

                      <div className="space-y-3">
                        {report.actionPlan.map((action, actionIdx) => {
                          const isCritical = action.priority === "CRITICAL";
                          const isHigh = action.priority === "HIGH";
                          const isMed = action.priority === "MEDIUM";

                          return (
                            <div
                              key={actionIdx}
                              onClick={() => toggleActionItem(actionIdx)}
                              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 select-none ${action.completed ? "bg-slate-950/40 border-gray-850 opacity-55" : "bg-[#141b2a] border-gray-800 hover:border-amber-500/30"}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${action.completed ? "bg-emerald-500 border-emerald-600 text-[#070a13]" : "border-gray-700"}`}>
                                  {action.completed && <CheckCircle className="w-3.5 h-3.5" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2.5">
                                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${isCritical ? "bg-rose-500/15 text-rose-400 border border-rose-500/20" : isHigh ? "bg-orange-500/15 text-orange-400 border border-orange-500/20" : isMed ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "bg-emerald-500/15 text-emerald-400"}`}>
                                      {action.priority}
                                    </span>
                                    <span className={`text-xs font-bold ${action.completed ? "line-through text-gray-500" : "text-white"}`}>
                                      {action.item}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="block text-[8px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">DUR ESTIMATE</span>
                                <span className={`text-xs font-mono font-bold ${action.completed ? "text-gray-500" : "text-amber-400"}`}>
                                  {action.estimate}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer overview stats */}
                      <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Total Checklist Progress: {report.actionPlan.filter((a) => a.completed).length} of {report.actionPlan.length} resolved
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setReport({
                              ...report,
                              actionPlan: report.actionPlan.map((p) => ({ ...p, completed: false }))
                            });
                          }}
                          className="text-[#070a13] bg-amber-400 hover:bg-amber-300 font-bold px-3 py-1.5 rounded text-[10px] uppercase font-mono transition-colors"
                        >
                          Reset checkboxes
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        )}

        {/* POS and Peripherals Blueprint Diagram Section */}
        <section className="mt-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5 animate-pulse" />
              Hardware Visualization
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight animate-fade-in">
              POS and Peripherals Suite
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Detailed technical blueprint of the hardware ecosystem components designed for secure Malaysian SST sales points and high-traffic retail flows.
            </p>
          </div>

          <div className="bg-[#111625]/80 backdrop-blur-md rounded-3xl border border-gray-850 p-4 sm:p-6 overflow-hidden shadow-2xl transition-all duration-300 hover:border-amber-500/20">
            <div className="relative group rounded-2xl overflow-hidden bg-[#0d111d] border border-gray-800">
              <img 
                src="/src/assets/images/pos_and_peripherals_diagram_1782096330900.jpg" 
                alt="POS and Peripherals Architecture Blueprint Matrix" 
                className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
                <span className="text-[10px] font-mono text-amber-400/90 bg-gray-950/80 px-2.5 py-1 rounded border border-gray-800 font-bold uppercase tracking-wider">
                  Reference Diagram: Active COM ports & cash checkout paths
                </span>
                <span className="text-[9px] font-mono text-gray-400 bg-gray-950/90 px-2.5 py-1 rounded border border-gray-800">
                  Model code: POSECO-SYS-2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Trust & Testimonials Showcase */}
        <section className="mt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              SME Client Testimonials
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trusted by leading Malaysian Enterprises & Tax Specialists
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Read how accountants, business owners, and developers transitioned old compliance infrastructure into polished, modern software layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111625]/70 border border-gray-800 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full opacity-60 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {"★".repeat(5).split("").map((star, idx) => (
                    <span key={idx} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Setting up dual-language SQL Account ledger and POS hardware used to take weeks. With EC Soft's compliance-hardened template audits, we cleared our LHDN e-Invoicing sandbox test in 48 hours."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">
                  TK
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Mr. Tan Kah Seng</h5>
                  <p className="text-[10px] text-gray-500">MD, Kean Hing Retail Groups</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111625]/70 border border-gray-800 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full opacity-60 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {"★".repeat(5).split("").map((star, idx) => (
                    <span key={idx} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "The mobile responsiveness on our old team payroll table was a nightmare. Moving to the modern Space Grotesk layout suggested by their designers made mobile slip sign-offs effortless."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">
                  MO
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Melissa Ong</h5>
                  <p className="text-[10px] text-gray-500">HR Director, AeroTech Solutions KL</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111625]/70 border border-gray-800 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full opacity-60 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {"★".repeat(5).split("").map((star, idx) => (
                    <span key={idx} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Usually, digital audits are filled with generic metrics. EC Soft's core action plan points directly to the SST taxonomy gaps in our web forms. Absolute masterclass in local compliance execution."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
                  AK
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Dato' Sri Arman Khalid</h5>
                  <p className="text-[10px] text-gray-500">Chief Accountant, Selangor Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ECsoft Point of Sales Corporate Desk & Branch Coordinates */}
        <section id="contact-section" className="mt-16 bg-gradient-to-r from-[#111625]/90 to-[#0e1220]/90 border border-gray-800/80 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                Physical Branch & POS Operations Hub
              </div>
              <h4 className="text-xl font-extrabold text-white tracking-tight">
                ECsoft Point of Sales
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-xl flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>No.21, Jalan Maznah , Kg.Jawa 41200 Klang, Selangor</span>
              </p>
            </div>

            <div className="bg-[#181f33]/60 border border-gray-800 rounded-xl p-4 flex items-center gap-4 shrink-0 min-w-[240px]">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">
                  Immediate Hotline Support
                </span>
                <a href="tel:0162341234" className="text-sm font-bold text-white hover:text-amber-400 transition-colors font-mono">
                  H/P : 0162341234
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Informative interactive guideline block at bottom */}
        <section className="mt-16 bg-[#0f1422]/60 border border-gray-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md">

          <div className="max-w-3xl relative z-10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Why with us?
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              When analyzing e-Commerce packages and accounting tools for the Malaysian business sector, we verify critical compliance landmarks such as direct **SST taxation parameters**, and **LHDN e-Invoicing guidelines** compatibility schemas. Elevating simple graphics into high-fidelity custom website designs converts cold traffic into committed, long-term premium enterprise contracts.
            </p>
          </div>
        </section>

      </main>

      {/* Floating Status Bar Footer */}
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0e1220]/90 backdrop-blur-md border border-gray-800/80 rounded-full px-5 py-2.5 flex items-center gap-4 shadow-xl z-50 text-xs">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM_ONLINE
        </span>
        <span className="text-gray-600">|</span>
        <span className="text-slate-300 font-medium">EC Soft Digital Audit Core Applet</span>
        <span className="text-gray-650">|</span>
        <button
          type="button"
          onClick={() => {
            setIsAdminOpen(true);
            setAdminPasscode("");
            setAdminError(null);
            // Pre-fetch if already authorized
            if (isAdminAuthorized) {
              fetchAppointments();
            }
          }}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-all cursor-pointer bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 hover:bg-amber-500/20"
        >
          <Lock className="w-3 h-3 text-amber-400 shrink-0" />
          CRM PORTAL
        </button>
      </footer>

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {isAppointmentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAppointmentModalOpen(false);
                setBookingSuccess(false);
                setBookingError(null);
              }}
              className="absolute inset-0 bg-gray-950/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#111625] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-850 flex items-center justify-between bg-gradient-to-r from-gray-950 to-gray-900 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight uppercase">
                      Make Appointment
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      ECSOFT Software Solution (Since 1999)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAppointmentModalOpen(false);
                    setBookingSuccess(false);
                    setBookingError(null);
                  }}
                  className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-850 hover:border-red-500/20 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" id="crm_modal_scroll_viewport">
                {bookingSuccess ? (
                  // BOOKING ENTIRELY SUCCESSFUL SCREEN
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-white">
                        Lead Stored in CRM Database!
                      </h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                        Excellent, <span className="text-amber-400 font-bold">{bookingName}</span>. Your details were writing-verified and successfully persisted to the CRM Database.
                      </p>
                      <div className="bg-slate-900 border border-gray-800 rounded-xl p-3 max-w-sm mx-auto text-left space-y-1.5 text-[11px] font-mono">
                        <p className="text-white"><span className="text-gray-500">NAME:</span> {bookingName}</p>
                        <p className="text-white"><span className="text-gray-500">EMAIL:</span> {bookingEmail}</p>
                        <p className="text-white"><span className="text-gray-500">PHONE:</span> {bookingPhone}</p>
                        <p className="text-white"><span className="text-gray-500">SLOT:</span> {bookingDate} @ {bookingTime}</p>
                        <p className="text-amber-400 text-[10px] pt-1 border-t border-gray-850 flex items-center justify-between">
                          <span>DATA SECURELY STORED</span>
                          <span>STATUS: PENDING ⚙️</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppointmentModalOpen(false);
                          setBookingSuccess(false);
                          setBookingName("");
                          setBookingEmail("");
                          setBookingPhone("");
                          setBookingCompany("");
                          setBookingNotes("");
                          setBookingError(null);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-sans font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Finish
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // REGULAR BOOKING FORM VIEW
                  <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                    {bookingError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {bookingError}
                      </div>
                    )}

                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-[11px] text-gray-300 leading-relaxed font-sans">
                      Select date, time, and service credentials to establish a direct e-invoicing audit appointment securely in our cloud-backed CRM system.
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Select Compliance or Hardware Service
                      </label>
                      <select
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full bg-[#181f33] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="SST / LHDN e-Invoicing Compliance Consultation">SST / LHDN e-Invoicing Compliance Consultation</option>
                        <option value="Retail POS System Showcase & Hardware Setup">Retail POS System Showcase & Hardware Setup</option>
                        <option value="SQL Payroll & SQL Account System Integration">SQL Payroll & SQL Account System Integration</option>
                        <option value="Legacy Portfolios Aesthetic Audit & Optimization">Legacy Portfolios Aesthetic Audit & Optimization</option>
                        <option value="Custom Software Engineering Consultation">Custom Software Engineering Consultation</option>
                      </select>
                    </div>

                    {/* Two Column Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
                        />
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Your Full Name *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-gray-500">
                          <Smile className="w-3.5 h-3.5" />
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. Tan Ah Kow"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 font-sans"
                        />
                      </div>
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                          Email Address *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-gray-500">
                            <Mail className="w-3.5 h-3.5" />
                          </span>
                          <input
                            type="email"
                            placeholder="e.g. tan@aerotech.com"
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            className="w-full bg-[#181f33] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 font-sans"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                          Phone Number *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-gray-500">
                            <Phone className="w-3.5 h-3.5" />
                          </span>
                          <input
                            type="tel"
                            placeholder="e.g. 012-3456789"
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            className="w-full bg-[#181f33] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Company Name (Optional)
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-gray-500">
                          <Building className="w-3.5 h-3.5" />
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. AeroTech Solutions Sdn Bhd"
                          value={bookingCompany}
                          onChange={(e) => setBookingCompany(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 font-sans"
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Describe any software constraints or requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Integration with accounting packages or compliant billing terminals."
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="w-full bg-[#181f33] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 resize-none font-sans mt-1"
                      />
                    </div>

                    {/* Form Controls */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAppointmentModalOpen(false);
                          setBookingError(null);
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-750 text-slate-300 font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingBooking}
                        className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-sans font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2"
                      >
                        {isSubmittingBooking ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Confirm Booking & Save"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-850 bg-gray-950 text-center">
                <span className="text-[9px] font-mono text-gray-500">
                  Compliance assurance since 1999 • ISO Audits Approved
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secure Admin/Operational CRM Portal */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAdminOpen(false);
                setAdminError(null);
              }}
              className="absolute inset-0 bg-gray-950/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full ${
                isAdminAuthorized ? "max-w-4xl" : "max-w-md"
              } bg-[#111625] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 transition-all duration-300`}
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-850 flex items-center justify-between bg-gradient-to-r from-gray-950 to-[#161c2d] gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight uppercase">
                      {isAdminAuthorized ? "ECSOFT Secure Admin CRM" : "CRM Access Terminal"}
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      Google Cloud Firestore Live Integration
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isAdminAuthorized && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsResetPasscodeOpen(!isResetPasscodeOpen);
                          setResetPasscodeError(null);
                          setResetPasscodeSuccess(null);
                          setCurrentResetPasscode("");
                          setNewResetPasscode("");
                        }}
                        className={`px-2.5 py-1 text-[9px] font-mono font-bold border rounded transition-all cursor-pointer ${
                          isResetPasscodeOpen 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20" 
                          : "bg-gray-800 text-gray-350 border-gray-700 hover:bg-gray-750"
                        }`}
                      >
                        🔑 {isResetPasscodeOpen ? "Cancel Change" : "Change Passcode"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAdminAuthorized(false);
                          setAdminPasscode("");
                          setIsResetPasscodeOpen(false);
                        }}
                        className="px-2.5 py-1 text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 rounded transition-all cursor-pointer"
                      >
                        🔒 Lock Console
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminOpen(false);
                      setAdminError(null);
                    }}
                    className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-850 hover:border-red-500/20 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {!isAdminAuthorized ? (
                  // LOCK SCREEN / PASSCODE CHALLENGE
                  <div className="py-6 space-y-6 max-w-sm mx-auto text-center">
                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/5">
                      <Lock className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Authentication Required
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        This administrative section retrieves customer records directly from your backend Google Firestore table. Enter the system master passcode to sync.
                      </p>
                      <p className="text-[10px] text-amber-550 italic font-medium">
                        🔍 System Default Passcode: <span className="font-mono bg-amber-500/10 px-1 py-0.5 rounded text-amber-400 font-bold ml-1">1999</span> <span className="text-gray-500 font-normal">(unless customized)</span>
                      </p>
                    </div>

                    {adminError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {adminError}
                      </div>
                    )}

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsVerifying(true);
                        setAdminError(null);
                        try {
                          const response = await fetch("/api/admin/verify", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ passcode: adminPasscode })
                          });
                          const result = await response.json();
                          if (response.ok && result.success) {
                            setIsAdminAuthorized(true);
                            setAdminError(null);
                            fetchAppointments();
                          } else {
                            setAdminError(result.error || "Authentication failed.");
                          }
                        } catch (err) {
                          console.error("Passcode verification error:", err);
                          setAdminError("System connection error. Unable to verify passcode.");
                        } finally {
                          setIsVerifying(false);
                        }
                      }}
                      className="space-y-4 text-left"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                          Enter Master PIN / Passcode
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••"
                          disabled={isVerifying}
                          value={adminPasscode}
                          onChange={(e) => setAdminPasscode(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl p-3 text-center text-sm font-bold tracking-widest text-white focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-sans font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-95 cursor-pointer text-center disabled:opacity-50"
                      >
                        {isVerifying ? "Verifying..." : "Unlock Backend CRM Console"}
                      </button>
                    </form>
                  </div>
                ) : (
                  // AUTHORIZED ACTIVE DATABASE CRM SCREEN
                  <div className="space-y-4">
                    {/* CRM Toolbar */}
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search records by name, email, company, contact, notes..."
                          value={crmSearchQuery}
                          onChange={(e) => setCrmSearchQuery(e.target.value)}
                          className="w-full bg-[#181f33] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/40 font-sans"
                        />
                        {crmSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setCrmSearchQuery("")}
                            className="absolute right-3 top-2.5 text-[10px] text-gray-400 hover:text-white bg-slate-800 rounded px-1.5 py-0.5"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={fetchAppointments}
                        disabled={isLoadingAppointments}
                        className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-750 text-gray-300 border border-gray-850 hover:border-gray-800 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold"
                        title="Reload Firestore Table"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAppointments ? "animate-spin text-amber-400" : ""}`} />
                        <span>Force Sync</span>
                      </button>
                    </div>

                    {/* Status indicator bar */}
                    <div className="text-[10px] font-mono text-gray-400 flex items-center justify-between px-1 bg-gray-950/40 p-2.5 rounded-xl border border-gray-850">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Cloud Engine: <strong className="text-emerald-400">Google Firestore Active</strong></span>
                      </div>
                      <span className="text-amber-400 font-bold uppercase tracking-wider text-[9px]">Server Side Core Database</span>
                    </div>

                    {/* Collapsible Passcode Reset Panel */}
                    {isResetPasscodeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#181f33]/40 border border-gray-800 rounded-2xl p-4.5 space-y-3 shadow-md overflow-hidden text-left"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Key className="w-3.5 h-3.5 text-amber-500" />
                            Reset Master PIN / Passcode
                          </h4>
                          <span className="text-[9px] text-gray-500 font-mono">Durable Cloud Sync</span>
                        </div>

                        {resetPasscodeError && (
                          <div className="p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
                            ⚠️ {resetPasscodeError}
                          </div>
                        )}

                        {resetPasscodeSuccess && (
                          <div className="p-3 text-xs rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                            ✅ {resetPasscodeSuccess}
                          </div>
                        )}

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setResetPasscodeError(null);
                            setResetPasscodeSuccess(null);
                            setIsResetting(true);

                            if (newResetPasscode.length < 4) {
                              setResetPasscodeError("New passcode must be at least 4 characters long.");
                              setIsResetting(false);
                              return;
                            }

                            try {
                              const response = await fetch("/api/admin/reset", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                  currentPasscode: currentResetPasscode,
                                  newPasscode: newResetPasscode
                                })
                              });
                              const result = await response.json();
                              if (response.ok && result.success) {
                                setResetPasscodeSuccess(result.message || "Passcode updated successfully!");
                                setAdminPasscode(newResetPasscode); // Sync so future unlocks work out-of-the-box
                                setCurrentResetPasscode("");
                                setNewResetPasscode("");
                              } else {
                                setResetPasscodeError(result.error || "Failed to update passcode.");
                              }
                            } catch (err) {
                              console.error("Error resetting passcode:", err);
                              setResetPasscodeError("Could not connect to the authentication server.");
                            } finally {
                              setIsResetting(false);
                            }
                          }}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                        >
                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                              Current Passcode
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="••••"
                              disabled={isResetting}
                              value={currentResetPasscode}
                              onChange={(e) => setCurrentResetPasscode(e.target.value)}
                              className="w-full bg-[#111625] border border-gray-800 rounded-xl p-2.5 text-center text-xs font-bold text-white focus:outline-none focus:border-amber-500/40 disabled:opacity-50"
                            />
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                              New Passcode (min 4 char)
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="••••"
                              disabled={isResetting}
                              value={newResetPasscode}
                              onChange={(e) => setNewResetPasscode(e.target.value)}
                              className="w-full bg-[#111625] border border-gray-800 rounded-xl p-2.5 text-center text-xs font-bold text-white focus:outline-none focus:border-amber-500/40 disabled:opacity-50"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isResetting}
                            className="w-full h-[38px] rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center shadow-lg shadow-amber-500/5 active:scale-95 text-xs font-sans tracking-tight"
                          >
                            {isResetting ? "Updating..." : "Commit Change"}
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {isLoadingAppointments && appointmentsList.length === 0 ? (
                      <div className="py-16 text-center space-y-3">
                        <RefreshCw className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
                        <p className="text-xs text-gray-400">Retrieving secure, encrypted JSON & Firestore records...</p>
                      </div>
                    ) : (
                      (() => {
                        const filtered = appointmentsList.filter(apt => {
                          const query = crmSearchQuery.toLowerCase().trim();
                          if (!query) return true;
                          return (
                            (apt.name || "").toLowerCase().includes(query) ||
                            (apt.company || "").toLowerCase().includes(query) ||
                            (apt.email || "").toLowerCase().includes(query) ||
                            (apt.phone || "").toLowerCase().includes(query) ||
                            (apt.service || "").toLowerCase().includes(query) ||
                            (apt.notes || "").toLowerCase().includes(query)
                          );
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="py-16 text-center border border-dashed border-gray-800 rounded-2xl bg-gray-950/25">
                              <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                              <p className="text-xs text-gray-400 font-bold">No CRM client matches search parameter.</p>
                              <p className="text-[10px] text-gray-500">Wait for client submissions, or try cleaning query triggers.</p>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 flex-wrap">
                            {filtered.map((apt) => (
                              <motion.div
                                key={apt.id}
                                layout
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4.5 rounded-2xl border border-gray-800 bg-[#161c2d] hover:border-amber-500/25 transition-all flex flex-col justify-between relative group text-left"
                              >
                                <div>
                                  {/* Identity row */}
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="truncate">
                                      <h4 className="text-xs font-bold text-white truncate uppercase tracking-normal font-sans" title={apt.name}>
                                        👤 {apt.name}
                                      </h4>
                                      {apt.company ? (
                                        <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-extrabold font-mono block mt-1 w-max">
                                          🏢 {apt.company}
                                        </span>
                                      ) : (
                                        <span className="text-[9px] text-gray-500 block mt-1 font-mono">Individual client lead</span>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {/* Status patch selector */}
                                      <select
                                        value={apt.status || "Pending"}
                                        onChange={(e) => updateCrmAppointmentStatus(apt.id, e.target.value)}
                                        className={`text-[9px] font-mono font-bold rounded border px-1.5 py-0.5 focus:outline-none cursor-pointer ${
                                          apt.status === "Confirmed"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/30"
                                            : apt.status === "Contacted"
                                            ? "bg-sky-500/10 text-sky-400 border-sky-400/30"
                                            : "bg-amber-500/10 text-amber-400 border-amber-400/30"
                                        }`}
                                      >
                                        <option value="Pending" className="bg-gray-950 text-amber-400">⚙️ Pending</option>
                                        <option value="Contacted" className="bg-gray-950 text-sky-400">📞 Contacted</option>
                                        <option value="Confirmed" className="bg-gray-950 text-emerald-400">✔️ Confirmed</option>
                                      </select>

                                      <button
                                        type="button"
                                        onClick={() => deleteCrmAppointment(apt.id)}
                                        className="p-1 rounded bg-red-500/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all cursor-pointer opacity-40 group-hover:opacity-100"
                                        title="Purge Lead Document"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Channels specs */}
                                  <div className="space-y-1 font-mono text-[10px] text-slate-300 py-2 border-y border-gray-800/50 my-2.5">
                                    <p className="flex items-center gap-1.5">
                                      <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                      <a href={`mailto:${apt.email}`} className="truncate hover:text-amber-400 hover:underline">{apt.email}</a>
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                      <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                      <a href={`tel:${apt.phone}`} className="hover:text-amber-400 hover:underline">{apt.phone}</a>
                                    </p>
                                  </div>

                                  {/* Schedule and services description */}
                                  <div className="text-[10px] leading-relaxed text-gray-300 space-y-1.5 bg-gray-950/30 p-2.5 rounded-xl font-sans border border-gray-900">
                                    <p className="flex items-center gap-1 text-amber-400 font-semibold">
                                      <Calendar className="w-3 h-3 text-amber-400" />
                                      <span>Slot: {apt.date} at {apt.time}</span>
                                    </p>
                                    <p className="text-gray-400">
                                      <strong className="text-gray-500">Service:</strong> {apt.service}
                                    </p>
                                    {apt.notes && (
                                      <p className="text-slate-400 italic bg-[#0f1422] p-2 rounded border border-gray-850 mt-1 breakdown-all whitespace-pre-wrap">
                                        "{apt.notes}"
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="text-[8px] text-gray-500 font-mono text-right pt-2 mt-2 border-t border-gray-900/60 flex items-center justify-between">
                                  <span>Created: {new Date(apt.createdAt).toLocaleString()}</span>
                                  <span>UID: {apt.id.substring(4, 9)}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        );
                      })()
                    )}
                  </div>
                )}
              </div>

              {/* Secure Dialog Footer */}
              <div className="p-4 border-t border-gray-850 bg-gray-950 text-center flex items-center justify-between px-5 shrink-0">
                <span className="text-[9px] font-mono text-gray-500">
                  Secure cryptographic signatures are verified server-side
                </span>
                <span className="text-[9px] font-mono text-amber-500/80 font-bold bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                  PORT_ACTIVE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
