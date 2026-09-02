import {
    ArrowRight,
    Bookmark,
    Building2,
    ClipboardCheck,
    Eye,
    Heart,
    HeartPulse,
    MapPin,
    Minus,
    Plus,
    Search,
    ShieldCheck,
    Star,
    Users,
} from "lucide-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { SolidBtn } from "../components/btns";
import Navbar from "../components/Navbar";
import { images } from "../utils/images";

// ---------- Data ----------

const cities = ["Lekki", "Victoria Island", "Ikoyi", "Maitama", "Wuse 2"];

const stats = [
    { icon: Building2, value: "4,800+", label: "Verified Properties" },
    { icon: ShieldCheck, value: "98%", label: "Trust Score" },
    { icon: Users, value: "12,000+", label: "Happy Renters" },
    { icon: ClipboardCheck, value: "500+", label: "Inspections Done" },
];

const processSteps = [
    {
        number: "01",
        icon: ShieldCheck,
        title: "Identity Verified",
        description:
            "Every landlord and tenant undergoes rigorous KYC verification before listing or renting.",
    },
    {
        number: "02",
        icon: Eye,
        title: "Physical Inspection",
        description:
            "Our trained officers visit every property, assess its condition, and document everything.",
    },
    {
        number: "03",
        icon: MapPin,
        title: "GPS & Live Walkthrough",
        description:
            "GPS coordinates are pinned and a live walkthrough video is recorded for every property.",
    },
    {
        number: "04",
        icon: HeartPulse,
        title: "Continuous Health Checks",
        description:
            "We re-inspect properties every 6 months to maintain standards and your peace of mind.",
    },
];

interface Property {
    id: string;
    type: string;
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
        type: "Apartment",
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
        type: "Semi-Detached",
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
        type: "Studio",
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
        type: "Duplex",
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
        type: "Penthouse",
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
        type: "Terrace",
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

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote:
            "P-Knock gave me absolute peace of mind. I found my Lekki apartment knowing it had been inspected and verified. No more scams, no more surprises.",
        name: "Chidinma Eze",
        role: "Marketing Executive, Lagos",
        avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote:
            "The live walkthrough video saved me a trip from Abuja. What I saw online was exactly what I got when I moved in.",
        name: "Tunde Balogun",
        role: "Software Engineer, Abuja",
        avatar:
            "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote:
            "As a landlord, the verification process made my listing stand out. I had serious tenants reaching out within days.",
        name: "Amaka Okafor",
        role: "Property Owner, Ikoyi",
        avatar:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80",
    },
];

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "How does P-Knock verify properties?",
        answer:
            "Every property listed on P-Knock goes through our rigorous 7-point verification process. We physically inspect the property, verify ownership documents, check for legal disputes, and confirm all amenities listed are accurate and functional.",
    },
    {
        question: "How do you ensure property safety?",
        answer:
            "Our field officers assess structural integrity, security features, and neighbourhood safety before a listing goes live, and we re-inspect regularly to keep standards current.",
    },
    {
        question: "What support do you offer during property disputes?",
        answer:
            "Our resolution team mediates between tenants and landlords, and every verified listing comes with documented inspection records to help resolve disagreements quickly.",
    },
    {
        question: "Can I request a custom inspection?",
        answer:
            "Yes. You can request an additional inspection visit before committing to a property, and one of our officers will schedule a walkthrough at a convenient time.",
    },
    {
        question: "How frequently are listings updated?",
        answer:
            "Availability is refreshed daily, and every property is re-inspected every 6 months to make sure the listing still reflects reality.",
    },
    {
        question: "What guarantees do you provide on listed properties?",
        answer:
            "If a verified listing turns out to be materially different from what was inspected, we'll help you find a replacement property and flag the listing for re-review.",
    },
    {
        question: "How frequently are property listings updated?",
        answer:
            "Landlords can update pricing and availability in real time, and our team audits active listings on a rolling basis.",
    },
    {
        question: "Can I schedule a viewing before making a purchase?",
        answer:
            "Absolutely — every listing includes an option to book an in-person or live video viewing directly with the verified agent.",
    },
];

