import { Bookmark, Calendar, CheckCircle2, Video } from "lucide-react";
import { useState } from "react";

// ---------- Data ----------

interface Notification {
    id: string;
    icon: typeof CheckCircle2;
    tone: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const initialNotifications: { group: string; items: Notification[] }[] = [
    {
        group: "Today",
        items: [
            {
                id: "t1",
                icon: CheckCircle2,
                tone: "bg-emerald-50 text-emerald-600",
                title: "Identity Verified Successfully",
                description:
                    "Your KYC verification has been approved. You can now book inspections and rent properties.",
                time: "2 hours ago",
                read: false,
            },
            {
                id: "t2",
                icon: Bookmark,
                tone: "bg-blue-50 text-blue-600",
                title: "Watchlist Alert: Price Drop",
                description:
                    "3-Bedroom Apartment on Lekki Phase 1 has dropped its monthly rent from ₦500,000 to ₦450,000.",
                time: "4 hours ago",
                read: false,
            },
            {
                id: "t3",
                icon: Calendar,
                tone: "bg-amber-50 text-amber-600",
                title: "Inspection Confirmed",
                description:
                    "Your inspection for 4-Bedroom Villa in Victoria Island is confirmed for Friday, April 18 at 10:00 AM.",
                time: "Yesterday",
                read: false,
            },
            {
                id: "t4",
                icon: Video,
                tone: "bg-emerald-50 text-emerald-600",
                title: "New Walkthrough Available",
                description:
                    "A new live walkthrough video has been uploaded for 4-Bedroom Duplex, Ikoyi.",
                time: "3 days ago",
                read: false,
            },
        ],
    },
    {
        group: "Yesterday",
        items: [
            {
                id: "y1",
                icon: CheckCircle2,
                tone: "bg-emerald-50 text-emerald-600",
                title: "Identity Verified Successfully",
                description:
                    "Your KYC verification has been approved. You can now book inspections and rent properties.",
                time: "2 hours ago",
                read: true,
            },
            {
                id: "y2",
                icon: Bookmark,
                tone: "bg-blue-50 text-blue-600",
                title: "Watchlist Alert: Price Drop",
                description:
                    "3-Bedroom Apartment on Lekki Phase 1 has dropped its monthly rent from ₦500,000 to ₦450,000.",
                time: "4 hours ago",
                read: true,
            },
            {
                id: "y3",
                icon: Calendar,
                tone: "bg-amber-50 text-amber-600",
                title: "Inspection Confirmed",
                description:
                    "Your inspection for 4-Bedroom Villa in Victoria Island is confirmed for Friday, April 18 at 10:00 AM.",
                time: "Yesterday",
                read: true,
            },
            {
                id: "y4",
                icon: Video,
                tone: "bg-emerald-50 text-emerald-600",
                title: "New Walkthrough Available",
                description:
                    "A new live walkthrough video has been uploaded for 4-Bedroom Duplex, Ikoyi.",
                time: "3 days ago",
                read: true,
            },
        ],
    },
];

// ---------- Page ----------

const DashNotifications = () => {
    const [groups, setGroups] = useState(initialNotifications);

    const markAllRead = () => {
        setGroups((prev) =>
            prev.map((g) => ({
                ...g,
                items: g.items.map((n) => ({ ...n, read: true })),
            }))
        );
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-4xl px-6 pb-16 pt-28">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
                        <p className="mt-1 max-w-lg text-sm text-slate-500">
                            Stay updated with everything happening across your account—from
                            property updates and inspection reminders to payments and special
                            offers.
                        </p>
                    </div>
                    <button
                        onClick={markAllRead}
                        className="flex-shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        Mark as Read
                    </button>
                </div>

                {groups.map((group) => (
                    <div key={group.group} className="mt-8">
                        <div className="flex items-center gap-4">
                            <span className="h-px flex-1 bg-slate-200" />
                            <span className="text-sm text-slate-400">{group.group}</span>
                            <span className="h-px flex-1 bg-slate-200" />
                        </div>

                        <div className="mt-6 space-y-4">
                            {group.items.map((n) => (
                                <div
                                    key={n.id}
                                    className={`relative rounded-2xl p-5 transition ${n.read ? "bg-slate-100/70" : "bg-white shadow-sm ring-1 ring-slate-100"
                                        }`}
                                >
                                    {!n.read && (
                                        <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-emerald-500" />
                                    )}
                                    <div className="flex items-start gap-3.5">
                                        <span
                                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${n.tone} ${n.read ? "opacity-60" : ""
                                                }`}
                                        >
                                            <n.icon className="h-4 w-4" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={`text-sm font-semibold ${n.read ? "text-slate-500" : "text-slate-900"
                                                    }`}
                                            >
                                                {n.title}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm ${n.read ? "text-slate-400" : "text-slate-500"
                                                    }`}
                                            >
                                                {n.description}
                                            </p>
                                            <p className="mt-2 text-right text-xs text-slate-400">
                                                {n.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashNotifications;