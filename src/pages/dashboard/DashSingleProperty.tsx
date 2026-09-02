import {
    Award,
    Bath,
    Bed,
    Bookmark,
    Calendar,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    Flag,
    Heart,
    MapPin,
    Maximize,
    Minus,
    Plus,
    Ruler,
    Share2,
    ShieldCheck,
    Star,
    UploadCloud,
    UserCircle2,
    Wallet,
    X,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// ---------- Data ----------

const galleryImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
];

const amenities = [
    { label: "Swimming Pool", icon: "🏊" },
    { label: "Gym", icon: "🏋️" },
    { label: "24/7 Security", icon: "🔒" },
    { label: "Backup Power", icon: "⚡" },
    { label: "Covered Parking", icon: "🅿️" },
    { label: "Elevator", icon: "🛗" },
    { label: "CCTV", icon: "📹" },
    { label: "Water Treatment", icon: "💧" },
    { label: "Intercom", icon: "☎️" },
    { label: "Balcony", icon: "🏞️" },
];

const verificationDetails = [
    { label: "Verification Status", value: "Verified" },
    { label: "Verified By", value: "Inspector Chidi Okonkwo" },
    { label: "Verification Date", value: "Jan 15, 2025" },
    { label: "GPS Verified", value: "Confirmed" },
    { label: "Live Walkthrough", value: "Available" },
    { label: "Owner Verified", value: "Verified" },
    { label: "Health Status", value: "Excellent" },
];

interface VerificationOfficer {
    name: string;
    avatar: string;
    rating: number;
    inspections: number;
    available: boolean;
}

const verificationOfficers: VerificationOfficer[] = [
    {
        name: "Chidi Okonkwo",
        avatar:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80",
        rating: 4.9,
        inspections: 312,
        available: true,
    },
    {
        name: "Funke Adeleke",
        avatar:
            "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        inspections: 245,
        available: true,
    },
];

const reportReasons = [
    "Wrong or fake location",
    "Property already rented",
    "Misleading photos",
    "Suspicious or scam listing",
    "Price is inaccurate",
    "Other",
];

interface RelatedProperty {
    id: string;
    typeLabel: string;
    title: string;
    location: string;
    landmark: string;
    price: string;
    image: string;
}

const relatedProperties: RelatedProperty[] = [
    {
        id: "1",
        typeLabel: "Apartment",
        title: "3-Bedroom Luxury Apartment, Lekki Phase 1",
        location: "Lekki Phase 1, Lagos",
        landmark: "Lekki Toll Gate",
        price: "₦450k",
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "2",
        typeLabel: "Semi-Detached",
        title: "4-Bedroom Semi-Detached Duplex, Ikoyi",
        location: "Old Ikoyi, Lagos",
        landmark: "Victoria Island Junction",
        price: "₦950k",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "3",
        typeLabel: "Studio",
        title: "2-Bedroom Studio Apartment, Victoria Island",
        location: "Banana Island, Lagos",
        landmark: "Ikoyi Link Bridge",
        price: "₦280K",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
];

// ---------- Page ----------

const DashSingleProperty = () => {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);

    const [inspectionOpen, setInspectionOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("10:00");
    const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
    const [selectedOfficer, setSelectedOfficer] = useState(0);

    const [reportOpen, setReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState(reportReasons[0]);
    const [reportDetails, setReportDetails] = useState("");

    const goPrev = () =>
        setActiveImage((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
    const goNext = () =>
        setActiveImage((i) => (i === galleryImages.length - 1 ? 0 : i + 1));

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="cursor-pointer hover:text-slate-600">Home</span>
                    <span>{">"}</span>
                    <span className="cursor-pointer hover:text-slate-600">Properties</span>
                    <span>{">"}</span>
                    <span className="font-medium text-slate-700">
                        3-Bedroom Luxury Apartment
                    </span>
                </nav>

                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                    {/* ---------- Left column ---------- */}
                    <div>
                        {/* Gallery */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={galleryImages[activeImage]}
                                alt="Property"
                                className="h-[350px] w-full object-cover"
                            />
                            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-emerald-600 shadow-sm">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                P-Knock Verified
                            </span>
                            <button
                                onClick={goPrev}
                                className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-3 flex gap-3">
                            {galleryImages.map((src, i) => (
                                <button
                                    key={src}
                                    onClick={() => setActiveImage(i)}
                                    className={`h-16 w-24 overflow-hidden rounded-xl ring-2 transition ${activeImage === i
                                        ? "ring-emerald-500"
                                        : "ring-transparent hover:ring-slate-200"
                                        }`}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Title block */}
                        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium text-blue-600">
                                        Apartment
                                    </span>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                                        Available
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Heart
                                        onClick={() => setLiked((v) => !v)}
                                        className={`h-4.5 w-4.5 cursor-pointer transition ${liked
                                            ? "fill-rose-500 text-rose-500"
                                            : "hover:text-slate-600"
                                            }`}
                                    />
                                    <Bookmark
                                        onClick={() => setSaved((v) => !v)}
                                        className={`h-4.5 w-4.5 cursor-pointer transition ${saved
                                            ? "fill-blue-600 text-blue-600"
                                            : "hover:text-slate-600"
                                            }`}
                                    />
                                    <Share2 className="h-4.5 w-4.5 cursor-pointer hover:text-slate-600" />
                                </div>
                            </div>

                            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
                                3-Bedroom Luxury Apartment, Lekki Phase 1
                            </h1>
                            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                                <MapPin className="h-3.5 w-3.5" />
                                Lekki Phase 1, Lagos
                            </p>

                            <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
                                <span className="flex items-center gap-1.5">
                                    <Bed className="h-4 w-4 text-slate-400" />
                                    <strong className="text-slate-800">3</strong> bedrooms
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Bath className="h-4 w-4 text-slate-400" />
                                    <strong className="text-slate-800">3</strong> bathrooms
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Ruler className="h-4 w-4 text-slate-400" />
                                    <strong className="text-slate-800">185</strong> m²
                                </span>
                            </div>
                        </div>

                        {/* About */}
                        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            <h2 className="text-base font-semibold text-slate-900">
                                About this property
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                A stunning 3-bedroom luxury apartment on the prestigious
                                Admiralty Way in Lekki Phase 1. This fully serviced apartment
                                features a modern open-plan kitchen, spacious living areas,
                                and a private balcony with panoramic views. The compound
                                offers 24/7 security, backup power, and a swimming pool.
                            </p>

                            <h2 className="mt-6 text-base font-semibold text-slate-900">
                                Amenities
                            </h2>
                            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                {amenities.map((a) => (
                                    <div
                                        key={a.label}
                                        className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
                                    >
                                        <span aria-hidden>{a.icon}</span>
                                        {a.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Verification */}
                        <div className="mt-6 rounded-2xl bg-[#0B1120] p-6">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </span>
                                <div>
                                    <h2 className="text-base font-semibold text-white">
                                        Verified by P-Knock
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        Physical inspection · GPS · Walkthrough
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                                {verificationDetails.map((d) => (
                                    <div
                                        key={d.label}
                                        className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                        </span>
                                        <div>
                                            <p className="text-xs text-slate-400">{d.label}</p>
                                            <p className="text-sm font-medium text-white">
                                                {d.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ---------- Right column ---------- */}
                    <aside className="space-y-6">
                        {/* Price / booking card */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Available to rent now
                            </span>

                            <p className="mt-4 text-3xl font-semibold text-slate-900">
                                ₦450k
                                <span className="text-sm font-normal text-slate-400">
                                    {" "}
                                    /month
                                </span>
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Service fee: ₦25k · Caution: ₦450k
                            </p>

                            <button
                                onClick={() => setInspectionOpen(true)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1120] py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                <Calendar className="h-4 w-4" />
                                Book Inspection
                            </button>
                            <button className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                                <Wallet className="h-4 w-4" />
                                Rent this property
                            </button>

                            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Monthly rent</span>
                                    <span className="font-medium text-slate-800">₦450k</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Service fee</span>
                                    <span className="font-medium text-slate-800">₦25k</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Caution deposit</span>
                                    <span className="font-medium text-slate-800">₦450k</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-100 pt-2.5 text-slate-900">
                                    <span className="font-medium">Total</span>
                                    <span className="font-semibold">₦925k</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setReportOpen(true)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-2.5 text-sm font-medium text-rose-500 transition hover:bg-rose-100"
                            >
                                <Flag className="h-3.5 w-3.5" />
                                Report this listing
                            </button>
                        </div>

                        {/* Owner card */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            <p className="text-xs font-medium text-slate-400">
                                Property Owner
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80"
                                    alt="Mr. Emeka Adeyemi"
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Mr. Emeka Adeyemi
                                    </p>
                                    <p className="flex items-center gap-1 text-xs text-slate-500">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        4.9 rating
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                            <div className="relative h-56 bg-emerald-50">
                                <div className="absolute left-3 top-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
                                    <button className="flex h-8 w-8 items-center justify-center border-b border-slate-100 text-slate-500 hover:bg-slate-50">
                                        <Plus className="h-3.5 w-3.5" />
                                    </button>
                                    <button className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-50">
                                        <Minus className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm hover:bg-slate-50">
                                    <Maximize className="h-3.5 w-3.5" />
                                </button>
                                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                                        <MapPin className="h-4 w-4" />
                                    </span>
                                    <span className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                                        Lekki Phase 1, Lagos
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Walkthrough video */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                            <p className="flex items-center gap-2 px-5 pt-5 text-sm font-semibold text-slate-900">
                                <Award className="h-4 w-4 text-slate-400" />
                                Walkthrough Video
                            </p>
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                                alt="Walkthrough"
                                className="mt-4 h-56 w-full object-cover"
                            />
                        </div>
                    </aside>
                </div>

                {/* Related properties */}
                <div className="mt-12">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Related Properties
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedProperties.map((property) => (
                            <div
                                key={property.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                            >
                                <div className="relative">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="h-44 w-full object-cover"
                                    />
                                    <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm">
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        P-Knock Verified
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-blue-600">
                                            {property.typeLabel}
                                        </span>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Heart className="h-4 w-4 cursor-pointer hover:text-slate-600" />
                                            <Bookmark className="h-4 w-4 cursor-pointer hover:text-slate-600" />
                                        </div>
                                    </div>

                                    <h3 className="mt-2 text-base font-semibold text-slate-900">
                                        {property.title}
                                    </h3>
                                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {property.location}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        🚩 {property.landmark}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-900">
                                                {property.price}
                                            </p>
                                            <p className="text-xs text-slate-400">per year</p>
                                        </div>
                                        <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- Book Inspection Modal ---------- */}
            {inspectionOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center sm:p-6"
                    onClick={() => setInspectionOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="my-8 w-full max-w-xl rounded-3xl bg-white p-3 shadow-2xl sm:p-4"
                    >
                        {/* Property summary */}
                        <div className="flex gap-4">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                                <img
                                    src={galleryImages[0]}
                                    alt="Property"
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-medium text-emerald-600 shadow-sm">
                                    <ShieldCheck className="h-3 w-3" />
                                    Verified
                                </span>
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-medium text-blue-600">
                                        Apartment
                                    </span>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                                        Available
                                    </span>
                                </div>
                                <h3 className="mt-1 truncate text-base font-semibold text-slate-900">
                                    3-Bedroom Luxury Apartment, Lekki Phase 1
                                </h3>
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Lekki Phase 1, Lagos
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Bed className="h-3.5 w-3.5 text-slate-400" />
                                        <strong className="text-slate-700">3</strong> bedrooms
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-3.5 w-3.5 text-slate-400" />
                                        <strong className="text-slate-700">3</strong> bathrooms
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Maximize className="h-3.5 w-3.5 text-slate-400" />
                                        <strong className="text-slate-700">185</strong> m²
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setInspectionOpen(false)}
                            className="mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Choose a date */}
                        <div className="mt-6 rounded-2xl border border-slate-100 p-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                <CalendarDays className="h-4 w-4 text-blue-600" />
                                Choose a Date
                            </p>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
                            />
                        </div>

                        {/* Choose a time */}
                        <div className="mt-4 rounded-2xl border border-slate-100 p-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                <Clock className="h-4 w-4 text-blue-600" />
                                Choose a Time
                            </p>
                            <div className="mt-4 flex gap-2">
                                <input
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
                                />
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) =>
                                        setSelectedPeriod(e.target.value as "AM" | "PM")
                                    }
                                    className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300"
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Assigned officer */}
                        <div className="mt-4 rounded-2xl border border-slate-100 p-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                <UserCircle2 className="h-4 w-4 text-blue-600" />
                                Assigned Verification Officer
                            </p>
                            <div className="mt-4 space-y-3">
                                {verificationOfficers.map((officer, i) => (
                                    <button
                                        key={officer.name}
                                        onClick={() => setSelectedOfficer(i)}
                                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${selectedOfficer === i
                                            ? "border-blue-300 bg-blue-50/60"
                                            : "border-slate-100 hover:border-slate-200"
                                            }`}
                                    >
                                        <img
                                            src={officer.avatar}
                                            alt={officer.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {officer.name}
                                            </p>
                                            <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <span className="flex items-center gap-0.5">
                                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                    {officer.rating}
                                                </span>
                                                <span>·</span>
                                                <span>{officer.inspections} inspections</span>
                                                <span>·</span>
                                                <span className="font-medium text-emerald-600">
                                                    {officer.available ? "Available" : "Unavailable"}
                                                </span>
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Free inspection banner */}
                        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-blue-50 px-5 py-4">
                            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <ShieldCheck className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Free P-Knock Inspection
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Property inspections on P-Knock are completely free. You
                                    only pay when you decide to rent.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setInspectionOpen(false)}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Confirm Inspection
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ---------- Report Listing Modal ---------- */}
            {reportOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center sm:p-6"
                    onClick={() => setReportOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="my-8 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">
                                    Report this listing
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    3-Bedroom Luxury Apartment, Lekki Phase 1
                                </p>
                            </div>
                            <button
                                onClick={() => setReportOpen(false)}
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-slate-800">
                                What's wrong with this listing?
                            </label>
                            <select
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300"
                            >
                                {reportReasons.map((r) => (
                                    <option key={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-slate-800">
                                Additional details (optional)
                            </label>
                            <textarea
                                value={reportDetails}
                                onChange={(e) => setReportDetails(e.target.value)}
                                rows={4}
                                placeholder="Describe what you noticed, e.g. photos don't match the actual property at this address..."
                                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-slate-800">
                                Upload a screenshot or photo (optional)
                            </label>
                            <div className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-10 text-center transition hover:border-slate-300">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                    <UploadCloud className="h-5 w-5" />
                                </span>
                                <p className="text-sm text-slate-600">
                                    <span className="font-medium text-blue-600">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-slate-400">JPEG, JPG, PNG or PDF</p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3.5">
                            <Flag className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                            <p className="text-sm text-amber-700">
                                Your report is confidential. Our safety team reviews every
                                report within 24 hours and will take action if a violation is
                                confirmed.
                            </p>
                        </div>

                        <button
                            onClick={() => setReportOpen(false)}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 py-3.5 text-sm font-medium text-white transition hover:bg-red-800"
                        >
                            <Flag className="h-4 w-4" />
                            Submit Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashSingleProperty;