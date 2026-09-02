import {
    Bell,
    Check,
    IdCard,
    LogOut,
    Mail,
    ScanFace,
    Settings as SettingsIcon,
    Shield,
    Trash2,
    UploadCloud,
    User,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Modal from "../../components/ui/Modal";
import Toggle from "../../components/ui/Toggle";

type TabId = "personal" | "verification" | "notifications" | "settings";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "verification", label: "Verification", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: SettingsIcon },
];

interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    bio: string;
}

const DashProfile = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<TabId>("personal");
    const [isVerified, setIsVerified] = useState(false);

    const [info, setInfo] = useState<PersonalInfo>({
        firstName: "Adebayo",
        lastName: "Okafor",
        email: "adebayo@example.com",
        phone: "+234 800 000 0000",
        gender: "Male (M)",
        dob: "23/05/1998",
        bio: "Looking for a verified 3-bedroom apartment in Lagos. Prefer Lekki or VI.",
    });

    return (
        <div className="min-h-screen bg-gray-50 px-4 pb-16 pt-24 sm:px-6 md:px-10 lg:px-20">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-start">
                {/* Sidebar */}
                <aside className="w-full shrink-0 rounded-xl border border-gray-200 bg-white md:w-72">
                    <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                        <img src={user?.avatar} alt={user?.name} className="h-12 w-12 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold text-gray-900">{user?.name}</p>
                            <p className="truncate text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${isVerified ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                                }`}
                        >
                            {isVerified ? "Verified" : "Not Verified"}
                        </span>
                    </div>

                    <nav className="p-2">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeTab === id ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                        <button
                            onClick={logout}
                            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign out
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <section className="min-w-0 flex-1">
                    {activeTab === "personal" && <PersonalInfoPanel info={info} onSave={setInfo} />}
                    {activeTab === "verification" && (
                        <VerificationPanel isVerified={isVerified} onVerified={() => setIsVerified(true)} />
                    )}
                    {activeTab === "notifications" && <NotificationsPanel />}
                    {activeTab === "settings" && <SettingsPanel />}
                </section>
            </div>
        </div>
    );
};

export default DashProfile;

// ---------- Personal Info ----------

const PersonalInfoPanel = ({
    info,
    onSave,
}: {
    info: PersonalInfo;
    onSave: (info: PersonalInfo) => void;
}) => {
    const [editOpen, setEditOpen] = useState(false);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Personal Information</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Update your name, contact details, and other personal information.
                    </p>
                </div>
                <button
                    onClick={() => setEditOpen(true)}
                    className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
                >
                    Edit
                </button>
            </div>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 pt-5 sm:grid-cols-2">
                <Field label="First Name" value={info.firstName} />
                <Field label="Last Name" value={info.lastName} />
                <Field label="Email Address" value={info.email} />
                <Field label="Phone Number" value={info.phone} />
                <Field label="Gender" value={info.gender} />
                <Field label="Date of Birth (Optional)" value={info.dob} />
                <div className="sm:col-span-2">
                    <Field label="Short Bio" value={info.bio} />
                </div>
            </dl>

            <EditPersonalInfoModal
                open={editOpen}
                info={info}
                onClose={() => setEditOpen(false)}
                onSave={(updated) => {
                    onSave(updated);
                    setEditOpen(false);
                }}
            />
        </div>
    );
};

const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
    </div>
);

const EditPersonalInfoModal = ({
    open,
    info,
    onClose,
    onSave,
}: {
    open: boolean;
    info: PersonalInfo;
    onClose: () => void;
    onSave: (info: PersonalInfo) => void;
}) => {
    const [draft, setDraft] = useState(info);

    useEffect(() => {
        if (open) setDraft(info);
    }, [open, info]);

    const isDirty = JSON.stringify(draft) !== JSON.stringify(info);

    const update =
        (field: keyof PersonalInfo) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setDraft((d) => ({ ...d, [field]: e.target.value }));

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit Personal Information"
            description="Keep your profile up to date by editing your personal details. Ensure the information matches your official identification where applicable."
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="First Name" value={draft.firstName} onChange={update("firstName")} />
                <TextField label="Last Name" value={draft.lastName} onChange={update("lastName")} />
                <TextField label="Email Address" value={draft.email} onChange={update("email")} type="email" />
                <TextField label="Phone Number" value={draft.phone} onChange={update("phone")} />
                <div>
                    <label className="mb-1.5 block text-sm text-gray-700">Gender</label>
                    <select
                        value={draft.gender}
                        onChange={update("gender")}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                        <option>Male (M)</option>
                        <option>Female (F)</option>
                        <option>Prefer not to say</option>
                    </select>
                </div>
                <TextField label="Date of Birth (Optional)" value={draft.dob} onChange={update("dob")} />
                <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm text-gray-700">Short Bio</label>
                    <textarea
                        value={draft.bio}
                        onChange={update("bio")}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                </button>
                <button
                    onClick={() => onSave(draft)}
                    disabled={!isDirty}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                    Save Changes
                </button>
            </div>
        </Modal>
    );
};

const TextField = ({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) => (
    <div>
        <label className="mb-1.5 block text-sm text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        />
    </div>
);

// ---------- Verification ----------

interface VerificationItem {
    id: "govId" | "photo";
    label: string;
    description: string;
}

const verificationItems: VerificationItem[] = [
    { id: "govId", label: "Government ID", description: "Upload a valid government-issued ID." },
    { id: "photo", label: "Photo", description: "Upload a clear photo for identity verification." },
];

const verificationIcons: Record<VerificationItem["id"], typeof Mail> = {
    govId: IdCard,
    photo: ScanFace,
};

const VerificationPanel = ({
    isVerified,
    onVerified,
}: {
    isVerified: boolean;
    onVerified: () => void;
}) => {
    const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
    const [activeUpload, setActiveUpload] = useState<VerificationItem | null>(null);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h1 className="text-xl font-semibold text-gray-900">Identity Verification (KYC)</h1>
            <p className="mt-1 text-sm text-gray-500">
                Verify your identity to unlock full access and keep your account secure.
            </p>

            <div className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
                <VerificationRow
                    icon={Mail}
                    label="Email Address"
                    description="Verify your email to secure your account."
                    status="verified"
                />
                {verificationItems.map((item) => (
                    <VerificationRow
                        key={item.id}
                        icon={verificationIcons[item.id]}
                        label={item.label}
                        description={item.description}
                        status={uploaded[item.id] || isVerified ? "verified" : "pending"}
                        onAction={() => setActiveUpload(item)}
                    />
                ))}
            </div>

            <UploadDocumentModal
                item={activeUpload}
                onClose={() => setActiveUpload(null)}
                onUploaded={(id) => {
                    setUploaded((u) => {
                        const next = { ...u, [id]: true };
                        if (next.govId && next.photo) onVerified();
                        return next;
                    });
                    setActiveUpload(null);
                }}
            />
        </div>
    );
};

const VerificationRow = ({
    icon: Icon,
    label,
    description,
    status,
    onAction,
}: {
    icon: typeof Mail;
    label: string;
    description: string;
    status: "verified" | "pending";
    onAction?: () => void;
}) => (
    <div className="flex items-center gap-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
            <Icon className="h-4.5 w-4.5 text-gray-500" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
        {status === "verified" ? (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Verified
            </span>
        ) : (
            <button
                onClick={onAction}
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
                Upload
            </button>
        )}
    </div>
);

const UploadDocumentModal = ({
    item,
    onClose,
    onUploaded,
}: {
    item: VerificationItem | null;
    onClose: () => void;
    onUploaded: (id: VerificationItem["id"]) => void;
}) => {
    const [docType, setDocType] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        setDocType("");
        setFile(null);
    }, [item]);

    if (!item) return null;

    return (
        <Modal
            open={!!item}
            onClose={onClose}
            title={`Upload ${item.label}`}
            description="Upload a valid document. Ensure all details are clear, readable, and match your account information."
        >
            {item.id === "govId" && (
                <div className="mb-4">
                    <label className="mb-1.5 block text-sm text-gray-700">Government ID</label>
                    <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="nin">National ID (NIN)</option>
                        <option value="passport">International Passport</option>
                        <option value="license">Driver's License</option>
                        <option value="voter">Voter's Card</option>
                    </select>
                </div>
            )}

            <label
                htmlFor={`file-${item.id}`}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-6 py-10 text-center transition hover:border-blue-300"
            >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50">
                    <UploadCloud className="h-5 w-5 text-gray-400" />
                </span>
                {file ? (
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                ) : (
                    <span className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </span>
                )}
                <span className="text-xs text-gray-400">Supported formats: JPG, JPEG, PNG, PDF • Max 10 MB</span>
                <input
                    id={`file-${item.id}`}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
            </label>

            <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
                <span className="h-px flex-1 bg-gray-100" />
                OR
                <span className="h-px flex-1 bg-gray-100" />
            </div>

            <label
                htmlFor={`file-${item.id}`}
                className="block w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
                Browse Files
            </label>

            <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                </button>
                <button
                    onClick={() => onUploaded(item.id)}
                    disabled={!file || (item.id === "govId" && !docType)}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                    Upload {item.id === "govId" ? "ID" : "Photo"}
                </button>
            </div>
        </Modal>
    );
};

// ---------- Notification Preferences ----------

interface Pref {
    id: string;
    label: string;
    description: string;
}

const prefItems: Pref[] = [
    { id: "priceChanges", label: "Price Changes", description: "When watch listed properties change price" },
    { id: "newWalkthroughs", label: "New Walkthroughs", description: "When new walkthrough videos are uploaded" },
    { id: "inspectionReminders", label: "Inspection Reminders", description: "Reminders before scheduled inspections" },
    { id: "newListings", label: "New Listings", description: "New properties in your preferred areas" },
    { id: "promotionalEmails", label: "Promotional Emails", description: "News and promotional content from P-Knock" },
];

const NotificationsPanel = () => {
    const [prefs, setPrefs] = useState<Record<string, boolean>>({
        priceChanges: true,
        newWalkthroughs: true,
        inspectionReminders: false,
        newListings: true,
        promotionalEmails: false,
    });

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h1 className="text-xl font-semibold text-gray-900">Notification Preferences</h1>
            <p className="mt-1 text-sm text-gray-500">
                Stay informed by managing alerts, reminders, and activity updates.
            </p>

            <div className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
                {prefItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <Toggle checked={prefs[item.id]} onChange={(v) => setPrefs((p) => ({ ...p, [item.id]: v }))} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// ---------- Settings ----------

const passwordRules: { id: string; label: string; test: (v: string) => boolean }[] = [
    { id: "upper", label: "Uppercase", test: (v) => /[A-Z]/.test(v) },
    { id: "lower", label: "Lowercase", test: (v) => /[a-z]/.test(v) },
    { id: "number", label: "Number", test: (v) => /[0-9]/.test(v) },
    { id: "length", label: "8 Characters", test: (v) => v.length >= 8 },
    { id: "special", label: "Special Character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const SettingsPanel = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [privacy, setPrivacy] = useState({ visible: true, personalized: true });
    const [deleteOpen, setDeleteOpen] = useState(false);

    const allValid = passwordRules.every((r) => r.test(password));
    const canReset = allValid && password === confirm && confirm.length > 0;

    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Control your preferences, privacy, and security from one place.
                </p>

                <h2 className="mt-6 text-base font-semibold text-gray-900">Change Password</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {passwordRules.map((rule) => {
                        const met = rule.test(password);
                        return (
                            <span
                                key={rule.id}
                                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${met ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 bg-gray-50 text-gray-500"
                                    }`}
                            >
                                {met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                {rule.label}
                            </span>
                        );
                    })}
                </div>

                <button
                    disabled={!canReset}
                    className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:w-auto sm:px-6"
                >
                    Reset Password
                </button>

                <h2 className="mt-8 text-base font-semibold text-gray-900">Privacy Settings</h2>
                <p className="mt-1 text-sm text-gray-500">Control who can see your profile and activity</p>

                <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-900">Make profile visible to landlords</p>
                        <Toggle checked={privacy.visible} onChange={(v) => setPrivacy((p) => ({ ...p, visible: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-900">Allow personalized recommendations</p>
                        <Toggle checked={privacy.personalized} onChange={(v) => setPrivacy((p) => ({ ...p, personalized: v }))} />
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50 p-6">
                <h2 className="text-base font-semibold text-red-700">Danger Zone</h2>
                <p className="mt-1 text-sm text-red-600">
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                    onClick={() => setDeleteOpen(true)}
                    className="mt-4 w-full rounded-lg bg-red-700 py-2.5 text-sm font-medium text-white transition hover:bg-red-800 sm:w-auto sm:px-6"
                >
                    Delete account
                </button>
            </div>

            <DeleteAccountModal open={deleteOpen} onClose={() => setDeleteOpen(false)} />
        </div>
    );
};

const DeleteAccountModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { logout } = useAuth();

    return (
        <Modal open={open} onClose={onClose} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <Trash2 className="h-5 w-5 text-red-600" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                    Are you sure you want to delete your account?
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    We're sorry to see you go. Once your account is deleted, all your data will be permanently
                    removed and you won't be able to recover it.
                </p>

                <div className="mt-4 w-full border-t border-gray-100 pt-4 text-left">
                    <p className="text-sm font-medium text-gray-900">This includes:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-500">
                        <li>Your profile information</li>
                        <li>Verification documents</li>
                        <li>Saved locations and preferences</li>
                        <li>Access to your account and its services</li>
                    </ul>
                </div>

                <div className="mt-6 flex w-full items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={logout}
                        className="flex-1 rounded-lg bg-red-700 py-2.5 text-sm font-medium text-white hover:bg-red-800"
                    >
                        Yes, Delete Account
                    </button>
                </div>
            </div>
        </Modal>
    );
};