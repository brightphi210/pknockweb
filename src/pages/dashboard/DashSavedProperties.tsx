import {
    Bookmark,
    Building2,
    Camera,
    Heart,
    Landmark,
    LayoutGrid,
    MapPin,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Warehouse,
} from "lucide-react";
import { useState } from "react";

// ---------- Data ----------

const filters = [
    { label: "All", icon: LayoutGrid },
    { label: "Apartment", icon: Building2 },
    { label: "Duplex", icon: Warehouse },
    { label: "Studio", icon: Camera },
    { label: "Penthouse", icon: Landmark },
    { label: "Terrace", icon: Building2 },
];

const savedProperties = [
    {
        id: "1",
        typeLabel: "Apartment",
        title: "3-Bedroom Luxury Apartment, Lekki Phase 1",
        location: "Lekki Phase 1, Lagos",
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
        price: "₦280K",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "4",
        typeLabel: "Duplex",
        title: "5-Bedroom Detached Villa, Banana Island",
        location: "Banana Island, Lagos",
        price: "₦2.5M",
        image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "5",
        typeLabel: "Terrace",
        title: "3-Bedroom Terrace House, Maitama",
        location: "Maitama, Abuja",
        price: "₦350k",
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        thumb:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80",
    },
];

// ---------- Page ----------

const DashSavedProperties = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [query, setQuery] = useState("");

    const visible = savedProperties.filter((p) => {
        const matchesFilter = activeFilter === "All" || p.typeLabel === activeFilter;
        const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 pb-16 pt-28">
                <h1 className="text-2xl font-semibold text-slate-900">Saved Properties</h1>
                <p className="mt-1 max-w-xl text-sm text-slate-500">
                    Your saved collection of homes. Easily compare listings, revisit your
                    top choices, and continue where you left off.
                </p>

                {/* Filters + search */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f.label}
                                onClick={() => setActiveFilter(f.label)}
                                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${activeFilter === f.label
                                    ? "bg-[#0B1120] text-white"
                                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                <f.icon className="h-3.5 w-3.5" />
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Filter
                        </button>
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search"
                                className="w-48 rounded-full bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-blue-300 sm:w-56"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((property) => (
                        <div
                            key={property.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                        >
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="h-52 w-full object-cover"
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
                                        <Bookmark className="h-4 w-4 cursor-pointer fill-blue-600 text-blue-600" />
                                    </div>
                                </div>

                                <h3 className="mt-2 text-base font-semibold text-slate-900">
                                    {property.title}
                                </h3>
                                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {property.location}
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

                    {visible.length === 0 && (
                        <div className="col-span-full rounded-2xl bg-white p-10 text-center text-sm text-slate-400 ring-1 ring-slate-100">
                            No saved properties match your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashSavedProperties;