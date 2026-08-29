import {
    Bell,
    Bookmark,
    Eye,
    LayoutDashboard,
    Settings,
    UserCircle2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { images } from "../utils/images";
import { SolidBtn } from "./btns"; // adjust path if needed

const profileLinks = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard/home" },
    { label: "Profile", icon: UserCircle2, to: "/dashboard/profile" },
    { label: "Saved", icon: Bookmark, to: "/dashboard/saved" },
    { label: "Watchlist", icon: Eye, to: "/dashboard/watchlist" },
    { label: "Notifications", icon: Bell, to: "/dashboard/notifications" },
    { label: "Settings", icon: Settings, to: "/dashboard/settings" },
];

const Navbar = () => {
    const { isLoggedIn, user, login, logout } = useAuth();

    // "Get Started" dialog (logged-out state)
    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    // Profile dropdown (logged-in state)
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close "Get Started" dialog when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
                setDialogOpen(false);
            }
        };
        if (dialogOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dialogOpen]);

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

    // Close either on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDialogOpen(false);
                setProfileOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Prevent body scroll when the mobile sheet is open
    useEffect(() => {
        document.body.style.overflow = dialogOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [dialogOpen]);


    const navigate = useNavigate()
    const handleLogin = () => {
        login();
        setDialogOpen(false);
        navigate('/dashboard/home')
    };
    return (
        <>
            <div className="flex items-center justify-between py-4 sm:py-4 md:py-4 px-4 sm:px-6 md:px-10 lg:px-20 w-full fixed top-0 z-30 bg-white border-b border-gray-100">
                {/* Logo */}
                <Link to="/" className="w-20 sm:w-24 md:w-28 lg:w-30 shrink-0">
                    <img src={images.logo} alt="Logo" className="w-full h-auto object-contain" />
                </Link>

                <div className="relative" ref={dialogRef}>
                    <SolidBtn
                        text="Get Started"
                        onClick={() => setDialogOpen((prev) => !prev)}
                    />

                    {/* ── Desktop / tablet dropdown ── */}
                    {dialogOpen && (
                        <div className="hidden sm:block absolute right-0 mt-3 w-72 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">
                            <div className="p-5 text-center border-b border-gray-100">
                                <p className="font-semibold text-gray-900 text-sm">Continue as</p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Choose how you want to get started
                                </p>
                            </div>

                            <div className="p-3 flex flex-col gap-2 mb-2">
                                <SolidBtn text="Log in" onClick={handleLogin} />

                                <button
                                    onClick={() => setDialogOpen(false)}
                                    className="w-full text-center px-4 py-2.5 bg-emerald-900 text-white rounded-full font-semibold text-xs hover:bg-green-900 transition-all"
                                >
                                    Continue as User
                                </button>

                                <button
                                    onClick={() => setDialogOpen(false)}
                                    className="w-full text-center px-4 py-2.5 border border-gray-200 text-gray-700 rounded-full font-semibold text-xs hover:bg-gray-50 hover:border-emerald-200 transition-all"
                                >
                                    Continue as Landlord
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Mobile full-screen / bottom-sheet style dialog (logged-out only) ── */}
            {!isLoggedIn && dialogOpen && (
                <div className="sm:hidden fixed inset-0 z-50 flex items-end justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setDialogOpen(false)}
                    />

                    {/* Sheet */}
                    <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up">
                        {/* Handle bar */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-gray-300" />
                        </div>

                        <div className="p-5 text-center border-b border-gray-100">
                            <p className="font-semibold text-gray-900 text-base">Continue as</p>
                            <p className="text-gray-500 text-sm mt-1">
                                Choose how you want to get started
                            </p>
                        </div>

                        <div className="p-4 flex flex-col gap-3 pb-8">
                            <SolidBtn text="Log in" onClick={handleLogin} />

                            <button
                                onClick={() => setDialogOpen(false)}
                                className="w-full text-center px-4 py-3.5 bg-emerald-900 text-white rounded-full font-semibold text-sm hover:bg-green-900 transition-all"
                            >
                                Continue as User
                            </button>

                            <button
                                onClick={() => setDialogOpen(false)}
                                className="w-full text-center px-4 py-3.5 border border-gray-200 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-50 hover:border-emerald-200 transition-all"
                            >
                                Continue as Landlord
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;