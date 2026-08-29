import {
    Bookmark,
    Building2,
    Heart,
    Home as HomeIcon,
    LayoutGrid,
    MapPin,
    Search,
    ShieldCheck,
    SlidersHorizontal,
    Star,
    Warehouse,
    X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Data ----------

const cities = ["Lekki", "Victoria Island", "Ikoyi", "Maitama", "Wuse 2"];

const propertyTypes = [
    { label: "All", value: "all", icon: LayoutGrid },
    { label: "Apartment", value: "apartment", icon: Building2 },
    { label: "Duplex", value: "duplex", icon: HomeIcon },
    { label: "Studio", value: "studio", icon: Warehouse },
    { label: "Penthouse", value: "penthouse", icon: Building2 },
    { label: "Terrace", value: "terrace", icon: HomeIcon },
];

interface Property {
    id: string;
    type: string;
    typeLabel: string;
    title: string;
    location: string;
    landmark: string;
    price: string;
    image: string;
    agentAvatar: string;
    verified: boolean;
}

const properties: Property[] = [
    {
        id: "1",
        type: "apartment",
        typeLabel: "Apartment",
        title: "3-Bedroom Luxury Apartment, Lekki Phase 1",
        location: "Lekki Phase 1, Lagos",
        landmark: "Lekki Toll Gate",
        price: "₦450k",
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
    {
        id: "2",
        type: "duplex",
        typeLabel: "Semi-Detached",
        title: "4-Bedroom Semi-Detached Duplex, Ikoyi",
        location: "Old Ikoyi, Lagos",
        landmark: "Victoria Island Junction",
        price: "₦950k",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
    {
        id: "3",
        type: "studio",
        typeLabel: "Studio",
        title: "2-Bedroom Studio Apartment, Victoria Island",
        location: "Banana Island, Lagos",
        landmark: "Ikoyi Link Bridge",
        price: "₦280K",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
    {
        id: "4",
        type: "duplex",
        typeLabel: "Duplex",
        title: "5-Bedroom Detached Villa, Banana Island",
        location: "Banana Island, Lagos",
        landmark: "Third Mainland Bridge",
        price: "₦2.5M",
        image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
    {
        id: "5",
        type: "penthouse",
        typeLabel: "Penthouse",
        title: "4-Bedroom Penthouse, Victoria Island",
        location: "Victoria Island, Lagos",
        landmark: "Eko Bridge",
        price: "₦1.8M",
        image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
    {
        id: "6",
        type: "terrace",
        typeLabel: "Terrace",
        title: "3-Bedroom Terrace House, Maitama",
        location: "Maitama, Abuja",
        landmark: "Lekki-Ikoyi Link Bridge",
        price: "₦350k",
        image:
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
        agentAvatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        verified: true,
    },
];

const bedroomOptions = ["Any", "1", "2", "3", "4+"];
const sortOptions = ["Recently Added", "Price: Low to High", "Price: High to Low", "Most Verified"];

// ---------- Page ----------

const DashHome = () => {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [bedrooms, setBedrooms] = useState("Any");
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [savedIds, setSavedIds] = useState<string[]>([]);

    const filteredProperties = useMemo(
        () =>
            activeType === "all"
                ? properties
                : properties.filter((p) => p.type === activeType),
        [activeType]
    );

    const toggleSaved = (id: string) => {
        setSavedIds((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const goToProperty = (id: string) => {
        navigate(`/dashboard/property/${id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Search header */}
            <section className="bg-white pb-12 lg:p-32 pt-20">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h1 className="text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">
                        Find your verified
                        <br />
                        home today
                    </h1>

                    <div className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
                        <div className="flex flex-1 items-center gap-2 pl-4">
                            <Search className="h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by city, area or street..."
                                className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                        <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                            Search
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {cities.map((city) => (
                            <button
                                key={city}
                                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="flex -space-x-3">
                            {[
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80",
                                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
                                "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=100&q=80",
                            ].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                />
                            ))}
                        </div>
                        <span className="text-sm text-slate-500">
                            12,000+ Nigerians found their home here
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                                />
                            ))}
                            4.9/5
                        </span>
                    </div>
                </div>
            </section>

            {/* Filter bar + listings */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {propertyTypes.map(({ label, value, icon: Icon }) => {
                            const isActive = activeType === value;
                            return (
                                <button
                                    key={value}
                                    onClick={() => setActiveType(value)}
                                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${isActive
                                        ? "border-[#0B1120] bg-[#0B1120] text-white"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filter
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 z-20 mt-2 w-[420px] rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-semibold text-slate-900">
                                        Filter
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setBedrooms("Any");
                                            setSortBy(sortOptions[0]);
                                            setVerifiedOnly(false);
                                            setAvailableOnly(false);
                                        }}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Clear Filter
                                    </button>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500">
                                            Property Type
                                        </label>
                                        <select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300">
                                            <option>All</option>
                                            {propertyTypes.slice(1).map((t) => (
                                                <option key={t.value}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500">
                                            City
                                        </label>
                                        <select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300">
                                            <option>All Cities</option>
                                            {cities.map((c) => (
                                                <option key={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="text-xs font-medium text-slate-500">
                                        Bedrooms
                                    </label>
                                    <div className="mt-1.5 flex gap-2">
                                        {bedroomOptions.map((b) => (
                                            <button
                                                key={b}
                                                onClick={() => setBedrooms(b)}
                                                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${bedrooms === b
                                                    ? "bg-[#0B1120] text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="text-xs font-medium text-slate-500">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300"
                                    >
                                        {sortOptions.map((s) => (
                                            <option key={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-5">
                                    <label className="text-xs font-medium text-slate-500">
                                        Rent
                                    </label>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Min"
                                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Max"
                                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 flex gap-2">
                                    <button
                                        onClick={() => setVerifiedOnly((v) => !v)}
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${verifiedOnly
                                            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        <ShieldCheck className="h-4 w-4" />
                                        P-Knock Verified
                                    </button>
                                    <button
                                        onClick={() => setAvailableOnly((v) => !v)}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${availableOnly
                                            ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        Available Now
                                    </button>
                                </div>

                                <button
                                    onClick={() => setFilterOpen(false)}
                                    className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active filter chips */}
                {(bedrooms !== "Any" || verifiedOnly || availableOnly) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {bedrooms !== "Any" && (
                            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                                {bedrooms} Bedrooms
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => setBedrooms("Any")}
                                />
                            </span>
                        )}
                        {verifiedOnly && (
                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
                                P-Knock Verified
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => setVerifiedOnly(false)}
                                />
                            </span>
                        )}
                        {availableOnly && (
                            <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                                Available Now
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => setAvailableOnly(false)}
                                />
                            </span>
                        )}
                    </div>
                )}

                {/* Results count */}
                <p className="mt-6 text-sm text-slate-500">
                    {filteredProperties.length} verified{" "}
                    {filteredProperties.length === 1 ? "property" : "properties"} found
                </p>

                {/* Property grid */}
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProperties.map((property) => (
                        <div
                            key={property.id}
                            onClick={() => goToProperty(property.id)}
                            className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                        >
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="h-56 w-full object-cover"
                                />
                                {property.verified && (
                                    <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm">
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        P-Knock Verified
                                    </span>
                                )}
                                <img
                                    src={property.agentAvatar}
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
                                        <Bookmark
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSaved(property.id);
                                            }}
                                            className={`h-4 w-4 cursor-pointer transition ${savedIds.includes(property.id)
                                                ? "fill-blue-600 text-blue-600"
                                                : "hover:text-slate-600"
                                                }`}
                                        />
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
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToProperty(property.id);
                                        }}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProperties.length === 0 && (
                    <div className="mt-16 flex flex-col items-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Search className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="mt-4 text-base font-medium text-slate-900">
                            No properties match this filter
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Try a different property type or clear your filters.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DashHome;