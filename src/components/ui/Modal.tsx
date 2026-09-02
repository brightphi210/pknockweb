import { X } from "lucide-react";
import { type ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    maxWidth?: string;
}

const Modal = ({ open, onClose, title, description, children, maxWidth = "max-w-lg" }: ModalProps) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className={`w-full ${maxWidth} rounded-2xl bg-white p-6 shadow-xl`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
                <div className={title ? "pt-5" : ""}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;