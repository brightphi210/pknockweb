import {
    Bell,
    Bookmark,
    CalendarCheck,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    ShieldCheck,
    UserCircle2,
    Video
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { images } from "../utils/images";

const profileLinks = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard/overview" },
    { label: "Profile", icon: UserCircle2, to: "/dashboard/profile" },
    { label: "Saved", icon: Bookmark, to: "/dashboard/saved" },
    // { label: "Watchlist", icon: Eye, to: "/dashboard/watchlist" },
    { label: "Notifications", icon: Bell, to: "/dashboard/notifications" },
    // { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

interface NotificationItem {
    id: string;
    icon: typeof ShieldCheck;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    time: string;
}

const notifications: NotificationItem[] = [
    {
        id: "1",
        icon: ShieldCheck,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        title: "Identity Verified Successfully",
        description: "Your KYC verification has been approved. You can now access all features.",
        time: "2 hours ago",
    },
    {
        id: "2",
        icon: Bookmark,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        title: "Watchlist Alert: Price Drop",
        description: "3-Bedroom Apartment on Lekki Phase 1 has dropped in price.",
        time: "4 hours ago",
    },
    {
        id: "3",
        icon: CalendarCheck,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        title: "Inspection Confirmed",
        description: "Your inspection for 4-Bedroom Villa in Victoria Island is confirmed.",
        time: "Yesterday",
    },
    {
        id: "4",
        icon: Video,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        title: "New Walkthrough Available",
        description: "A new live walkthrough video has been uploaded.",
        time: "3 days ago",
    },
];

const DashNavbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    // Profile dropdown
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Notification dropdown
    const [notifOpen, setNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(15);
    const notifRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        };
        if (profileOpen || notifOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileOpen, notifOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setProfileOpen(false);
                setNotifOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
    };

    return (
        <div className="flex items-center justify-between py-4 sm:py-4 md:py-4 px-4 sm:px-6 md:px-10 lg:px-20 w-full fixed top-0 z-30 bg-white border-b border-gray-100">
            {/* Logo */}
            <Link to="/" className="w-20 sm:w-24 md:w-28 lg:w-30 shrink-0">
                <img src={images.logo} alt="Logo" className="w-full h-auto object-contain" />
            </Link>

            {isLoggedIn && (
                <div className="flex items-center gap-3">
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setNotifOpen((v) => !v)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                        >
                            <Bell className="h-4.5 w-4.5" />
                            {unreadCount > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl sm:w-96">
                                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                    <button
                                        onClick={() => setUnreadCount(0)}
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Mark as read
                                    </button>
                                </div>

                                <div className="max-h-96 divide-y divide-gray-100 overflow-y-auto">
                                    {notifications.map(({ id, icon: Icon, iconBg, iconColor, title, description, time }) => (
                                        <div key={id} className="flex gap-3 p-4">
                                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                                                <Icon className={`h-4 w-4 ${iconColor}`} />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900">{title}</p>
                                                <p className="mt-0.5 truncate text-xs text-gray-500">{description}</p>
                                            </div>
                                            <span className="shrink-0 text-xs text-gray-400">{time}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 p-3 text-center">
                                    <Link
                                        to="/dashboard/notifications"
                                        onClick={() => setNotifOpen(false)}
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        View all
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen((v) => !v)}
                            className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-slate-50"
                        >
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <ChevronDown
                                className={`h-3.5 w-3.5 text-slate-500 transition-transform ${profileOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                                <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                                    <img
                                        src={user?.avatar}
                                        alt={user?.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                            {user?.name}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-2">
                                    {profileLinks.map(({ label, icon: Icon, to }) => (
                                        <Link
                                            key={label}
                                            to={to}
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                                        >
                                            <Icon className="h-4 w-4 text-gray-400" />
                                            {label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashNavbar;