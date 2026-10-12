import {
    Bath,
    Bed,
    Bookmark,
    Calendar,
    CalendarCheck2,
    CheckCircle2,
    Clock,
    CreditCard,
    Heart,
    MapPin,
    Maximize,
    ShieldCheck,
    Star,
    Target,
    TrendingUp,
} from "lucide-react";
// import { useAuth } from "../../../providers/AuthProvider";

// ---------- Data ----------

const stats = [
    {
        label: "Saved Properties",
        value: 8,
        note: "+2 this week",
        icon: Bookmark,
        tone: "bg-blue-50 text-blue-600",
    },
    {
        label: "Watchlist",
        value: 4,
        note: "1 Price drop",
        icon: Target,
        tone: "bg-emerald-50 text-emerald-600",
    },
    {
        label: "Booked Inspections",
        value: 1,
        note: "Sept 18",
        icon: CalendarCheck2,
        tone: "bg-amber-50 text-amber-600",
    },
];

const upcomingInspection = {
    title: "4-Bedroom Penthouse, Victoria Island",
    when: "Friday, April 18 · 10:00 AM",
    officer: {
        name: "Funke Adeleke",
        avatar:
            "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=100&q=80",
        rating: 4.8,
        inspections: 245,
        available: true,
    },
};

const myProperty = {
    typeLabel: "Apartment",
    title: "3-Bedroom Luxury Apartment, Lekki Phase 1",
    location: "Lekki Phase 1, Lagos",
    price: "₦450k",
    beds: 3,
    baths: 3,
    size: 185,
    image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
};

const recommended = [
    {
        id: "1",
        typeLabel: "Apartment",
        title: "3-Bedroom Luxury Apartment, Lekki Phase 1",
        location: "Lekki Phase 1, Lagos",
        landmark: "Lekki Toll Gate",
        price: "₦450k",
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
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
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
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
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
    },
];

const recentActivity = [
    {
        icon: CheckCircle2,
        tone: "bg-emerald-50 text-emerald-600",
        title: "Identity verified",
        time: "2 hours ago",
    },
    {
        icon: Bookmark,
        tone: "bg-blue-50 text-blue-600",
        title: "Saved 3-Bedroom Apartment",
        time: "4 hours ago",
    },
    {
        icon: Calendar,
        tone: "bg-amber-50 text-amber-600",
        title: "Inspection booked",
        time: "Yesterday",
    },
    {
        icon: CheckCircle2,
        tone: "bg-emerald-50 text-emerald-600",
        title: "Identity verified",
        time: "3 days ago",
    },
];

const payments = [
    { amount: "₦450K", time: "1 month ago" },
    { amount: "₦450K", time: "1 month ago" },
    { amount: "₦450K", time: "1 month ago" },
    { amount: "₦450K", time: "1 month ago" },
];

// ---------- Page ----------

const DashOverview = () => {
    // const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 pb-16 pt-28">
                {/* <div className="flex items-center gap-4">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div>
                        <p className="text-sm text-slate-400">Welcome back</p>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {user?.name ?? "there"}
                        </h1>
                    </div>
                </div> */}

                <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
                    {/* ---------- Left column ---------- */}
                    <div>
                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="text-3xl font-semibold text-slate-900">
                                            {s.value}
                                        </p>
                                        <span
                                            className={`flex h-9 w-9 items-center justify-center rounded-full ${s.tone}`}
                                        >
                                            <s.icon className="h-4 w-4" />
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                                    <p className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
                                        {s.label === "Saved Properties" && (
                                            <TrendingUp className="h-3 w-3" />
                                        )}
                                        <span
                                            className={
                                                s.label === "Saved Properties"
                                                    ? "text-emerald-600"
                                                    : "text-slate-400"
                                            }
                                        >
                                            {s.note}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Upcoming inspection */}
                        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#0B1120] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                    <Calendar className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-xs text-slate-400">Upcoming Inspection</p>
                                    <p className="mt-0.5 text-base font-semibold text-white">
                                        {upcomingInspection.title}
                                    </p>
                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                        <Clock className="h-3.5 w-3.5" />
                                        {upcomingInspection.when}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                                <img
                                    src={upcomingInspection.officer.avatar}
                                    alt={upcomingInspection.officer.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        {upcomingInspection.officer.name}
                                    </p>
                                    <p className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <span className="flex items-center gap-0.5">
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                            {upcomingInspection.officer.rating}
                                        </span>
                                        <span>·</span>
                                        <span>{upcomingInspection.officer.inspections} inspections</span>
                                        <span>·</span>
                                        <span className="font-medium text-emerald-400">
                                            {upcomingInspection.officer.available
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* My Property */}
                        <h2 className="mt-8 text-lg font-semibold text-slate-900">
                            My Property
                        </h2>
                        <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:flex">
                            <div className="relative h-56 sm:h-auto sm:w-2/5">
                                <img
                                    src={myProperty.image}
                                    alt={myProperty.title}
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    P-Knock Verified
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium text-blue-600">
                                        {myProperty.typeLabel}
                                    </span>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                                        Available
                                    </span>
                                </div>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">
                                    {myProperty.price}
                                    <span className="text-sm font-normal text-slate-400"> /month</span>
                                </p>
                                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                                    {myProperty.title}
                                </h3>
                                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {myProperty.location}
                                </p>
                                <div className="mt-4 flex items-center gap-5 text-sm text-slate-600">
                                    <span className="flex items-center gap-1.5">
                                        <Bed className="h-4 w-4 text-slate-400" />
                                        <strong className="text-slate-800">{myProperty.beds}</strong>{" "}
                                        bedrooms
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Bath className="h-4 w-4 text-slate-400" />
                                        <strong className="text-slate-800">{myProperty.baths}</strong>{" "}
                                        bathrooms
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Maximize className="h-4 w-4 text-slate-400" />
                                        <strong className="text-slate-800">{myProperty.size}</strong> m²
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recommended */}
                        <div className="mt-8 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Recommended For You
                            </h2>
                            <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                                View all →
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {recommended.map((property) => (
                                <div
                                    key={property.id}
                                    className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                                >
                                    <div className="relative">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="h-40 w-full object-cover"
                                        />
                                        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            P-Knock Verified
                                        </span>
                                        <img
                                            src={property.thumb}
                                            alt=""
                                            className="absolute bottom-3 right-3 h-14 w-14 rounded-lg border-2 border-white object-cover shadow-sm"
                                        />
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
                                        <p className="text-sm text-slate-400">🚩 {property.landmark}</p>

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

                    {/* ---------- Right column ---------- */}
                    <aside className="space-y-6">
                        {/* Recent Activity */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">
                                Recent Activity
                            </h2>
                            <div className="mt-4 space-y-4">
                                {recentActivity.map((a, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span
                                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${a.tone}`}
                                        >
                                            <a.icon className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm text-slate-700">{a.title}</p>
                                            <p className="text-xs text-slate-400">{a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payments */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">Payments</h2>
                            <div className="mt-4 space-y-4">
                                {payments.map((p, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                            <CreditCard className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm text-slate-700">
                                                <strong className="font-semibold">{p.amount}</strong> has
                                                been successfully paid
                                            </p>
                                            <p className="text-xs text-slate-400">{p.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashOverview;