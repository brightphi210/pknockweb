import {
    Bell,
    Bookmark,
    ChevronDown,
    Eye,
    LayoutDashboard,
    LogOut,
    Settings,
    UserCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { images } from "../utils/images";

const profileLinks = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard/overview" },
    { label: "Profile", icon: UserCircle2, to: "/dashboard/profile" },
    { label: "Saved", icon: Bookmark, to: "/dashboard/saved" },
    { label: "Watchlist", icon: Eye, to: "/dashboard/watchlist" },
    { label: "Notifications", icon: Bell, to: "/dashboard/notifications" },
    { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const DashNavbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    // Profile dropdown
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        if (profileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setProfileOpen(false);
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
                    <Link
                        to="/dashboard/notifications"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                    >
                        <Bell className="h-4.5 w-4.5" />
                        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                            15
                        </span>
                    </Link>

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