// ---------- Page ----------

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [openFAQ, setOpenFAQ] = useState(0);
    const t = testimonials[activeTestimonial];

    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/dashboard/home" replace />;
    }

    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="relative flex min-h-[780px] items-end overflow-hidden">
                <img
                    src={images.hero}
                    alt="Modern luxury home"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
                    <h1 className="max-w-2xl text-5xl font-bold lg:leading-tight text-white md:text-6xl">
                        Rent with complete confidence.
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-white/85">
                        Every property on P-Knock has been physically inspected,
                        GPS-verified, and live-walkthrough recorded. No scams. No
                        surprises. Just trust.
                    </p>

                    <div className="mt-8 flex max-w-xl overflow-hidden rounded-full bg-white p-1.5 shadow-lg">
                        <div className="flex flex-1 items-center gap-2 pl-4">
                            <Search className="h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by city, area or street..."
                                className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                        <button className="rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                            <FaSearch />
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {cities.map((city) => (
                            <button
                                key={city}
                                className="rounded-full border border-white/40 px-4 py-1.5 text-sm text-white transition hover:bg-white/10"
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex lg:flex-row flex-col lg:items-center gap-3">
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
                        <span className="text-sm text-white/90">
                            12,000+ Nigerians found their home here
                        </span>
                        <span className="flex items-center gap-1 text-sm text-white/90">
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

            {/* Trust stats */}
            <section className="bg-[#0B1120] py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-white">{value}</p>
                                <p className="text-sm text-white/60">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section className="bg-slate-50 py-24">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                        The P-Knock Process
                    </span>
                    <h2 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
                        Trust built into every listing.
                    </h2>
                    <p className="mt-4 text-slate-500">
                        We do the hard work so you don't have to. Before any property
                        appears on P-Knock, it goes through our 4-step verification
                        process.
                    </p>
                </div>

                <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map(({ number, icon: Icon, title, description }) => (
                        <div
                            key={number}
                            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                                    <Icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="text-2xl font-semibold text-slate-200">
                                    {number}
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-slate-900">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured properties */}
            <section className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                                Featured Homes
                            </span>
                            <h2 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
                                Verified premium properties
                            </h2>
                        </div>
                        <a

                            href="#"
                            className="flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-blue-600"
                        >
                            View all <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property) => (
                            <div
                                key={property.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
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
                                            {property.type}
                                        </span>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Heart className="h-4 w-4 cursor-pointer hover:text-slate-600" />
                                            <Bookmark className="h-4 w-4 cursor-pointer hover:text-slate-600" />
                                        </div>
                                    </div>

                                    <h3 className="mt-2 text-base font-semibold text-slate-900">
                                        {property.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        📍 {property.location}
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
            </section >

            {/* Testimonials */}
            < section className="bg-slate-50 py-24" >
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                        The P-Knock Process
                    </span>
                    <h2 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
                        Trusted by thousands across Nigeria
                    </h2>
                    <p className="mt-4 text-slate-500">
                        Real stories from real renters who found their home on P-Knock.
                    </p>

                    <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-8 text-left shadow-sm ring-1 ring-slate-100">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-amber-400 text-amber-400"
                                />
                            ))}
                        </div>
                        <p className="mt-4 text-slate-700">"{t.quote}"</p>
                        <div className="mt-6 flex items-center gap-3">
                            <img
                                src={t.avatar}
                                alt={t.name}
                                className="h-11 w-11 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-slate-900">{t.name}</p>
                                <p className="text-sm text-slate-500">{t.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`h-2 rounded-full transition-all ${i === activeTestimonial ? "w-6 bg-slate-900" : "w-2 bg-slate-300"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section >

            {/* FAQ */}
            < section className="bg-slate-50 pb-24" >
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                        The P-Knock Process
                    </span>
                    <h2 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
                        Everything you need to know about renting with P-Knock.
                    </h2>
                    <p className="mt-4 text-slate-500">
                        Real stories from real renters who found their home on P-Knock.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-3xl space-y-3 px-6">
                    {faqs.map((faq, i) => {
                        const isOpen = openFAQ === i;
                        return (
                            <div
                                key={faq.question}
                                className={`rounded-2xl bg-white p-6 shadow-sm ring-1 transition ${isOpen ? "ring-blue-200" : "ring-slate-100"
                                    }`}
                            >
                                <button
                                    className="flex w-full items-center justify-between text-left"
                                    onClick={() => setOpenFAQ(isOpen ? -1 : i)}
                                >
                                    <span className="font-semibold text-slate-900">
                                        {faq.question}
                                    </span>
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        {isOpen ? (
                                            <Minus className="h-4 w-4" />
                                        ) : (
                                            <Plus className="h-4 w-4" />
                                        )}
                                    </span>
                                </button>
                                {isOpen && (
                                    <p className="mt-4 text-sm leading-relaxed text-slate-500">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA banner */}
                <div className="mx-auto mt-16 max-w-6xl px-6">
                    <div className="relative overflow-hidden rounded-3xl bg-[#0B1120] px-6 py-20 text-center">
                        <span className="relative z-10 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                            The P-Knock Process
                        </span>
                        <h2 className="relative z-10 mt-6 text-4xl font-semibold text-white md:text-5xl">
                            Your next home is waiting.
                        </h2>
                        <p className="relative z-10 mx-auto mt-4 max-w-md text-white/70">
                            Join 12,000+ Nigerians who rent with confidence on P-Knock.
                            Free to join, no hidden fees.
                        </p>
                        <div className="relative z-10 mt-8 flex flex-col lg:flex-row justify-center gap-4">
                            <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100">
                                Get Started
                            </button>
                            <SolidBtn text="Browse Properties" onClick={() => { }} />
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Home;