import { ArrowRight, Eye, EyeOff, MapPinHouse } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from "../components/LoadingOverlay";
import { useRegistration } from "../hooks/mutations/auth";

const GoogleIcon = () => (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"
        />
        <path
            fill="#FBBC05"
            d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.39l4.01-3.11Z"
        />
        <path
            fill="#EA4335"
            d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77Z"
        />
    </svg>
);

const Register = () => {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { mutate: register, isPending } = useRegistration();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (password !== password_confirm) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        register(
            {
                first_name,
                last_name,
                email,
                phone,
                password,
                role: "seeker", // fixed
            },
            {
                onSuccess: () => {
                    toast.success("Account created successfully!");
                    setTimeout(() => {
                        navigate("/login"); // or "/register-successful" if you have that page
                    }, 1000);
                },
                onError: (err: any) => {
                    const message =
                        err.response?.data?.message ||
                        err.response?.data?.detail ||
                        err.response?.data?.email?.[0] ||
                        err.response?.data?.phone?.[0] ||
                        "Registration failed. Please try again.";
                    setErrorMsg(message);
                },
            }
        );
    };

    return (
        <div className="flex min-h-screen w-full">
            <LoadingOverlay visible={isPending} />
            <ToastContainer />

            {/* ── Left brand panel ── */}
            <div className="relative hidden w-1/2 overflow-hidden bg-[#0a0e27] md:block">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(120% 100% at 100% 100%, #3b82f6 0%, #1e3a6e 35%, #0a0e27 70%)",
                    }}
                />
                <div className="relative z-10 flex h-full flex-col p-10 lg:p-14">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-900/40">
                            <MapPinHouse className="h-5 w-5 text-white" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            P-KNOCK
                        </span>
                    </Link>
                </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="flex w-full items-center justify-center bg-white px-6 py-16 md:w-1/2">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Join P-KNOCK to explore verified properties and stay updated on the
                        ones that matter to you.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* First + Last name */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="mb-1.5 block text-sm font-medium text-gray-800"
                                >
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    type="text"
                                    required
                                    disabled={isPending}
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Ada"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="mb-1.5 block text-sm font-medium text-gray-800"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    type="text"
                                    required
                                    disabled={isPending}
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Okafor"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-gray-800"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                disabled={isPending}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-1.5 block text-sm font-medium text-gray-800"
                            >
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                required
                                disabled={isPending}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+2348012345678"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-gray-800"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isPending}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="password_confirm"
                                className="mb-1.5 block text-sm font-medium text-gray-800"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirm"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    disabled={isPending}
                                    value={password_confirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={
                                        showConfirmPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {errorMsg && (
                            <p className="text-sm text-red-500 -mt-1">{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Creating account..." : "Create Account"}
                            {!isPending && <ArrowRight className="h-4 w-4" />}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-400">Or continue with</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        disabled={isPending}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;