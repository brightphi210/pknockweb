interface BtnProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const SolidBtn = ({
    text,
    onClick,
    disabled = false,
}: BtnProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="
                inline-flex items-center justify-center
                rounded-lg
                bg-[#008AFC]
                px-6 py-3
                text-xs font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:bg-[#0079DE]
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
            "
        >
            {text}
        </button>
    );
};