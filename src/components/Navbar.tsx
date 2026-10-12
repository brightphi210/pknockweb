import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../providers/AuthProvider";
import { images } from "../utils/images";
import { SolidBtn } from "./btns"; // adjust path if needed


const Navbar = () => {
    // const { isLoggedIn, login } = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const mobileDialogRef = useRef<HTMLDivElement>(null);

    // Profile dropdown (logged-in state)
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close "Get Started" dialog when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const insideDesktop = dialogRef.current && dialogRef.current.contains(target);
            const insideMobile = mobileDialogRef.current && mobileDialogRef.current.contains(target);

            if (!insideDesktop && !insideMobile) {
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

    useEffect(() => {
        document.body.style.overflow = dialogOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [dialogOpen]);


    const navigate = useNavigate()
    const handleLogin = () => {
        // login();
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

                    {dialogOpen && (
                        <div className="hidden sm:block absolute right-0 mt-3 w-72 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">
                            <div className="p-5 text-center border-b border-gray-100">
                                <p className="font-semibold text-gray-900 text-sm">Continue as</p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Choose how you want to get started
                                </p>
                            </div>

                            <div className="p-3 flex flex-col gap-2 mb-2">
                                <Link to={'/register'} className="w-full">
                                    <SolidBtn text="Continue as User" />
                                </Link>

                                <button
                                    onClick={handleLogin}
                                    className="w-full text-center px-4 py-2.5 bg-neutral-100 border border-neutral-300 cursor-pointer text-gray-700 rounded-lg font-semibold text-xs transition-all"
                                >
                                    Continue as Landlord
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Mobile full-screen / bottom-sheet style dialog (logged-out only) ── */}
            {dialogOpen && (
                <div className="sm:hidden fixed inset-0 z-50 flex items-end justify-center">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setDialogOpen(false)}
                    />

                    <div
                        ref={mobileDialogRef}
                        className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up"
                    >
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
                            <SolidBtn text="Continue as User" onClick={handleLogin} />

                            <button
                                onClick={handleLogin}
                                className="w-full text-center px-4 py-3 bg-neutral-100 border border-neutral-300 cursor-pointer text-gray-700 rounded-lg font-semibold text-xs transition-all"
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