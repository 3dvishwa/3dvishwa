import { cn } from "@/lib/utils";

type ButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "rounded-full bg-blue-600 px-7 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}